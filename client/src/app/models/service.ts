export interface Service {
    id: number
    name: string
    pictureUrls: PictureUrl[]
    currentStatus: number
    price: number
    plannedDateOfCompletion: string
    description: string
    comments: Comment[]
  }
  
  export interface PictureUrl {
    id: number
    url: string
  }
  
  export interface Comment {
    id: number
    content: string
    user: string
    dateTime: string
  }
  