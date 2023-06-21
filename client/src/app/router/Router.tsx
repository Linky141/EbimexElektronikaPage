import { createBrowserRouter } from "react-router-dom";
import ServiceDetails from "../../features/Services/ServiceDetails";
import ServicesPage from "../../features/Services/ServicesPage";
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