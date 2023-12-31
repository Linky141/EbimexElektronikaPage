export interface Contact {
    id: number
    email: string
    phone: string
    addressCountry: string
    addressCity: string
    addressStreet: string
    addressNumber1: string
    addressNumber2: string
    addressPostal: string
    contactCustoms: ContactCustom[]
  }
  
  export interface ContactCustom {
    id: number
    name: string
    content: string
  }
  