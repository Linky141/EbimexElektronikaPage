import { Navigate, createBrowserRouter } from "react-router-dom";
import ServiceDetails from "../../features/services/ServiceDetails";
import ServicesPage from "../../features/services/ServicesPage";
import HomePage from "../../features/homePage/HomePage";
import App from "../layout/App";
import InfoPage from "../../features/infoPage/InfoPage";
import ContactPage from "../../features/contactPage/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

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
            {path: '*', element: <Navigate replace to='not-found'/> },
        ]
    }
])