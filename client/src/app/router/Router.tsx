import { Navigate, createBrowserRouter } from "react-router-dom";
import ServiceDetails from "../../features/servicesPage/ServiceDetails";
import ServicesPage from "../../features/servicesPage/ServicesPage";
import HomePage from "../../features/homePage/HomePage";
import App from "../layout/App";
import InfoPage from "../../features/infoPage/InfoPage";
import ContactPage from "../../features/contactPage/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ServiceForm from "../../features/servicesPage/ServiceForm";
import LoginPage from "../../features/account/LoginPage";
import RegisterPage from "../../features/account/RegisterPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage/>},
            {path: 'contact', element: <ContactPage/>},
            {path: 'info', element: <InfoPage/>},
            {path: 'services', element: <ServicesPage/>},
            {path: 'services/:id', element: <ServiceDetails/>},
            {path: 'server-error', element: <ServerError/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'serviceFrom/:id', element: <ServiceForm/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: '*', element: <Navigate replace to='not-found'/> },
        ]
    }
])