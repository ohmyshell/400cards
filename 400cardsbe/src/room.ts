import { Player } from "./player";

export class Room {
  name: string;
  players: Player[];
  status: string;

  constructor(name: string, status: string, players: Player[]) {
    this.name = name;
    this.status = status;
    this.players = players;
  }
}
