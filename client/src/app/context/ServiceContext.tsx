import { Contact } from "../models/contact";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ServiceContextValue {
    contacts: Contact[] | null;
    setContacts: (contacts: Contact[]) => void;
}

export const ServiceContext = createContext<ServiceContextValue | undefined>(undefined);

export function useServiceContext() {
    const context = useContext(ServiceContext);
    if (context === undefined)
        throw Error('error using context');
    return context;
}

export function ServiceProvider({ children }: PropsWithChildren<any>) {
    const [contacts, setContacts] = useState<Contact[] | null>(null);


    return (
        <ServiceContext.Provider value={{ contacts, setContacts }}>
            {children}
        </ServiceContext.Provider>
    )
}