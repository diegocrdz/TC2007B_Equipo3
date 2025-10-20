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

    // Iniciar sesión
    async login({username, password}) {
        const request=new Request(import.meta.env.VITE_BACKEND+"/login",{
            method:"POST",
            body: JSON.stringify({"username":username, "password":password}),
            headers: new Headers({"Content-Type":"application/json"})
        });
        try {
            const res = await fetch(request);
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }
            const auth=await res.json();
            sessionStorage.setItem("auth", auth.token);
            sessionStorage.setItem("identity", JSON.stringify({"id":auth.id, "usuario":auth.usuario, "nombre":auth.nombre, "rol":auth.rol, "turno":auth.turno}));
            return Promise.resolve();
        } catch {
            throw new Error("Error en usuario o password");
        }
    },

    // Cerrar sesión
    async logout() {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
        return Promise.resolve();
    },

    // Cuando la API devuelve un error
    async checkError(error) {
        const status = error.status;
        if (status === 401) {
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("identity");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // Cuando el usuario cambia de interfaz, verificar si está autenticado
    async checkAuth() {
        return sessionStorage.getItem("auth") ? Promise.resolve() : Promise.reject()
    },

    // Obtener los permisos del usuario
    async getPermissions() {
        const turno = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').turno as string : null;
        const role = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').rol as Role : null;
        return { role, turno };
    },

    // Verificar si el usuario tiene acceso a un recurso y acción específicos
    async canAccess({ resource, action }: { resource: string; action: string }) {
        // Busca el rol de usuario en sessionStorage
        const role = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').rol as Role : null;
        if (!role) return false;
        // Obtiene la estrategia de control de acceso para el rol
        const strategy = accessControlStrategies[role];
        if (!strategy) return false;
        // Devuelve si el usuario tiene acceso o no
        return accessControlStrategies[role]({ resource, action });
    },

    // Obtener la identidad del usuario
    async getIdentity() {
        const id = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').id as string : null;
        const usuario = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').usuario as string : null;
        const nombre = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').nombre as string : null;
        const rol = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').rol as Role : null;
        const turno = sessionStorage.getItem("identity") ? JSON.parse(sessionStorage.getItem("identity") || '{}').turno as string : null;
        if (!id) {
            throw new Error("No user logged in");
        }
        return {
            id: `${id}`,
            usuario: `${usuario}`,
            nombre: `${nombre}`,
            rol: rol,
            turno: turno
        };
    },
};