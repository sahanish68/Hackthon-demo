export type SpeechCapability = {
  language: string;
  speechToText: boolean;
  textToSpeech: boolean;
};

export interface SpeechProvider {
  capabilities(): readonly SpeechCapability[];
}
