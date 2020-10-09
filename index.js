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

  findByItemType(itemType) {
    // itemType refers to the item's constructor: Weapon, Armor, etc
    return this.items.find(i => i.itemType === itemType)
  }

  findByLocation(location) {
    // location on the body - this is for armor
    return this.items.find(i => i.location === location);
  }

  findByName(name) {
    return this.items.find(i => i.name === name);
  }

  weapons() {
    return this.items.filter(i => i.constructor.name === 'Weapon');
  }

  armor() {
    return this.items.filter(i => i.constructor.name === 'Armor');
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
    this.stats = {
      health: 0,
      strength: 0,
      defense: 0,
      elemAtk: 0,
      elemDef: 0,
      luck: 0
    }

    

  }

  equip(item) {
    if (this.inventory.findByName(item.name)) {
      let foundEquippedItem;

      switch (item.itemType) {
        case 'Armor':
          foundEquippedItem = this.equipped.findByLocation(item.location);
          break;
        case 'Weapon':
          foundEquippedItem = this.equipped.findByItemType(item.itemType);
          break;
        default:
          console.log(`You can't equip ${item.name}.`)
          return
      }

      if (!foundEquippedItem) {
        this.equipped.add(item);
        console.log(`${item.name} equipped.`);
        if(Object.keys(item.effects).length > 0){
          this.updateStats(item.effects)
        }
      } else if (foundEquippedItem.name === item.name) {
        console.log(`${item.name} is already equipped.`)
      } else if (foundEquippedItem.name !== item.name) {
        console.log(`You can't equip ${item.name} while ${foundEquippedItem.name} is equipped.`)
      }

    } else {
      switch (item.itemType) {
        case 'Armor':
        case 'Weapon':
          console.log(`You don't own ${item.name}.`);
          break;
        default:
          console.log(`You can't equip ${item.name}.`);
      }
    }
  }

  updateStats(effects){
    for(let stat in effects){
      let attr = stat
      if(effects[stat] !== 0){
        this.stats[attr] = this.stats[attr] + effects[stat]
      } 
    }
  }
}

class Item {

  static world = new Inventory();

  constructor(name, price, type, imageUrl) {
    this.name = name;
    this._type = type;
    this.imageUrl = imageUrl;
    this.price = price;
    this.effects = {}

    Item.world.items.push(this)
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

const longsword = new Weapon('Longsword', 500, 'sword');
const claymore = new Weapon('Claymore', 725, 'sword');
const thievesDagger = new Weapon("Thieve's Dagger", 75, 'dagger');
const woodenBow = new Weapon('Wooden Bow', 220, 'bow');
const greatHelm = new Armor('Great Helm', 225, 'head', 'helmet')
const woodenShield = new Armor('Wooden Shield', 100, 'hand', 'shield');
const healingHerb = new Item('Healing Herb', 25, 'herb');
const quartzStaff = new Weapon('Quartz Staff', 650, 'staff')

quartzStaff.effects = {
  health: 0,
  strength: 0,
  defense: 0,
  elemAtk: 225,
  elemDef: 0,
  luck: 75
}

woodenShield.effects = {
  health: 0,
  strength: 0,
  defense: 40,
  elemAtk: 0,
  elemDef: 0,
  luck: 0
}


u.inventory.add(longsword);
u.inventory.add(woodenShield);
u.inventory.add(thievesDagger);
u.inventory.add(quartzStaff)
// u.equip(longsword);
// u.equip(longsword);
u.equip(woodenShield)
u.equip(greatHelm)
u.equip(woodenShield)
u.equip(woodenBow)
u.equip(healingHerb)
u.equip(quartzStaff)
console.log('\n' + '====== Equipped ======')
console.log(u.equipped.list())

const cart = new Cart();
cart.add(thievesDagger);
cart.add(thievesDagger);
cart.add(claymore)
cart.add(woodenBow)
console.log('====== Cart Items ======')
console.log(cart.list())

console.log('====== All Items in World ======')
console.log(Item.world.list())

console.log('====== Character Stats ======')
console.log(u.username)
console.log(u.stats)