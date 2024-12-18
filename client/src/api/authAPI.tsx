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
  console.log("Attempting to login with userInfo:", userInfo);  // Log the login data before the request

  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    console.log("Response status:", response.status);  // Log response status

    if (response.ok) {
      console.log("Response is OK, status:", response.status);  // Log if the response is OK
      // Check if the response body is empty (shouldn't happen for login)
      if (response.status === 204) {
        console.error('No content returned from the server');
        return null; // No content returned
      }

      // Parse the response JSON safely
      const data: LoginResponse = await response.json();
      console.log('Login successful:', data);  // Log the parsed response data
      return data; // Return the parsed data (with the token)
    } else {
      // Handle non-200 responses
      const errorText = await response.text(); // Get raw response text
      console.log("Error response text:", errorText);  // Log the error text for debugging

      try {
        const errorData = JSON.parse(errorText); // Attempt to parse JSON error response
        console.error('Login failed:', errorData.message || errorData);  // Log detailed error message
      } catch (jsonError) {
        console.error('Login failed with non-JSON error:', errorText);  // Log if response text is not JSON
      }
      return null;
    }
  } catch (error) {
    console.error('Error making login request:', error);  // Log any fetch errors
    return null; // Return null if an error occurs
  }
};

export { login }; // Export the login function