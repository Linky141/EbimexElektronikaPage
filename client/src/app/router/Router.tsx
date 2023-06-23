import { createBrowserRouter } from "react-router-dom";
import ServiceDetails from "../../features/services/ServiceDetails";
import ServicesPage from "../../features/services/ServicesPage";
import HomePage from "../../features/homePage/HomePage";
import App from "../layout/App";
import InfoPage from "../../features/infoPage/InfoPage";
import ContactPage from "../../features/contactPage/ContactPage";

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
        ]
    }
])