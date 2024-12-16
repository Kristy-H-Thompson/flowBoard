// Define the type for user login information
interface UserInfo {
  username: string;
  password: string;
}

// Define the type for the login response
interface LoginResponse {
  message: string;
  token: string;
}

// Login function to make the POST request to the login endpoint
const login = async (userInfo: UserInfo): Promise<LoginResponse | null> => {
  try {
    // Make the POST request to the login endpoint
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      // Parse the response data if successful
      const data: LoginResponse = await response.json();
      console.log('Login successful:', data);
      return data; // Return the data from the response
    } else {
      // Handle the error response if not successful
      const error = await response.json();
      console.error('Login failed:', error);
      return null; // Return null in case of failure
    }
  } catch (error) {
    console.error('Error making login request:', error);
    return null; // Return null if an error occurs
  }
};

export { login }; // Export the login function