export type CompanionRequest = {
  conversationId: string;
  message: string;
  language: string;
};

export type CompanionResponse = {
  message: string;
  language: string;
  providerConfirmed: boolean;
};

export interface CompanionProvider {
  readonly supportedLanguages: readonly string[];
  respond(request: CompanionRequest): Promise<CompanionResponse>;
}
