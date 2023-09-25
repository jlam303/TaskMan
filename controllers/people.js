let people = require('../tasks.json');

const readPeople = (req, res) => {
  res.json({ success: true, data: people });
};
let length = people.length + 1;
const createPeople = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(404).json({ success: false, msg: 'Provide name/desc' });
  }
  let person = { id: length++, name: name, description: description };
  people.push(person);
  res.status(201).json({ success: true, data: [people] });
};

const updatePeople = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const person = people.find((person) => {
    return person.id === Number(id);
  });
  if (!person) {
    return express.json({ success: false, data: [] });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
      person.description = description;
    }
    return person;
  });
  res.status(202).json({ data: newPeople, success: true });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => {
    return person.id === Number(id);
  });
  if (!person) {
    return res.status(404).json({ success: false, msg: 'e' });
  }
  people = people.filter((person) => {
    return person.id != Number(id);
  });
  res.status(202).json({ data: people, success: true });
};

module.exports = { readPeople, createPeople, updatePeople, deletePerson };
