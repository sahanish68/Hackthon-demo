import { GoogleGenAI } from '@google/genai';

export type CompanionMessage = {
  role: 'user' | 'model';
  text: string;
};

const systemInstruction = [
  'You are ElderCare AI, a friendly digital companion for a senior citizen.',
  'Speak warmly, patiently, and in simple language.',
  'You are an AI, not a family member, doctor, or emergency responder.',
  'Encourage the user to contact family or a qualified professional for urgent, medical, or safety concerns.',
  'Never invent medication instructions, appointments, emergency contact actions, or provider success.',
  'When the user asks to talk to family, help them prepare a message or explain how to contact a real person.',
].join(' ');

const providerTimeoutMs = 15_000;

export class GeminiCompanion {
  private readonly client: GoogleGenAI;

  public constructor(apiKey: string, private readonly model: string) {
    this.client = new GoogleGenAI({ apiKey, apiVersion: 'v1beta' });
  }

  public async respond(messages: CompanionMessage[]): Promise<string> {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const response = await Promise.race([
        this.client.models.generateContent({
          model: this.model,
          contents: messages.map((message) => ({
            role: message.role,
            parts: [{ text: message.text }],
          })),
          config: {
            systemInstruction,
            temperature: 0.4,
            maxOutputTokens: 512,
          },
        }),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Gemini provider timed out.')), providerTimeoutMs);
        }),
      ]);

      const text = response.text?.trim();
      if (!text) {
        throw new Error('Gemini returned no text response.');
      }
      return text;
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }
}
