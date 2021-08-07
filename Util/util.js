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
    
    while(this.IDexist(result, database)) {
      //generate kodenya lagi
      let newCode = []
      for(var i = 0; i < amount; i++) {
       newCode[i] = random.charAt(Math.floor(Math.random() * random.length))
      }
      result = newCode.join('')
    }
    return result
  }
  
  IDexist(code, database) {
    if(database.has(code)) return true
    return false
  }
  
}