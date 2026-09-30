import type { calendar_v3 } from "googleapis";
import type {
  CalendarEventInput,
  CalendarGateway,
} from "@/lib/calendar/service";

export class GoogleCalendarGateway implements CalendarGateway {
  constructor(
    private readonly client: calendar_v3.Calendar,
    private readonly calendarId: string,
  ) {}

  async createEvent(event: CalendarEventInput) {
    const response = await this.client.events.insert({
      calendarId: this.calendarId,
      requestBody: toGoogleEvent(event),
    });
    return response.data;
  }

  async updateEvent(
    eventId: string,
    changes: Partial<CalendarEventInput>,
  ) {
    const response = await this.client.events.patch({
      calendarId: this.calendarId,
      eventId,
      requestBody: toGoogleEvent(changes),
    });
    return response.data;
  }

  async deleteEvent(eventId: string) {
    await this.client.events.delete({
      calendarId: this.calendarId,
      eventId,
    });
  }
}

function toGoogleEvent(
  event: Partial<CalendarEventInput>,
): calendar_v3.Schema$Event {
  return {
    ...(event.title !== undefined ? { summary: event.title } : {}),
    ...(event.description !== undefined ? { description: event.description } : {}),
    ...(event.location !== undefined ? { location: event.location } : {}),
    ...(event.start !== undefined ? { start: { dateTime: event.start } } : {}),
    ...(event.end !== undefined ? { end: { dateTime: event.end } } : {}),
  };
}
