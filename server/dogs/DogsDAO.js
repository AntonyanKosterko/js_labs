const { DogsRepository } = require('./DogsRepository');

class DogsDAO {
  constructor(id, src, title, text) {
    this.id = id;
    this.src = src;
    this.title = title;
    this.text = text;
  }

  static _validateId(id) {
    const numberId = Number.parseInt(id);
    if (Number.isNaN(numberId)) {
      throw new Error('Invalid ID');
    }
  }

  static _validate(dog) {
    if (
      dog.id === undefined ||
      dog.src === undefined ||
      dog.title === undefined ||
      dog.text === undefined
    ) {
      throw new Error('Invalid dog data');
    }

    this._validateId(dog.id);
  }

  static find() {
    const dogs = DogsRepository.read();
    return dogs.map(({ id, src, title, text }) => new this(id, src, title, text));
  }

  static findById(id) {
    this._validateId(id);
    const dogs = DogsRepository.read();
    const dog = dogs.find((s) => s.id === id);
    return new this(dog.id, dog.src, dog.title, dog.text);
  }

  static insert(dog) {
    this._validate(dog);
    const dogs = DogsRepository.read();
    DogsRepository.write([...dogs, dog]);
    return new this(dog.id, dog.src, dog.title, dog.text);
  }

  static delete(id) {
    this._validateId(id);
    const dogs = DogsRepository.read();
    const filteredDogs = dogs.filter((s) => s.id !== id);
    DogsRepository.write(filteredDogs);
    return filteredDogs.map(({ id, src, title, text }) => new this(id, src, title, text));
  }

  toJSON() {
    return {
      id: this.id,
      src: this.src,
      title: this.title,
      text: this.text,
    };
  }
}

module.exports = { DogsDAO };
