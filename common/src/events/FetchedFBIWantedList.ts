import { Subjects } from './subjects';

export interface FetchedFBIWantedEvent {
    subject: Subjects.FetchFBIWantedList;
    data: {
        total:number;
        items: object
    }
}
