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
    username: string,
    id: string,
    clientsCount: number,
    enterLeave: boolean
  ) {
    console.log(`${enterLeave ? '+' : '-'} ${username} ${id}`);
    console.log(`Total Clients: ${clientsCount}`);
  }
}
