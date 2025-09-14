import { AppBar, TitlePortal } from 'react-admin';
import { SwipeableTemporaryDrawer } from './accMenu';

export const MyAppBar = () => (
    <AppBar>
        <TitlePortal/>
        <SwipeableTemporaryDrawer/>
    </AppBar>
);