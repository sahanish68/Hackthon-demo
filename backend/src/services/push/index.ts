export type PushDeliveryResult =
  | { status: 'confirmed'; providerMessageId: string }
  | { status: 'failed'; reason: string }
  | { status: 'unavailable'; reason: string };

export interface PushProvider {
  send(input: { recipientId: string; title: string; body: string }): Promise<PushDeliveryResult>;
}
