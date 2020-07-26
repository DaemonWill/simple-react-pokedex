import axios from "axios";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

//A service for interacting with the pokeapi
export default class PokeapiService {
  /*
  * Fetches all of the pokemon present in the national pokedex
  * @params { }
  * @return { Promise<Object> }
  */
  getAllPokemon() {
    let url = BASE_URL + "?limit=964";
    return axios.get(url);
  }

  /*
  * Fetches a pokemon based off of their name or their pokedex number as an identifier
  * @params { identifier<String> }
  * @return { Promise<Object> }
  */
  getPokemon(identifier) {
    let url = BASE_URL + "/" + identifier;
    return axios.get(url);
  }
}
