import App from './App';
import Home from "./pages/Home";
import Banking from "./pages/Banking";
import Login from "./components/Login";
import "./index.css"


const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/', //Only one route is allowed to match the parent. We're using it for the Home component
                element: <Home />
            }, 
            {
                path: '/banking',
                element: <Banking />
            },  
            {
                path: '/login',
                element: <Login />
            }, 
        ]
    }

]

export default routes;