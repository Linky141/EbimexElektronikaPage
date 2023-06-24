import { useState, useEffect } from 'react';
import { Service } from '../../app/models/service'
import ServiceList from './ServiceList';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

// interface Props {
//     services: Service[];
//     addServices: () => void;
// }

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Service.list().then(services => setServices(services))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return <LoadingComponent message='Loading services...'/>

  return (
    <>
      <ServiceList services={services} />
    </>
  )
}