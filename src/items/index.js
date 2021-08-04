class Item {
  constructor(client) {
    this.client = client
  }
  
  generateID(length) {
    let randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    while (this.IDexist(result, this.client.db)) {
      for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
    }
    
    return result
  }
  
  IDexist(id, database) {
    if (database.has(id)) return true
    return false
  }
  
}
