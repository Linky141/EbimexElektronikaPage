import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contactsSlice } from "../../features/contactPage/contactSlice";
import { infoSlice } from "../../features/infoPage/infoSlice";
import { serviceSlice } from "../../features/servicesPage/servicesSlice";
import { AccountSlice } from "../../features/account/accountSlice";

export const service = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        infos: infoSlice.reducer,
        services: serviceSlice.reducer,
        account: AccountSlice.reducer
    }
})

export type RootState = ReturnType<typeof service.getState>;
export type AppDispatch = typeof service.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;