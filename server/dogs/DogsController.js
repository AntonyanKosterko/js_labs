const { DogsService } = require('./DogsService');

class DogsController {
  static findDogs(req, res) {
    try {
      res.json(DogsService.findDogs());
    } catch (err) {
      res.status(400).json({ status: 'Bad Request', message: err.message });
    }
  }

  static findDogById(req, res) {
    try {
      const id = Number.parseInt(req.params.id);
      res.json(DogsService.findDogs(id));
    } catch (err) {
      res.status(400).json({ status: 'Bad Request', message: err.message });
    }
  }

  static addDog(req, res) {
    try {
      const newDog = DogsService.addDog(req.body);
      res.status(201).json(newDog);
    } catch (err) {
      res.status(400).json({ status: 'Bad Request', message: err.message });
    }
  }

  static deleteDog(req, res) {
    try {
      const id = Number.parseInt(req.params.id);
      const remainingDogs = DogsService.deleteDog(id);
      res.json(remainingDogs);
    } catch (err) {
      res.status(400).json({ status: 'Bad Request', message: err.message });
    }
  }
}

module.exports = { DogsController };
