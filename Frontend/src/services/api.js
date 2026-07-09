const API = import.meta.env.VITE_BACKEND_URL;

export async function api(endpoint, options = {}) {

    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API}${endpoint}`, {
        credentials: "include",

        headers: {
            ...(isFormData
                ? {}
                : { "Content-Type": "application/json" }),
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