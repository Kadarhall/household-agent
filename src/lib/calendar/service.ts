export type CalendarEventInput = {
  title: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
};

export type CalendarMutation =
  | { type: "create"; event: CalendarEventInput }
  | { type: "update"; eventId: string; changes: Partial<CalendarEventInput> }
  | { type: "delete"; eventId: string };

export type CalendarActor = {
  memberId: string;
  householdId: string;
  canManageCalendar: boolean;
};

export type CalendarGateway = {
  createEvent: (event: CalendarEventInput) => Promise<unknown>;
  updateEvent: (
    eventId: string,
    changes: Partial<CalendarEventInput>,
  ) => Promise<unknown>;
  deleteEvent: (eventId: string) => Promise<void>;
};

export type ConfirmationVerifier = {
  isConfirmed: (details: {
    confirmationId: string;
    actor: CalendarActor;
    mutation: CalendarMutation;
  }) => Promise<boolean>;
};

export class CalendarMutationError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "FORBIDDEN"
      | "HOUSEHOLD_MISMATCH"
      | "CONFIRMATION_REQUIRED"
      | "INVALID_MUTATION",
  ) {
    super(message);
    this.name = "CalendarMutationError";
  }
}

export async function executeCalendarMutation({
  actor,
  householdId,
  mutation,
  confirmationId,
  calendar,
  confirmations,
}: {
  actor: CalendarActor;
  householdId: string;
  mutation: CalendarMutation;
  confirmationId?: string;
  calendar: CalendarGateway;
  confirmations: ConfirmationVerifier;
}): Promise<unknown> {
  if (actor.householdId !== householdId) {
    throw new CalendarMutationError(
      "The actor does not belong to this household.",
      "HOUSEHOLD_MISMATCH",
    );
  }

  if (!actor.canManageCalendar) {
    throw new CalendarMutationError(
      "The actor is not allowed to manage this calendar.",
      "FORBIDDEN",
    );
  }

  if (mutation.type === "create") {
    validateEvent(mutation.event);
    return calendar.createEvent(mutation.event);
  }

  if (!mutation.eventId.trim()) {
    throw new CalendarMutationError("An event ID is required.", "INVALID_MUTATION");
  }

  if (
    mutation.type === "update" &&
    Object.keys(mutation.changes).length === 0
  ) {
    throw new CalendarMutationError(
      "At least one event change is required.",
      "INVALID_MUTATION",
    );
  }

  if (
    !confirmationId ||
    !(await confirmations.isConfirmed({ confirmationId, actor, mutation }))
  ) {
    throw new CalendarMutationError(
      "This calendar change needs the household member's confirmation.",
      "CONFIRMATION_REQUIRED",
    );
  }

  if (mutation.type === "update") {
    if (mutation.changes.title !== undefined && !mutation.changes.title.trim()) {
      throw new CalendarMutationError(
        "An event title cannot be empty.",
        "INVALID_MUTATION",
      );
    }
    return calendar.updateEvent(mutation.eventId, mutation.changes);
  }

  await calendar.deleteEvent(mutation.eventId);
  return { deleted: true };
}

function validateEvent(event: CalendarEventInput): void {
  const start = Date.parse(event.start);
  const end = Date.parse(event.end);

  if (!event.title.trim() || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    throw new CalendarMutationError(
      "A calendar event needs a title and a valid end time after its start time.",
      "INVALID_MUTATION",
    );
  }
}
