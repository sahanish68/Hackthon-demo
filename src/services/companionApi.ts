import { Platform } from 'react-native';

type CompanionMessage = {
  role: 'user' | 'model';
  text: string;
};

type CompanionResponse = {
  data?: CompanionMessage;
  error?: { message?: string };
};

function getApiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
}

export async function sendCompanionMessages(messages: CompanionMessage[], accessToken?: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/companion/messages`, {
      body: JSON.stringify({ messages }),
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      method: 'POST',
      signal: controller.signal,
    });
    const payload = (await response.json()) as CompanionResponse;
    if (!response.ok || !payload.data?.text) {
      throw new Error(payload.error?.message ?? 'The companion is unavailable.');
    }
    return payload.data.text;
  } finally {
    clearTimeout(timeout);
  }
}
