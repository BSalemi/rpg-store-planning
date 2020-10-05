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

class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  list() {
    return this.items.forEach(i => console.log(i.name))
  }
}

class Cart extends Inventory {
  constructor() {
    super();
  }

  get total() {
    return this.items.reduce((a, c) => ({ price: a.price + c.price })).price
  }
}

class User extends Person {
  constructor(username, email, password, classType, gold = 500, type = 'user') {
    super(username, gold, type)
    this.username = username;
    this.email = email;
    this.password = password;
    this.classType = classType;
    this.equipped = new Inventory();

    this.strength = 0;
    this.defense = 0;
    this.luck = 0;
    this.magic = 0;

  }
}

class Item {
  constructor(name, price, type, imageUrl) {
    this.name = name;
    this._type = type;
    this.imageUrl = imageUrl;
    this.price = price;
    this.buffs = []; // ??
    this.debuffs = []; // ??
  }

  get type() {
    return this._type;
  }

  get itemType() {
    return this.constructor.name;
  }

  get sellPrice() {
    return this.price / 2;
  }
}

class Weapon extends Item {
  constructor(name, price, type, imageUrl) {
    super(name, price, type, imageUrl);
  }
}

class Armor extends Item {
  constructor(name, price, location, type, imageUrl) {
    super(name, price, type, imageUrl);
    this.location = location; // on the user's body
  }
}

const shopkeeper = new Person('shopkeeper', 5000, 'shopkeeper');
const u = new User('jess', 'jess@gmail.com', '1234')
console.log(shopkeeper, u)