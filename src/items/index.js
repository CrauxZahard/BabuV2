class Weapon {
  constructor(client, data) {
    this.client = client
    this.id = data.id
    this.name = data.name
    this.rarity = data.rarity
    this.ele = data.ele
    this.xp = data.xp
    this.owner = data.owner
    this.originalOwner = data.originalOwner
    this.ownerHistory = data.ownerHistory || []
    this.stats = data.stats
    this.skills = data.skill || null
    this.maxSkillSize = data.maxSkillSize || 0
  }
  
  upSkillSize(item, database, userWeapon) {
    /*
    item = weapon class object OR item id (string)
    database = the database table to set new value
    userWeapon = user weapon collection (array)
    */
    for(var i = 0;i < userWeapon.length) {
      if(userWeapon[i].id === item.id || userWeapon[i].id === item) {
        userWeapon[i].maxSkillSize += 1
      }
    }
    database.set(userWeapon[0].owner, userWeapon)
  }
  
  
  transferItem(item, newOwner, oldOwner, database) {
    /*
    item = Weapon class
    newOwner = user id (string)
    oldOwner = user id (string)
    database = the database table to set the new value
    */
    
    //removing the weapon from old owner
    let oldCollection = database.get(oldOwner)
    oldCollection.filter(i => i.id !== item.id)
    database.set(oldOwner, oldCollection)
    
    //adding the weeapon to new owner
    let newCollection = database.get(newOwner)
    item.ownerHistory.push(oldOwner)
    newCollection.push(item)
    database.set(newOwner, newCollection)
  }
  
}

module.exports = Weapon
