import { useCallback, useEffect, useState } from "react";
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
import i18n from "../translations/i18n";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { setConfiguration } from "../../features/configurationPage/configurationSlice";

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
  const [loadingConf, setLoadingConf] = useState(true);
  const [loadingC, setLoadingC] = useState(true);
  const [loadingI, setLoadingI] = useState(true);
  // const [loadingS, setLoadingS] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());

      agent.Contact.list()
        .then(contacts => dispatch(setContacts(contacts)))
        .catch(error => console.log(error))
        .finally(() => setLoadingC(false))

      agent.Info.list()
        .then(info => dispatch(setInfos(info)))
        .catch(error => console.log(error))
        .finally(() => setLoadingI(false))

      agent.Configuration.get()
        .then(configuration => dispatch(setConfiguration(configuration)))
        .catch(error => console.log(error))
        .finally(() => setLoadingConf(false))

      // agent.Service.GetServices(JSON.parse(localStorage.getItem('user')!).email)
      //   .then(service => dispatch(setServices(service)))
      //   .catch(error => console.log(error))
      //   .finally(() => setLoadingS(false))

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

  // if (loading || loadingC || loadingI || loadingS)
  if (loading || loadingC || loadingI || loadingConf)
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
