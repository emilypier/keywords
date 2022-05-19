const fs = require('fs');
const uuid = require('uuid/v1'); //gives each text input a unique id
const util = require('util');
const { stringify } = require('querystring');

const readAsync = util.promisify(fs.readFile); 
const writeAsync = util.promisify(fs.writeFile);
const deleteAsync = util.promisify(fs.unlink)

class DB {
  read(){
    return readAsync('db/db.json', 'utf-8')
  }

  write(text){
    return writeAsync('db/db.json', JSON.stringify(text));
  }

  delete(text){
    return deleteAsync('db/db.json', JSON.stringify(text));
  }

  readNotes(){
    return this.read().then((texts)=>{
      let allTexts;

      try{
        allTexts = [].concat(JSON.parse(texts))
      }catch(err){
        allTexts = []
      }

      return allTexts;
    })
  }

  writeNotes(text){
    const {textContent} = text; //deconstructing note
    const newNote = {
      textContent, id: uuid() //unique id
    }

    return this.readNotes().then((notes)=>{
      return [...texts, newText]
    }).then((newTextsArray) => {
      return this.write(newTextsArray)
    })
  }

};

module.exports = new DB();