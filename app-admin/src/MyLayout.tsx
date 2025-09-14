import { Layout } from 'react-admin';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';

export const MyLayout = ({ children }) => (
    <Layout menu={MyMenu} appBar={MyAppBar} >
        {children}
    </Layout>
);