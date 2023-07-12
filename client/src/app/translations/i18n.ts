import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "pl",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                title: 'Ebimex electronica',
                openHours: 'Open hours',
                edit: "Edit",
                darkMode: "Dark mode",
                info: "Information",
                contact: "Contact",
                services: "Services",
                login: "Login",
                register: "Register",
                monday: "Monday",
                tuesday: "Tuesday",
                wednesday: "Wednesday",
                thursday: "Thursday",
                friday: "Friday",
                saturday: "Saturday",
                sunday: "Sunday",
                closed: "Closed",
                submit: "Submit",
                cancel: "Cancel",
                add: "Add",
                from: "From",
                to: "To",
                newAnnouncement: "New announcement",
                delete: "Delete",
                address: "Address",
                country: "Country",
                city: "City",
                postalCode: "Postal code",
                street: "Street",
                buildingNumber: "Building number",
                apartmentNumber: "Apartment number",
                phone: "Phone",
                email: "Email",
                addNewContactOption: "Add new contact option",
                contactName: "Contact name",
                contactData: "Contact",
                addNewService: "Add new service",
                notStarted: "Not started",
                opened: "Opened",
                waitingForComponents: "Waiting for components",
                testing: "Testing",
                readyToBePickedUp: "Ready to be picked up",
                releasedToCustomer: "Released to customer",
                error: "Error",
                deadline: "Deadline",
                view: "View",
                details: "Details",
                description: "Description",
                finishDate: "Finish date",
                price: "Price",
                status: "Status",
                comments: "Comments",
                comment: "Comment",
                addComment: "Add comment",
                name: "Name",
                error404: "Error 404",
                pageNotFound: "Page not found",
                GoBackToHomePage: "Go back to home page",
                menu: "Menu",
                uploadNewImage: "Upload new Image",
                isMandatory: "is mandatory",
                fieldIsMandatory: "Field is mandatory",
                timeFormatValidationError: "Field should have format hh:mm",
                nameAndContantAreMandatory: "Field name and contant of contact are mandatory",
                newCommentShouldNotBeEmpty: "New comment should not be empty",
                fieldCanBeOnlyR2Precision: "Field can have only 2 digits after comma",
                back: "Back",
                loginAction: "Login",
                registerAction: "Register",
                username: "Username",
                password: "Password",
                usernameIsRequired: "Username is required",
                passwordIsRequired: "Password is required",
                dontHaveAccountSignUp: "Don't have an account? Sign Up",
                emailIsRequired: "Email is required",
                notValidEmailAddress: "Not valid email address",
                notValidPassword: "Password does not meet complexity requirements",
                alreadyHaveAccountSignIn: "Already have an account? Sign In",
                sessionExpired: "Session expired - please login again",
                accessDenied: "Access denied",
                loggedOut: "Succesfly logged out",
            }
        },
        pl: {
            translation: {
                title: 'Ebimex elektronika',
                openHours: 'Godziny otwarcia',
                edit: "Edytuj",
                darkMode: "Tryb ciemny",
                info: "informacje",
                contact: "Kontakt",
                services: "Zlecenia",
                login: "Logowanie",
                register: "Rejestracja",
                monday: "Poniedziałek",
                tuesday: "Wtorek",
                wednesday: "Środa",
                thursday: "Czwartek",
                friday: "Piąrek",
                saturday: "Sobota",
                sunday: "Niedziela",
                closed: "Zamknięte",
                submit: "Wyślij",
                cancel: "Anuluj",
                add: "Dodaj",
                from: "Od",
                to: "Do",
                newAnnouncement: "Nowe ogłoszenie",
                delete: "Usuń",
                address: "Adres",
                country: "Kraj",
                city: "Miasto",
                postalCode: "Kod pocztowy",
                street: "Ulica",
                buildingNumber: "Numer budynku",
                apartmentNumber: "Numer mieszkania",
                phone: "Numer telefonu",
                email: "Adres email",
                addNewContactOption: "Dodaj nową opcję kontaktową",
                contactName: "Nazwa opcji kontaktowej",
                contactData: "Opcja kontaktowa",
                addNewService: "Dodaj nowe zlecenie",
                notStarted: "Nie otwarto",
                opened: "Otwarto",
                waitingForComponents: "W oczekiwaniu na części",
                testing: "W trakcie testowania",
                readyToBePickedUp: "Gotowe do odbioru",
                releasedToCustomer: "Odebrano",
                error: "Bład",
                deadline: "Przewidywana data zakończenia",
                view: "Podgląd",
                details: "Szczegóły",
                description: "Opis",
                finishDate: "Przewidywana data zakończenia",
                price: "Kwota",
                status: "Stan",
                comments: "Komentarze",
                comment: "Komentarz",
                addComment: "Dodaj komentarz",
                name: "Nazwa",
                error404: "Błąd 404",
                pageNotFound: "Strona nie odnaleziona",
                GoBackToHomePage: "Powrót do strony głównej",
                menu: "Menu",
                uploadNewImage: "Prześlij nowe zdjęcie",
                isMandatory: "jest wymagane",
                fieldIsMandatory: "Pole jest wymagane",
                timeFormatValidationError: "Pole musi mieć format hh:mm",
                nameAndContantAreMandatory: "Pole nazwa i zawartość kontaktu są wymagane",
                newCommentShouldNotBeEmpty: "Nowy komentarz nie może być pusty",
                fieldCanBeOnlyR2Precision: "Pole może mieć tylko 2 miejsca po przecinku",
                back: "Wstecz",
                loginAction: "Zaloguj",
                registerAction: "Zarejestruj",
                username: "Nazwa użytkownika",
                password: "Hasło",
                usernameIsRequired: "Nazwa użytkownika jest wymagana",
                passwordIsRequired: "Hasło jest wymagane",
                dontHaveAccountSignUp: "Nie masz konta? Zarejestruj się.",
                emailIsRequired: "Adres email jest wymagany",
                notValidEmailAddress: "Adres email jest nieprawidłowy",
                notValidPassword: "Hasło nie spełnia warunków złożoności",
                alreadyHaveAccountSignIn: "Masz już konto? Zaloguj się",
                sessionExpired: "Sesja wygasła - proszę zalogować się ponownie",
                accessDenied: "Odmowa dostępu",
                loggedOut: "Wylogowano pomyślnie",
            }
        },
    }
});

export default i18n;