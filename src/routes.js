import App from './App';
import Home from "./pages/Home";
import Banking from "./pages/Banking";
import Login from "./components/Login";
import ErrorPage from './components/ErrorPage';
import Transaction from './pages/Transaction'
import "./index.css"


const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/', //Only one route is allowed to match the parent. We're using it for the Home component
                element: <Home />,
                // children:[
                // {
                //     path: '/transaction/:id',
                //     element: <Transaction />
                // }
                // ]
            }, 
            {   path: '/transaction/:id/:name/:timestamp/:amount/:updated_balance',
                element: <Transaction />
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