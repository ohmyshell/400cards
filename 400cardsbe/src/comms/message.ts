export class Message {
  sender: String;
  index: number;
  message: String;
  constructor(sender: String, index: number, message: String) {
    this.sender = sender;
    this.index = index;
    this.message = message;
  }
}
