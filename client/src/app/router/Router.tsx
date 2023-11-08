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
import ConfigurationPage from "../../features/configurationPage/ConfigurationPage";
import HomePageForm from "../../features/homePage/HomePageForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {element: <RequireAuth/>, children: [
                {path: 'services', element: <ServicesPage/>},
                {path: 'services/:id', element: <ServiceDetails/>},
            ]},
            {element: <RequireAuth roles={['Admin']}/>, children: [
                {path: 'configuration', element: <ConfigurationPage/>},
                {path: 'homePageEdit', element: <HomePageForm/>},
                {path: 'serviceFrom/:id', element: <ServiceForm/>},
            ]},
            {path: '', element: <HomePage/>},
            {path: 'contact', element: <ContactPage/>},
            {path: 'info', element: <InfoPage/>},
            {path: 'server-error', element: <ServerError/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: '*', element: <Navigate replace to='not-found'/> },
        ]
    }
])