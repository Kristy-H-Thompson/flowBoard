class AuthService {
    getProfile() {
        // TODO: return the decoded token
    }
    loggedIn() {
        // TODO: return a value that indicates if the user is logged in
    }
    isTokenExpired(token) {
        // TODO: return a value that indicates if the token is expired
    }
    getToken() {
        // TODO: return the token
    }
    login(idToken) {
        // TODO: set the token to localStorage
        // TODO: redirect to the home page
    }
    logout() {
        // TODO: remove the token from localStorage
        // TODO: redirect to the login page
    }
}
export default new AuthService();
