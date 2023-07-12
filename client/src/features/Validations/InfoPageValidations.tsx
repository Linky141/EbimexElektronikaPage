import { useTranslation } from "react-i18next";
import { object, string } from "yup";

export function OpenHoursSchema() {
    const { t } = useTranslation();
    return object({
        OpeningHoursMondayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursMondayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursTuesdayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursTuesdayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursWednesdayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursWednesdayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursThursdayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursThursdayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursFridayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursFridayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursSaturdayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursSaturdayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursSundayStart: string().required(t('fieldIsMandatory')).test('OpeningHoursSundayStart', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursMondayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursMondayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursTuesdayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursTuesdayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursWednesdayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursWednesdayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursThursdayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursThursdayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursFridayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursFridayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursSaturdayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursSaturdayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
        OpeningHoursSundayEnd: string().required(t('fieldIsMandatory')).test('OpeningHoursSundayEnd', t('timeFormatValidationError'), function (value) {if (/^\d{2}:\d{2}$/.test(value) || value === 'Closed')return true; else return false;}),
    })
}