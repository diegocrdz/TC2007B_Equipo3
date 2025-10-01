import { AuthProvider } from "react-admin";

type Role = 'admin' | 'jefe' | 'paramedico' | 'urbano';

const permissions = {
    jefe: {
        resources: ['reportes_medicos', 'notas_medicas', 'reportes_urbanos', 'notas_urbanas'],
        actions: ['list', 'edit', 'show']
    },
    paramedico: {
        resources: ['reportes_medicos', 'notas_medicas'],
        actions: ['create', 'list', 'edit', 'show']
    },
    urbano: {
        resources: ['reportes_urbanos', 'notas_urbanas'],
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
    // Cuando usuario intenta iniciar sesión
    async login({ username, password }) {
        if (!(username && password)) {
            throw new Error("Credenciales inválidas");
        }
        localStorage.setItem("username", username);
        // assign role based on username
        let role = "";
        let turno = "";
        switch (username) {
            case 'admin':
                role = 'admin';
                turno = 'N/A';
                break;
            case 'jefe':
                role = 'jefe';
                turno = '1';
                break;
            case 'paramedico':
                role = 'paramedico';
                turno = '2';
                break;
            case 'urbano':
                role = 'urbano';
                turno = '3';
                break;
            default:
                break;
        }
        localStorage.setItem("permissions", role);
        localStorage.setItem("turno", turno);
    },
    // Cuando el usuario cierra sesión
    async logout() {
        localStorage.removeItem("username");
    },
    // Cuando la API devuelve un error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            throw new Error("Session expired");
        }
    },
    // Cuando el usuario cambia de interfaz, verificar si está autenticado
    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Authentication required");
        }
    },
    // Obtener los permisos del usuario
    async getPermissions() {
        const turno = localStorage.getItem("turno");
        const role = localStorage.getItem("permissions");
        return { role, turno };
    },
    // Verificar si el usuario tiene acceso a un recurso y acción específicos
    async canAccess({ resource, action }: { resource: string; action: string }) {
        const role = (localStorage.getItem("permissions") as Role);
        return accessControlStrategies[role]({ resource, action });
    },
    // Obtener la identidad del usuario
    async getIdentity() {
        const username = localStorage.getItem("username");
        if (!username) {
            throw new Error("No user logged in");
        }
        return {
            id: username,
            fullName: `${username}`
        };
    },
};