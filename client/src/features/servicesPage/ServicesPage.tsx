import ServiceList from './ServiceList';
import { useAppDispatch, useAppSelector } from '../../app/service/configureService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { setServices } from './servicesSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';

export default function ServicesPage() {
  const { service } = useAppSelector(state => state.services);
  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loadingS, setLoadingS] = useState(true);

  useEffect(() => {
      agent.Service.GetServices(user!.email)
        .then(service => dispatch(setServices(service)))
        .catch(error => console.log(error))
        .finally(() => setLoadingS(false))

  }, [dispatch, user])

  if (loadingS)
    return <LoadingComponent message='Loading services...' />

  return (
    <>
      {user && user.roles?.includes('Admin') &&
        <Button
          component={Link}
          to={`/serviceFrom/${0}`}
          fullWidth
          variant='contained'
          color='secondary'
          style={{ marginBottom: 20 }}
        >{t("addNewService")}</Button>
      }
      <ServiceList
        services={service!}
      />
    </>
  )
}