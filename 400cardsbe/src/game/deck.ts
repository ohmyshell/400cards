import Card, { Value, Suite } from './card';

export class Deck {
  cards: Array<Card>;
  constructor() {
    this.cards = [];
    this.populate();
    this.shuffle();
  }

  populate() {
    const values: Array<Value> = [
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      'Jack',
      'Queen',
      'King',
      'Ace',
    ];
    const suites: Array<Suite> = ['Diamond', 'Spade', 'Club', 'Heart'];
    values.map((value) => {
      suites.map((suite) => {
        this.cards.push(new Card(value, suite));
      });
    });
  }

  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  deal_cards(amount: number) {
    return this.cards.splice(0, amount);
  }
}
