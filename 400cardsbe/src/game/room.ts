import { Deck } from './deck';
import { Player } from './player';

enum ROOM_STATUS {
  OPEN = 'o',
  IN_PROGRESS = 'ip',
  PAUSED = 'p',
  CLOSED = 'c',
}

export class Room {
  name: string;
  status: string;
  deck: Deck;
  players: Player[];
  current_player_turn: string;
  maxPlayers: number;
  dealPerPlayer: number;

  constructor(name: string) {
    this.name = name;
    this.status = ROOM_STATUS.OPEN;
    this.players = [];
    this.current_player_turn = '';
    this.deck = new Deck();
    // initalize from config.
    this.maxPlayers = 0;
    this.dealPerPlayer = 0;
  }

  startGame() {
    if (this.players.length != this.maxPlayers)
      throw new Error('Cannot start game. Only 4 players.');
    this.status = ROOM_STATUS.IN_PROGRESS;
    this.players.forEach((player) => {
      player.cards = this.deck.deal_cards(this.dealPerPlayer);
    });
  }

  addPlayer(id: string, name: string) {
    this.players.push(new Player(id, name, [], 0));
  }

  removePlayer(removedPlayer: string) {
    const playerIndex = this.players.findIndex(
      (player) => player.name === removedPlayer
    );

    this.players.splice(playerIndex, 1);
  }

  getPlayersCards() {
    return this.players.map((player) => {
      return { id: player.id, cards: player.cards };
    });
  }
}
/*
 *winning score is 41
 *total vote of all players must be >=11 for the match to start or the cards will be shuffled again
 *if score is >= 30 minimum bet is 3 and when bet is >=5 no doubling
 *if score is <30 minimum bet is 2 if bet is >=5 bet is doubled if vote won
 *if the vote is lost the score is set as negative ex: -1,-2,-3,-4,-10,-12,-14,-16...)
 *if a team is member reaches 42 and his teammate is negative the team does not win until the score becomes a non negative >=0
 *you can't play a suite other than the one being played ex: spades is being played you must only play spades
 *the only time when you can play a different suite is when you dont have any card with the same suite of which the one being played with.
 *hearts suites is more powerful than any other suite 2 H can beat Ace spades/diamonds/clubs
 *a player cant use the heart ACE at the beginning of the match
 */
