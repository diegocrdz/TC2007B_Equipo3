import { DataProvider } from 'react-admin';

type DataStore = {
    [key: string]: any[];
};

const data: DataStore = {
    reportes_medicos: [
        {
            id: 1,
            folio: 'RM-001',
            fecha: '2025-09-10',
            nombre_paciente: 'Juan Pérez',
            nombre_testigo: 'Ana López',
            nombre_paramedico: 'Carlos Ruiz',
            nombre_medico: 'Dra. Martínez',
        },
        {
            id: 2,
            folio: 'RM-002',
            fecha: '2025-09-09',
            nombre_paciente: 'María Gómez',
            nombre_testigo: 'Luis Torres',
            nombre_paramedico: 'Sofía Díaz',
            nombre_medico: 'Dr. Ramírez',
        },
    ],
    users: [
        { id: 1, name: 'Usuario Uno' },
        { id: 2, name: 'Usuario Dos' },
    ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDataProvider: DataProvider = {
    getList: async (resource, params) => {
        await delay(300);
        return {
            data: data[resource] || [],
            total: (data[resource] || []).length,
        };
    },
    getOne: async (resource, params) => {
        await delay(200);
        const record = (data[resource] || []).find((item: any) => item.id === params.id);
        if (!record) throw new Error('Not found');
        return { data: record };
    },
    getMany: async (resource, params) => {
        await delay(200);
        return {
            data: (data[resource] || []).filter((item: any) => params.ids.includes(item.id)),
        };
    },
    getManyReference: async (resource, params) => {
        await delay(200);
        return {
            data: (data[resource] || []).filter((item: any) => item[params.target] === params.id),
            total: (data[resource] || []).filter((item: any) => item[params.target] === params.id).length,
        };
    },
    update: async (_resource, params) => {
        await delay(200);
        // Simula actualización en el array
        const { id } = params.data;
        const resourceArr = data[_resource] || [];
        const idx = resourceArr.findIndex((item: any) => item.id === id);
        if (idx !== -1) {
            resourceArr[idx] = { ...resourceArr[idx], ...params.data };
        }
        return { data: resourceArr[idx] };
    },
    updateMany: async (_resource, params) => {
        await delay(200);
        return { data: params.ids };
    },
    create: async (resource, params) => {
        await delay(200);
        const newItem = { ...params.data, id: Date.now() };
        data[resource] = [...(data[resource] || []), newItem];
        return { data: newItem as any };
    },
    delete: async (resource, params) => {
        await delay(200);
        const resourceArr = data[resource] || [];
        const idx = resourceArr.findIndex((item: any) => item.id === params.id);
        let deleted;
        if (idx !== -1) {
            deleted = resourceArr[idx];
            data[resource] = resourceArr.filter((item: any) => item.id !== params.id);
        }
        return { data: deleted };
    },
    deleteMany: async (resource, params) => {
        await delay(200);
        data[resource] = (data[resource] || []).filter((item: any) => !params.ids.includes(item.id));
        return { data: params.ids };
    },
};
