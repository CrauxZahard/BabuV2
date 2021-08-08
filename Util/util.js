class Util {
  constructor(client) {
    this.client = client
  }
  
  generateID(amount, database) {
    let random = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let result = ''
    
    for(var i = 0; i < amount; i++) {
      result += random.charAt(Math.floor(Math.random() * random.length))
    }
    
    let tries = 0
    while(this.IDexist(result, database) && tries <= 20) {
      //misal udah ngulangin 20 kali dan tetap ada id yg sama, loop ini berenti
      if(tries > 19) return false
      
      //generate kodenya lagi
      let newCode = []
      for(var i = 0; i < amount; i++) {
       newCode[i] = random.charAt(Math.floor(Math.random() * random.length))
      }
      result = newCode.join('')
      tries++
    }
    return result
  }
  
  IDexist(code, database) {
    if(database.has(code)) return true
    return false
  }
  
}

module.exports = Util
