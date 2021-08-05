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
    this.ownerHistory = data.ownerHistory
    this.stats = data.stats
    this.skills = data.skill || null
    this.maxSkillSize = data.maxSkillSize || 0
  }
  
  upSkillSize(item, database, userWeapon) {
    /*
    item = weapon class object
    database = the database table to set new value
    userWeapon = user weapon collection (array)
    */
    
    //use db.get() to fill the userWeapon
    item = userWeapon.filter(i => i.id == item.id)
    item[0].maxSkillSize += 1
    database.set(item.owner, item)
  }
  
}
