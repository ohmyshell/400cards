export class Logger {
  static addSeparators: boolean = true;
  static showTimeStamp: boolean = true;
  private static addExtra(msg: string) {
    if (Logger.showTimeStamp) msg = `[${new Date().toLocaleString()}] ${msg}`;
    if (Logger.addSeparators) msg += '\n-------------------------\n';
    return msg;
  }

  static log(msg: string) {
    msg = this.addExtra(msg);
    console.log(msg);
  }

  static info(msg: string) {
    msg = 'INFO ' + msg;
    msg = this.addExtra(msg);
    console.info(msg);
  }

  static error(msg: string) {
    msg = 'ERROR ' + msg;
    msg = this.addExtra(msg);
    console.error(msg);
  }

  static logEntry(
    id: string,
    username: string,
    clientsCount: number,
    enterLeave: boolean
  ) {
    let msg = `${username} ${
      enterLeave ? 'Connected' : 'Disconnected'
    } ID: ${id}
    Total Clients: ${clientsCount}`;
    if (Logger.showTimeStamp) msg = `[${new Date().toLocaleString()}] ${msg}`;
    if (Logger.addSeparators) msg += '\n-------------------------\n';
    console.log(msg);
  }
}
