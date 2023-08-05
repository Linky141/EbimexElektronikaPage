import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { fetchContactsAsync } from "../../features/contactPage/contactSlice";
import { useAppDispatch } from "../service/configureService";
import LoadingComponent from "./LoadingComponent";
import { fetchInfoAsync } from "../../features/infoPage/infoSlice";
import i18n from "../translations/i18n";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchConfigurationAsync } from "../../features/configurationPage/configurationSlice";
import { fetchServicesAsync } from "../../features/servicesPage/servicesSlice";
import { fetchHomePageAsync } from "../../features/homePage/homePageSlice";

function App() {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [appLanguage, setAppLanguage] = useState(true);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : "#121212"
      }
    }
  })
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchInfoAsync());
      await dispatch(fetchContactsAsync());
      await dispatch(fetchServicesAsync());
      await dispatch(fetchConfigurationAsync());
      await dispatch(fetchHomePageAsync())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  const handleLanguageChange = () => {
    setAppLanguage(!appLanguage);
    i18n.changeLanguage(appLanguage ? 'en' : 'pl');
  };

  if (loading)
    return <LoadingComponent message='Loading app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored" closeOnClick={false} draggable={false} pauseOnHover hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} appLanguage={appLanguage} handleLanguageChange={handleLanguageChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
