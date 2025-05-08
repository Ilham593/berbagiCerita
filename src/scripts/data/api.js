import CONFIG from "../config";

const ENDPOINTS = {
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories?location=1`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
};

export async function getAllStories(token) {
  const response = await fetch(ENDPOINTS.GET_ALL_STORIES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result.listStory;
}


export async function loginUser(email, password) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.message);
  }
  return result;
}


export async function registerUser(name, email, password) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.message);
  }
  return result;
}


