import { Admin, Resource, bwDarkTheme, bwLightTheme } from "react-admin";
import { Layout } from "./Layout";
import {dataProvider} from "./dataProvider";
// jsonplaceholder
import { PostsList, PostsEdit, PostsCreate, PostsShow } from "./posts";
import { CommentsList, CommentsEdit, CommentsCreate, CommentsShow } from "./comments";
import { AlbumsList, AlbumsEdit, AlbumsCreate, AlbumsShow } from "./albums";
import { PhotosList, PhotosEdit, PhotosCreate, PhotosShow } from "./photos";
import { TodosList, TodosEdit, TodosCreate, TodosShow } from "./todos";
import { UsersList, UsersEdit, UsersCreate, UsersShow } from "./users";
// Icons
import PostIcon from '@mui/icons-material/Book';
import CommentIcon from '@mui/icons-material/Comment';
import AlbumIcon from '@mui/icons-material/Album';
import PhotoIcon from '@mui/icons-material/Photo';
import TodoIcon from '@mui/icons-material/CheckBox';
import UserIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmergencyIcon from '@mui/icons-material/Emergency';
import BarChartIcon from '@mui/icons-material/BarChart';

// Dashboard
import { Dashboard } from "./dashboard/Dashboard";
// Login
import { authProvider } from "./authProvider";
// Language
import { i18nProviderNoLocale } from './i18nProvider';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider} 
        darkTheme={bwDarkTheme} 
        lightTheme={bwLightTheme}
        defaultTheme="dark"
        dashboard={Dashboard}
        authProvider={authProvider}
        i18nProvider={i18nProviderNoLocale}
    >
        <Resource name='posts' list={PostsList} edit={PostsEdit} create={PostsCreate} show={PostsShow} icon={PostIcon} options={{ label: 'Publicaciones'}} />
        <Resource name='comments' list={CommentsList} edit={CommentsEdit} create={CommentsCreate} show={CommentsShow} icon={CommentIcon} options={{ label: 'Comentarios'}} />
        <Resource name='albums' list={AlbumsList} edit={AlbumsEdit} create={AlbumsCreate} show={AlbumsShow} icon={AlbumIcon} options={{ label: 'Álbumes'}} />
        <Resource name='photos' list={PhotosList} edit={PhotosEdit} create={PhotosCreate} show={PhotosShow} icon={PhotoIcon} options={{ label: 'Fotos'}} />
        <Resource name='todos' list={TodosList} edit={TodosEdit} create={TodosCreate} show={TodosShow} icon={TodoIcon} options={{ label: 'Tareas'}} />
        <Resource name='users' list={UsersList} edit={UsersEdit} create={UsersCreate} show={UsersShow} icon={UserIcon} options={{ label: 'Usuarios'}} />
        <Resource name='x1' list={PostsList} edit={PostsEdit} create={PostsCreate} show={PostsShow} icon={LocalHospitalIcon} options={{ label: 'Emergencias Médicas'}} />
        <Resource name='x2' list={PostsList} edit={PostsEdit} create={PostsCreate} show={PostsShow} icon={EmergencyIcon} options={{ label: 'Emergencias Urbanas'}} />
        <Resource name='x3' list={PostsList} edit={PostsEdit} create={PostsCreate} show={PostsShow} icon={BarChartIcon} options={{ label: 'Estadísticas'}} />
    </Admin>
);