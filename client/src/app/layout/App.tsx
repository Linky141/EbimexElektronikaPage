import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { setContacts } from "../../features/contactPage/contactSlice";
import agent from "../api/agent";
import { useAppDispatch } from "../service/configureService";
import LoadingComponent from "./LoadingComponent";
import { setInfos } from "../../features/infoPage/infoSlice";
import { setServices } from "../../features/servicesPage/servicesSlice";
import i18n from "../translations/i18n";
import { fetchCurrentUser } from "../../features/account/accountSlice";

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
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingInfos, setLoadingInfos] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());

    agent.Contact.list()
      .then(contacts => dispatch(setContacts(contacts)))
      .catch(error => console.log(error))
      .finally(() => setLoadingContacts(false));

    agent.Info.list()
      .then(info => dispatch(setInfos(info)))
      .catch(error => console.log(error))
      .finally(() => setLoadingInfos(false))

    agent.Service.list()
      .then(service => dispatch(setServices(service)))
      .catch(error => console.log(error))
      .finally(() => setLoadingServices(false))
  }, [dispatch])

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  const handleLanguageChange = () => {
    setAppLanguage(!appLanguage);
    i18n.changeLanguage(appLanguage ? 'en' : 'pl');
  };

  if (loadingContacts || loadingInfos || loadingServices)
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
