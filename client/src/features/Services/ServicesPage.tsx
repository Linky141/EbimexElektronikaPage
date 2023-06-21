import { useState, useEffect } from 'react';
import { Service } from '../../app/models/service'
import ServiceList from './ServiceList';

// interface Props {
//     services: Service[];
//     addServices: () => void;
// }

export default function ServicesPage() {

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/services')
        .then(response => response.json())
        .then(data => setServices(data));
    }, [])
  
    function addService() {
      setServices(prevState => [...prevState,
      {
        id: prevState.length + 1,
        name: 'added' + (prevState.length + 1),
        price: 1000,
        currentStatus: 0,
        description: 'description',
        plannedDateOfCompletion: '2020-02-02',
        comments: [],
        pictureUrls: []
      }])
    }
  

    return (
        <>
            <ServiceList services={services} />
            <button onClick={addService}>add</button>
        </>
    )
}