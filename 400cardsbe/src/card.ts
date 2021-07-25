export type Value = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King' | 'Ace';
export type Suite = 'Diamond' | 'Spade' | 'Club' | 'Heart';

export default class Card {
  value: Value;
  suite: Suite;
  constructor(value: Value, suite: Suite) {
    this.value = value;
    this.suite = suite;
  }
}
