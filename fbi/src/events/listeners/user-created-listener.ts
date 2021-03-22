import { Listener, Subjects, UserCreatedEvent} from '@sweettech123/common'
import {queuGroupName} from './queue-group-name';
import {Message} from 'node-nats-streaming';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject:Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName = queuGroupName;
    async onMessage(data: UserCreatedEvent['data'], msg:Message) {
        // Perform any task if required 
        console.log(`Event received:${queuGroupName} ${this.subject}`, data);
        msg.ack();
    }
} 