namespace API.Data;

public static class DbInitializer
{
    public static void Initialize(ServiceContext serviceContext)
    {
        if (serviceContext.Services.Any())
            return;

        var services = new List<Entities.Service>
        {
            new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 100",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 2000",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.Opened,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.ReadyToBePickedUp,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 400",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.ReleasedToCustomer,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 500",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.Testing,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 7700",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.WaitingForComponents,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1100",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 12000",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 121300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 154300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 108670",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 103460",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 12678900",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 23",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1010",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 106530",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1gf00",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1wrfe00",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/2000"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 2 content", DateTime = DateTime.UtcNow, User="Sample user"},
                    new Entities.Comment {Content = "Comment 3 content", DateTime = DateTime.UtcNow, User="Sample user"}
                }
            }
        };

        var infos = new List<Entities.Info>
        {
            new Entities.Info{
                OpeningHoursMondayStart = "9:00",
                OpeningHoursMondayEnd = "17:00",
                OpeningHoursTuesdayStart = "9:00",
                OpeningHoursTuesdayEnd = "17:00",
                OpeningHoursWednesdayStart = "9:00",
                OpeningHoursWednesdayEnd= "17:00",
                OpeningHoursThursdayStart = "9:00",
                OpeningHoursThursdayEnd = "17:00",
                OpeningHoursFridayStart = "9:00",
                OpeningHoursFridayEnd = "17:00",
                OpeningHoursSaturdayStart = "10:00",
                OpeningHoursSaturdayEnd = "14:00",
                OpeningHoursSundayStart = "Closed",
                OpeningHoursSundayEnd = "Closed",
                InfoAnnouncements = new List<Entities.InfoAnnouncement> {
                    new Entities.InfoAnnouncement {Content = "Announcement 1", DateAndTime = DateTime.UtcNow},
                    new Entities.InfoAnnouncement {Content = "Announcement 2", DateAndTime = DateTime.UtcNow},
                    new Entities.InfoAnnouncement {Content = "Announcement 3", DateAndTime = DateTime.UtcNow}
                }
            }
        };

        var contacts = new List<Entities.Contact>
        {
            new Entities.Contact{
                Phone = "123345756",
                Phone2 = "948594321",
                Email = "testmail1@gmail.com",
                Email2 = "testmail2@yahoo.com",
                AddressCountry = "Poland",
                AddressCity = "Lędziny",
                AddressStreet = "Owocowa",
                AddressNumber1 = "1",
                AddressNumber2 = "",
                AddressPostal = "43-143",
                ContactCustoms = new List<Entities.ContactCustom> {
                    new Entities.ContactCustom {Name = "Contact 1", Content = "Content contact 1"},
                    new Entities.ContactCustom {Name = "Contact 2", Content = "Content contact 2"},
                    new Entities.ContactCustom {Name = "Contact 3", Content = "Content contact 3"}
                }
            }
        };

        foreach (var service in services)
        {
            serviceContext.Services.Add(service);
        }

        foreach (var info in infos)
        {
            serviceContext.Infos.Add(info);
        }

        foreach (var contact in contacts)
        {
            serviceContext.Contacts.Add(contact);
        }

        serviceContext.SaveChanges();
    }

}