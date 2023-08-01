import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { infoSlice } from "../../features/infoPage/infoSlice";
import { serviceSlice } from "../../features/servicesPage/servicesSlice";
import { accountSlice } from "../../features/account/accountSlice";
import { configurationSlice } from "../../features/configurationPage/configurationSlice";
import { contactSlice } from "../../features/contactPage/contactSlice";

export const service = configureStore({
    reducer: {
        contact: contactSlice.reducer,
        info: infoSlice.reducer,
        services: serviceSlice.reducer,
        account: accountSlice.reducer,
        configuration: configurationSlice.reducer
    }
})

export type RootState = ReturnType<typeof service.getState>;
export type AppDispatch = typeof service.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;