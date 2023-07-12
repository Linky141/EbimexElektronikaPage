import { Service } from "../models/service";

export function findService(service: Service[] | null, id: number) {
    return service?.find(x => x.id === id)!;
}

export function findServiceId(service: Service[] | null, id: string | undefined) {
    return findService(service, parseInt(id!))
}

export function CreateSendDate(year: number, month: number, day: number) {
    let yearS = year.toString();
    let monthS = month.toString();
    let dayS = day.toString();
    let date = yearS + '-' + (monthS.length < 2 ? '0' + monthS : monthS) + '-' + (dayS.length < 2 ? '0' + dayS : dayS) + 'T00:00:00';
    return date;
}