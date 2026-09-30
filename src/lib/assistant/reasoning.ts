import OpenAI from "openai";

const systemInstructions = [
  "You are Hearth, a helpful household scheduling assistant.",
  "Use only the household schedule and rules supplied in the request.",
  "Suggest options in plain language; never claim to have changed a calendar.",
  "Calendar actions are performed by the application only after authorization and confirmation.",
].join(" ");

export async function suggestScheduleResponse({
  request,
  schedule,
  householdRules,
  client = new OpenAI(),
}: {
  request: string;
  schedule: string;
  householdRules: string[];
  client?: OpenAI;
}): Promise<string> {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    instructions: systemInstructions,
    input: JSON.stringify({ request, schedule, householdRules }),
  });

  return response.output_text;
}
