import {Listener, Subjects, FetchedFBIWantedEvent} from '@sweettech123/common';
import {queueGroupName} from './queueGroupName';
import {Message} from 'node-nats-streaming';

export class FBIWantedListListener extends Listener<FetchedFBIWantedEvent> {
    subject: Subjects.FetchFBIWantedList = Subjects.FetchFBIWantedList;
    queueGroupName = queueGroupName;
    async onMessage(data: FetchedFBIWantedEvent['data'], msg:Message) {
        // If any taks need to perfrom with the data published
        console.log(`${queueGroupName} ${this.subject}`, data);
        msg.ack();
    }
}