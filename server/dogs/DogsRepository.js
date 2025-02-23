const { DBConnector } = require('../../modules/DBConnector');

class DogsRepository {
  static db = new DBConnector('dogs.json');

  static read() {
    const file = this.db.readFile();
    return JSON.parse(file);
  }

  static write(json) {
    const stringifiedData = JSON.stringify(json, null, 2);
    this.db.writeFile(stringifiedData);
  }
}

module.exports = { DogsRepository };
