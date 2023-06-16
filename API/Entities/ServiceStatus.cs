namespace API.Entities;

public enum StatusOfService
{
    NotStarted,
    Opened,
    WaitingForComponents,
    Testing,
    ReadyToBePickedUp,
    ReleasedToCustomer
}