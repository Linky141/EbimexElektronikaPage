import ServiceList from './ServiceList';
import { useAppSelector } from '../../app/service/configureService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAdmin } from '../../app/utils/RolesUtils';

export default function ServicesPage() {
  const { user } = useAppSelector(state => state.account);
  const { t } = useTranslation();

  return (
    <>
      {isAdmin(user) &&
        <Button
          component={Link}
          to={`/serviceFrom/${0}`}
          fullWidth
          variant='contained'
          color='secondary'
          style={{ marginBottom: 20 }}
        >{t("addNewService")}</Button>
      }
      <ServiceList/>
    </>
  )
}