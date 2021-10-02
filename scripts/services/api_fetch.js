const BASE_URI = "https://doable-api.herokuapp.com/"

export async function apiFetch(endpoint, headers, method = "GET", body) {
  const response = await fetch(`${BASE_URI}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  if (response.status === 204) return {};

  return await response.json();
}
