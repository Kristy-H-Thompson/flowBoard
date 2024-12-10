// Define the type for user login information
interface UserInfo {
  username: string;
  password: string;
}

const login = async (userInfo: UserInfo) => {
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
      const data = await response.json();
      console.log('Login successful:', data);
      return data;
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
      return null;
    }
  } catch (error) {
    console.error('Error making login request:', error);
    return null;
  }
};


// Example usage:
const userInfo = { username: 'myUsername', password: 'myPassword' };
login(userInfo);