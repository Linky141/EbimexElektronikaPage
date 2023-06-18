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
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 200",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.Opened,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.ReadyToBePickedUp,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 400",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.ReleasedToCustomer,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 500",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.Testing,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 7700",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.WaitingForComponents,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1100",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1200",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 121300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 154300",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 108670",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 103460",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 12678900",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 23",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1010",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 106530",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1gf00",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            },
             new Entities.Service{
                Name = "Naprawa telewizora Fujitsu 1wrfe00",
                Description = "usterka polega na wymianie kondensatora w zasilaczu",
                CurrentStatus = Entities.StatusOfService.NotStarted,
                Price = 1000,
                PlannedDateOfCompletion = DateTime.UtcNow,
                PictureUrls = new List<Entities.PictureUrl> {
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"},
                    new Entities.PictureUrl {Url = "https://picsum.photos/200"}
                },
                Comments = new List<Entities.Comment> {
                    new Entities.Comment {Content = "Comment 1 content"},
                    new Entities.Comment {Content = "Comment 2 content"},
                    new Entities.Comment {Content = "Comment 3 content"}
                }
            }
        };

        foreach (var service in services)
        {
            serviceContext.Services.Add(service);
        }

        serviceContext.SaveChanges();
    }

}