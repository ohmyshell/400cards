import { Deck } from "./deck";
import { Player } from "./player";

export class Game {
  name: string;
  deck: Deck = new Deck();
  players: Array<Player> = new Array<Player>();
  current_player_turn: string = "";

  constructor(
    name: string,
    deck: Deck,
    players: Array<Player>,
    current_player_turn: string
  ) {
    this.name = name;
    this.deck = deck;
    this.players = players;
    this.current_player_turn = current_player_turn;
  }

  start(players: string[]) {
    players.push();
    const cards_per_player = this.deck.cards.length / this.players.length;
    this.players.forEach((player) => {
      player.cards = this.deck.deal_cards(cards_per_player);
    });
    throw new Error("Abstract class should be implemented");
  }

  update() {
    throw new Error("Abstract class should be implemented");
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
