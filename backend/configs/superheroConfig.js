const fs = require('fs');
var superheroData = fs.readFileSync('./superheroes.json');
var superheroes = JSON.parse(superheroData);

module.exports.superheroes = superheroes;