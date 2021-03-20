import { Subjects, Publisher, FetchedFBIWantedEvent } from "@sweettech123/common";

export class FBIWantedListFetched extends Publisher<FetchedFBIWantedEvent> {
    subject: Subjects.FetchFBIWantedList = Subjects.FetchFBIWantedList;
}
