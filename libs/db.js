let fs = require('fs');
let db = {
  path: './storage.json',
  load: function(){
    let obj = null;
    try{
      let json = fs.readFileSync(this.path, 'utf8');
      obj = JSON.parse(json);
    }catch(ex){
      return {};
    }
    return obj;
  },
  save: function(obj){
    fs.writeFileSync(this.path, JSON.stringify(obj, null, 2));
  },
  get: function(key){
    let obj = this.load();
    return obj[key];
  },
  set: function(key, value){
    let obj = this.load();
    obj[key] = value;
    this.save(obj);
  }
}

module.exports = db;
