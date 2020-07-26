import React, { useState, useEffect } from "react";
import Search from "./components/search/Search";
import RandomSort from "./components/random-sort/Random-Sort";
import PokemonDisplay from "./components/pokemon-display/Pokemon-Display";
import Pokemon from "./models/pokemon";
import PokeapiService from "./services/pokeapi-service";
const pokeapi = new PokeapiService();

export default function App() {
  //initialize/assign state values
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [sortByString, setSortByString] = useState("number"); //can sort by pokemon number or name
  const [searchString, setSearchString] = useState("");

  //upon initialization, populate the pokemonList and assign values to currentPokemon & nextPokemon
  useEffect(() => {
    if(pokemonList.length === 0){
      populatePokemonList();
    }
    else{
      //let the initial currentPokemon be the first pokemon in the list
      setEachPokemon(0);
    }
    // eslint-disable-next-line
  }, [pokemonList]);

  /*
  * Use the pokeapi-service to populate the pokemonList, then update the current, next, and prev pokemon
  * @params {}
  * @return { void }
  */
  const populatePokemonList = function(){
    pokeapi.getAllPokemon()
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((err) => {
        alert("something went wrong with populating pokemonList, please see the logs");
        console.log(err);
      });
  };

  /*
  * Set the currentPokemon and its neighbors randomly
  * @params {}
  * @return { void }
  */
  const selectRandomPokemon = function(){
    let rand = Math.floor(Math.random() * 963);
    setEachPokemon(rand);
  }

  /*
  * Use the pokeapi service to assign values to the current, next and previous pokemon
  * @params { currentIndex<Number> }
  * @return { void }
  */
  const setEachPokemon = function(currentIndex){
    //assign currentPokemon data
    pokeapi.getPokemon(pokemonList[currentIndex].name)
      .then((response) => {
        setCurrentPokemon(new Pokemon(currentIndex, response.data));
      })
      .catch((err) => {
        alert("something went wrong assigning the currentPokemon, please see the logs");
        console.log(err);
      });
    //assign nextPokemon if applicable
    if(currentIndex < pokemonList.length - 1){
      pokeapi.getPokemon(pokemonList[currentIndex + 1].name)
        .then((response) => {
          setNextPokemon(new Pokemon(currentIndex + 1, response.data));
        })
        .catch((err) => {
          alert("something went wrong assigning the nextPokemon, please see the logs");
          console.log(err);
        });
    }
    //when the list is updated and the currentPokemon is the last, the next should be null
    else{
      setNextPokemon(null);
    }
    //assign previousPokemon if applicable
    if(currentIndex >= 1){
      pokeapi.getPokemon(pokemonList[currentIndex - 1].name)
        .then((response) => {
          setPreviousPokemon(new Pokemon(currentIndex - 1, response.data));
        })
        .catch((err) => {
          alert("something went wrong assigning the previousPokemon, please see the logs");
          console.log(err);
        });
    }
    //when the list is updated and the currentPokemon is the first, the prev should be null
    else{
      setPreviousPokemon(null);
    }
  };

  /*
  * search through pokemonList for a pokemon matching the searchString; update current, prev, and next
  * @params {}
  * @return { void }
  */
  const searchAndUpdatePokemon = function(){
    if(!searchString){
      alert("please provide the name or pokedex number of the pokemon you wish to search for");
    }
    else{
      //use pokeapi to search using the name or pokedex number, then update state
      pokeapi.getPokemon(searchString)
        .then((response) => {
          if(response.status === 200){
            let name = response.data.name;
            for(let index in pokemonList){
              if(pokemonList[index].name === name){
                //get the index and update current, previous, and next
                setEachPokemon(parseInt(index, 10));
                break;
              }
            }
          }
          else{
            alert("could not find a pokemon with the name or pokedex number = " + searchString);
          }
        })
        .catch((err) => {
          alert("something went wrong performing a search, please see the logs");
          console.log(err);
        })
    }
  }

  /*
  * Sort the pokemonList according to the given sort-button's value
  * @params { event<DOM Event> }
  * @return { void }
  */
  const sortPokemonList = function(event){
    let sortBy = event.target.value;
    if(sortBy === "number"){
      //the url for each pokemon is the same aside for their pokedex number, we can use this property
      //and directly compare urls to determine how to sort by pokedex number
      setPokemonList(pokemonList.sort((a, b) => {
        //first check length, if the length is greater, than the pokedex number is a higher power of 10
        if(a.url.length < b.url.length){
          return -1;
        }
        else if(a.url.length > b.url.length){
          return 1;
        }
        //we can directly compare the urls if their pokedex numbers are at the same power of 10
        // ex: "pokeNumber/100" > "pokeNumber/20" == false , but "pokeNumber/10" < "pokeNumber/20" == true
        if(a.url < b.url){
          return -1;
        }
        else{
          return 1;
        }
      }));
    }
    else{
      //we can use a simpler version of the above method to just sort by the name value
      setPokemonList(pokemonList.sort((a, b) => {
        if(a.name < b.name){
          return -1;
        }
        else{
          return 1;
        }
      }));
    }
    //update the currentPokemon and their neighbors after updating list
    setEachPokemon(0);
    //update sortByString
    setSortByString(sortBy);
  }

  return (
    <div className="app-container">
      <Search searchString = {searchString}
              setSearchString = {setSearchString}
              searchAndUpdatePokemon = {searchAndUpdatePokemon}
      ></Search>
      <RandomSort sortByString = {sortByString}
                  setSortByString = {setSortByString}
                  sortPokemonList = {sortPokemonList}
                  selectRandomPokemon = {selectRandomPokemon}
      ></RandomSort>
      <PokemonDisplay currentPokemon = {currentPokemon}
                      previousPokemon = {previousPokemon}
                      nextPokemon = {nextPokemon}
                      setEachPokemon = {setEachPokemon}
      ></PokemonDisplay>
    </div>
  );
}
