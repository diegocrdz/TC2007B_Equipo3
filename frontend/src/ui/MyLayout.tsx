/*
Layout personalizado para la aplicación
Incluye menú y barra de aplicaciones personalizados
Fecha: 11/08/2025
*/

import { Layout } from 'react-admin';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';
import { ReactNode } from 'react';

export const MyLayout = ({ children }: { children: ReactNode }) => (
    <Layout menu={MyMenu} appBar={MyAppBar} >
        {children}
    </Layout>
);