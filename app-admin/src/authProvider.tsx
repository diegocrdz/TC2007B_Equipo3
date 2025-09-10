import { AuthProvider } from "react-admin";

type Role = 'admin' | 'jefe' | 'paramedico' | 'urbano';

const permissions = {
    jefe: {
        resources: ['x1', 'x2'],
        actions: ['list', 'edit', 'show']
    },
    paramedico: {
        resources: ['x1'],
        actions: ['create', 'list', 'edit', 'show']
    },
    urbano: {
        resources: ['x2'],
        actions: ['create', 'list', 'edit', 'show']
    }
}

const accessControlStrategies = {
    admin: () => {
        return true;
    },
    jefe: ({ resource, action }: { resource: string; action: string }) => {
        const res = permissions.jefe.resources.includes(resource);
        const act = permissions.jefe.actions.includes(action);
        return res && act;
    },
    paramedico: ({ resource, action }: { resource: string; action: string }) => {
        const res = permissions.paramedico.resources.includes(resource);
        const act = permissions.paramedico.actions.includes(action);
        return res && act;
    },
    urbano: ({ resource, action }: { resource: string; action: string }) => {
        const res = permissions.urbano.resources.includes(resource);
        const act = permissions.urbano.actions.includes(action);
        return res && act;
    },
}

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    async login({ username, password }) {
        localStorage.setItem("username", username);
        // assign role based on username
        let role = "";
        switch (username) {
            case 'admin':
                role = 'admin';
                break;
            case 'jefe':
                role = 'jefe';
                break;
            case 'paramedico':
                role = 'paramedico';
                break;
            case 'urbano':
                role = 'urbano';
                break;
            default:
                break;
        }
        localStorage.setItem("permissions", role);
    },
    // called when the user clicks on the logout button
    async logout() {
        localStorage.removeItem("username");
    },
    // called when the API returns an error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            throw new Error("Session expired");
        }
    },
    // called when the user navigates to a new location, to check for authentication
    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Authentication required");
        }
    },
    // Get user permissions
    async getPermissions() {
        return localStorage.getItem("permissions") || "user";
    },
    async canAccess({ resource, action }: { resource: string; action: string }) {
        const role = (localStorage.getItem("permissions") as Role);
        return accessControlStrategies[role]({ resource, action });
    }
};