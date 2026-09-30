import assert from "node:assert/strict";
import test from "node:test";
import {
  CalendarMutationError,
  executeCalendarMutation,
  type CalendarActor,
  type CalendarEventInput,
  type CalendarGateway,
  type CalendarMutation,
  type ConfirmationVerifier,
} from "./service";

const actor: CalendarActor = {
  memberId: "member-1",
  householdId: "household-1",
  canManageCalendar: true,
};

const event: CalendarEventInput = {
  title: "School pickup",
  start: "2026-09-30T15:00:00.000Z",
  end: "2026-09-30T15:30:00.000Z",
};

function setup(confirmed = false) {
  const calls: string[] = [];
  const calendar: CalendarGateway = {
    createEvent: async () => {
      calls.push("create");
      return { id: "event-1" };
    },
    updateEvent: async () => {
      calls.push("update");
      return { id: "event-1" };
    },
    deleteEvent: async () => {
      calls.push("delete");
    },
  };
  const confirmations: ConfirmationVerifier = {
    isConfirmed: async ({ confirmationId }) =>
      confirmed && confirmationId === "approved-1",
  };

  return { calls, calendar, confirmations };
}

async function expectMutationError(
  promise: Promise<unknown>,
  code: CalendarMutationError["code"],
) {
  await assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof CalendarMutationError);
    assert.equal(error.code, code);
    return true;
  });
}

test("creates a valid event through the calendar gateway", async () => {
  const setupState = setup();
  await executeCalendarMutation({
    actor,
    householdId: actor.householdId,
    mutation: { type: "create", event },
    ...setupState,
  });
  assert.deepEqual(setupState.calls, ["create"]);
});

test("rejects invalid event times before calling the calendar", async () => {
  const setupState = setup();
  await expectMutationError(
    executeCalendarMutation({
      actor,
      householdId: actor.householdId,
      mutation: {
        type: "create",
        event: { ...event, end: event.start },
      },
      ...setupState,
    }),
    "INVALID_MUTATION",
  );
  assert.deepEqual(setupState.calls, []);
});

test("rejects a mutation targeting another household", async () => {
  const setupState = setup();
  await expectMutationError(
    executeCalendarMutation({
      actor,
      householdId: "another-household",
      mutation: { type: "create", event },
      ...setupState,
    }),
    "HOUSEHOLD_MISMATCH",
  );
  assert.deepEqual(setupState.calls, []);
});

test("rejects members without calendar permissions", async () => {
  const setupState = setup();
  await expectMutationError(
    executeCalendarMutation({
      actor: { ...actor, canManageCalendar: false },
      householdId: actor.householdId,
      mutation: { type: "create", event },
      ...setupState,
    }),
    "FORBIDDEN",
  );
  assert.deepEqual(setupState.calls, []);
});

test("requires verified confirmation before deleting", async () => {
  const setupState = setup();
  const mutation: CalendarMutation = { type: "delete", eventId: "event-1" };

  await expectMutationError(
    executeCalendarMutation({
      actor,
      householdId: actor.householdId,
      mutation,
      ...setupState,
    }),
    "CONFIRMATION_REQUIRED",
  );
  assert.deepEqual(setupState.calls, []);
});

test("allows a confirmed delete through the calendar gateway", async () => {
  const setupState = setup(true);
  const result = await executeCalendarMutation({
    actor,
    householdId: actor.householdId,
    mutation: { type: "delete", eventId: "event-1" },
    confirmationId: "approved-1",
    ...setupState,
  });
  assert.deepEqual(result, { deleted: true });
  assert.deepEqual(setupState.calls, ["delete"]);
});

test("requires confirmation before updating an event", async () => {
  const setupState = setup();
  await expectMutationError(
    executeCalendarMutation({
      actor,
      householdId: actor.householdId,
      mutation: { type: "update", eventId: "event-1", changes: { title: "New title" } },
      confirmationId: "unverified",
      ...setupState,
    }),
    "CONFIRMATION_REQUIRED",
  );
  assert.deepEqual(setupState.calls, []);
});
