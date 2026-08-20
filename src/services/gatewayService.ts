const GATEWAY_URL = 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${GATEWAY_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    if (response.status === 204) {
      return null as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

export const gatewayService = {
  request,
  get: <T,>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T,>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  patch: <T,>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: <T,>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
