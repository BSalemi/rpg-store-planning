class Person {
  constructor(username, gold, type) {
    this.username = username;
    this._type = type;
    this.inventory = new Inventory();
    this.gold = gold;
  }

  get type() {
    return this._type;
  }
}