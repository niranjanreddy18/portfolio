const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Helper to handle fetch responses safely
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData === "object") {
        const detail = errorData.detail || errorData.message || JSON.stringify(errorData);
        errorMessage = detail;
      }
    } catch {
      // Ignore JSON parsing failure for non-2xx response
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response received from API server.");
  }
}

/**
 * GET /api/projects/
 * Fetch list of portfolio projects from Django REST API
 */
export async function getProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error: Unable to connect to server.");
  }
}

/**
 * POST /api/contact/
 * Send contact form payload { name, email, subject, message }
 */
export async function sendContactMessage(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error: Unable to send message.");
  }
}

/**
 * GET /api/health/
 * Health check endpoint
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Health check failed.");
  }
}

