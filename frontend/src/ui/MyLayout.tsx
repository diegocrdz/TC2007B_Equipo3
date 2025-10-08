import { Layout } from 'react-admin';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';
import { ReactNode } from 'react';

export const MyLayout = ({ children }: { children: ReactNode }) => (
    <Layout menu={MyMenu} appBar={MyAppBar} >
        {children}
    </Layout>
);