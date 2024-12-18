import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

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
    return token ? !this.isTokenExpired(token) : false; // If token exists and is valid, user is logged in
  }

  // 3. Check if the token has expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // JWT tokens have an `exp` field indicating the expiration time (in seconds)
      const expirationDate = decoded.exp ? decoded.exp * 1000 : 0;
      return Date.now() > expirationDate; // Return true if the token has expired
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
    this.redirectToHomePage(); // Use custom redirect to avoid page reload
  }

  // 6. Logout the user by removing the token and redirecting
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    this.redirectToLoginPage(); // Redirect to login page using React Router
  }

  // 7. Redirect to home page without reloading
  redirectToHomePage(): void {
    const navigate = useNavigate();
    navigate('/'); // Programmatically redirect to the home page
  }

  // 8. Redirect to login page without reloading
  redirectToLoginPage(): void {
    const navigate = useNavigate();
    navigate('/login'); // Programmatically redirect to the login page
  }
}

export default new AuthService();