export interface Info {
    id: number
    openingHoursMondayStart: string
    openingHoursMondayEnd: string
    openingHoursTuesdayStart: string
    openingHoursTuesdayEnd: string
    openingHoursWednesdayStart: string
    openingHoursWednesdayEnd: string
    openingHoursThursdayStart: string
    openingHoursThursdayEnd: string
    openingHoursFridayStart: string
    openingHoursFridayEnd: string
    openingHoursSaturdayStart: string
    openingHoursSaturdayEnd: string
    openingHoursSundayStart: string
    openingHoursSundayEnd: string
    infoAnnouncements: InfoAnnouncement[]
  }
  
  export interface InfoAnnouncement {
    id: number
    dateAndTime: string
    content: string
  }
  