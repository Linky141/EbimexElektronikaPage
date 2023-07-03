import ServiceList from './ServiceList';
import { useAppSelector } from '../../app/service/configureService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const { service } = useAppSelector(state => state.services);

  return (
    <>
      <Button
        component={Link}
        to={`/serviceFrom/${0}`}
        fullWidth
        variant='contained'
        color='secondary'
        style={{ marginBottom: 20 }}
      >Add new service</Button>
      <ServiceList
        services={service!}
      />
    </>
  )
}