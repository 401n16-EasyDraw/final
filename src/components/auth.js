class Auth {
    constructor() {
        this.authenticated = false;
    }
    login(credentials) {
        this.authenticated = true;
        credentials();
    }
    logout(credentials) {
        this.authenticated = false;
        credentials();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();