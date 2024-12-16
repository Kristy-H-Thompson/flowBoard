import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // 1. Get the decoded JWT token (user profile)
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token); // Decode the JWT token
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }

  // 2. Check if the user is logged in (if a valid token exists)
  loggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.isTokenExpired(token); // Return true if token exists and is not expired
    }
    return false; // User is not logged in if no token exists
  }

  // 3. Check if the token has expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // JWT tokens have an `exp` field indicating the expiration time (in seconds)
      const expirationDate = decoded.exp ? decoded.exp * 1000 : 0;
      return Date.now() > expirationDate;
    } catch (error) {
      console.error('Error decoding token', error);
      return true; // Return true if the token is invalid or expired
    }
  }

  // 4. Retrieve the token from localStorage (or another storage)
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Get the token from localStorage (you may store it elsewhere)
  }

  // 5. Set the token in localStorage after successful login
  login(idToken: string): void {
    localStorage.setItem('authToken', idToken); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page after login (you can use a React Router redirect if needed)
  }

  // 6. Logout the user by removing the token and redirecting
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page after logout
  }
}

export default new AuthService();