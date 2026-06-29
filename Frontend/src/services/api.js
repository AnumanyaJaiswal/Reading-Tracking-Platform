const API = import.meta.env.VITE_BACKEND_URL;

export async function api(endpoint, options = {}) {
  console.log("API URL:", API); // Log the API URL to verify it's being read correctly
  const response = await fetch(`${API}${endpoint}`, {
    credentials: "include", // Sends cookies automatically
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}