import Card from './card';

export class Player {
  id: string;
  name: string;
  cards: Array<Card>;
  vote: number;
  score: number;
  
  constructor(id: string, name: string, cards: Array<Card>, vote: number) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.vote = vote;
    this.score = 0;
  }
}
