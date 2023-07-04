import ServiceList from './ServiceList';
import { useAppSelector } from '../../app/service/configureService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServicesPage() {
  const { service } = useAppSelector(state => state.services);
  const { t } = useTranslation();

  return (
    <>
      <Button
        component={Link}
        to={`/serviceFrom/${0}`}
        fullWidth
        variant='contained'
        color='secondary'
        style={{ marginBottom: 20 }}
      >{t("addNewService")}</Button>
      <ServiceList
        services={service!}
      />
    </>
  )
}