import { DateTime } from "luxon"

export const toLocalTime = (utc) => {
    const localTime = DateTime.fromISO(utc, { zone: 'utc' }).toLocal();

    return localTime.toFormat("MMMM d, yyyy 'at' h:mm a");

}