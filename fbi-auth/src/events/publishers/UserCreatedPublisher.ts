import {Publisher, Subjects, UserCreatedEvent} from '@sweettech123/common'

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}