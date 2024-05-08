import { Home } from "./components/JS/Home";
import { About } from "./components/JS/About"
import { News } from "./components/JS/News"
import { Shop } from "./components/JS/Shop"
import { Register } from "./components/JS/Register"
import { Login } from "./components/JS/Login"

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

];

export default AppRoutes;
