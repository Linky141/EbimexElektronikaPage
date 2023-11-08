export interface HomePage {
    id: number
    header: string
    description: string
    pictureUrls: PictureUrlHomePage[]
  }
  
  export interface PictureUrlHomePage {
    id: number
    url: string
  }