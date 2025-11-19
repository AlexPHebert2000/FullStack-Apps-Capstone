import fs from 'fs/promises';
import { Buffer } from 'buffer';

export class fsAdapter {
    #tables;
    #filePrefix;
    #filesCreated;
  constructor (tables, filePrefix = "./src/server/database/files/"){
    this.#tables = tables;
    this.#filePrefix = filePrefix;
    this.#filesCreated = false;
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.reset = this.reset.bind(this);
    this.snapshot = this.snapshot.bind(this);
  }

  async #readTable(tableName) {
    try{ 
      const data = await fs.readFile(`${this.#filePrefix}${tableName}.txt`);
      return JSON.parse(data)
    }
    catch (e) {
      console.log(`Error reading table ${tableName} : ${e.message}`)
      return null;
    }
  } 

  async #createFiles() {
    for (let tableName of this.#tables){
      await fs.writeFile(`${this.#filePrefix}${tableName}.txt`, new Uint8Array(Buffer.from("{}")));
      console.log(`file \"${this.#filePrefix}${tableName}.txt\" created`);
    }
  }

  async load(){
    if (! this.#filesCreated ){
      await this.#createFiles();
      this.#filesCreated = true;
    }
    const data = {}
    for (let tableName of this.#tables) {
      let table = await this.#readTable(tableName);
      data[tableName] = table;
    }
    return data;
  }

  async save(){}
  reset(){}
  snapshot(){}
}