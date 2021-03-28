class Auth {
    constructor() {
        this.authenticatedStudent = false;
        this.authenticatedAdmin = false;
    }

    loginStudent(callback) {
        this.authenticatedStudent = true;
        callback();
    }

    loginAdmin(callback) {
        this.authenticatedAdmin = true;
        callback();
    }

    logoutStudent(callback) {
        this.authenticatedStudent = false;
        callback();
    }

    logoutAdmin(callback) {
        this.authenticatedAdmin = false;
        callback();
    }

    isAuthenticatedStudent() {
        return this.authenticatedStudent;
    }

    isAuthenticatedAdmin() {
        return this.authenticatedAdmin;
    }
}

export default new Auth();
