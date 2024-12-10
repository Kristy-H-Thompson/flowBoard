const login = async (userInfo) => {
    try {
      // Make the POST request to the login endpoint
      const response = await fetch('/auth/login', {
        method: 'POST', // POST method
        headers: {
          'Content-Type': 'application/json', // Make sure the request body is JSON
        },
        body: JSON.stringify(userInfo), // Send the userInfo as a JSON string
      });
  
      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log('Login successful:', data);
        return data; // You can return or handle the data as needed (e.g., save the token)
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        return null; // Or handle the error as needed
      }
    } catch (error) {
      console.error('Error making login request:', error);
      return null;
    }
  };
  
  // Example usage:
  const userInfo = { username: 'myUsername', password: 'myPassword' };
  login(userInfo);