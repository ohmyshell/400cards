import { Message } from "./message";

export class Chat {
  room: String;
  messages: Array<Message>;

  constructor(room: String, messages: Array<Message>) {
    this.room = room;
    this.messages = messages;
  }
}
