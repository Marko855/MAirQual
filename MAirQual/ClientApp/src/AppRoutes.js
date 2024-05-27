import { Home } from "./components/JS/Home";
import { About } from "./components/JS/About"
import { News } from "./components/JS/News"
import { Shop } from "./components/JS/Shop"
import { Register } from "./components/JS/Register"
import { Login } from "./components/JS/Login"
import { UserPage } from "./components/JS/UserPage";
import { News_first } from "./components/JS/News_first";
import { News_second } from "./components/JS/News_second";
import { News_third } from "./components/JS/News_third";
import { News_fourth } from "./components/JS/News_fourth";
import { News_fifth } from "./components/JS/News_fifth";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/About',
        element: <About />
    },
    {
        path: '/News',
        element: <News />
    },
    {
        path: '/Shop',
        element: <Shop />
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/Login',
        element: <Login />
    },
    {
        path: '/UserPage',
        element: <UserPage />
    },
    {
        path: '/News_first',
        element: <News_first />
    },
    {
        path: '/News_second',
        element: <News_second />
    },
    {
        path: '/News_third',
        element: <News_third />
    },
    {
        path: '/News_fourth',
        element: <News_fourth />
    },
    {
        path: '/News_fifth',
        element: <News_fifth />
    },

];

export default AppRoutes;
