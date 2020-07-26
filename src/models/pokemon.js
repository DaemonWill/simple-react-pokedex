/*
* Setup a class for storing essential pokemon data
* @params { index<Number>, pokeJson<Object> }
* @return { void }
*/
export default class Pokemon {
  constructor(index, pokeJson) {
    this.index = index;
    this.name = pokeJson.name;
    this.pokedexNumber = pokeJson.id;
    this.spriteUrl = pokeJson.sprites.front_default;
    //height is stored in decimetres... convert to feet and round to 2 decimal places
    this.height = (pokeJson.height / 3.048).toFixed(2);
    //weight is stored in hectograms... convert this to pounds and round to 2 decimal places
    this.weight = (pokeJson.weight / 4.536).toFixed(2);
    this.types = [];
    //pokemon can have dual-types stored in typeslots, get the names of those types
    for(let typeSlot of pokeJson.types){
      this.types.push(typeSlot.type.name);
    }
  }
}
