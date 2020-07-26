import React from "react";
import SpriteBox from "../sprite-box/Sprite-Box";
import ChangePokemon from "../change-pokemon/Change-Pokemon";
import PokemonTyping from "../pokemon-typing/Pokemon-Typing";
import "./Pokemon-Display.css";

//A container for displaying the currentPokemon's info, and the next/prev pokemon options
export default function PokemonDisplay(props){
  if(props.currentPokemon){
    return (
      <div className="row pokemon-display-container">
        <div className="col content-border"></div>
        <div className="row col-12 col-md-10 col-lg-9 col-xl-8 pokemon-info">
          <div className="col-3 change-pokemon">
            <ChangePokemon pokemon = {props.previousPokemon}
                          setEachPokemon = {props.setEachPokemon}
                          direction = "previous"
            ></ChangePokemon>
          </div>
          <div className="col-6 current-pokemon">
            <h4 className="pokemon-name">{props.currentPokemon.name}</h4>
            <SpriteBox pokemon = {props.currentPokemon} />
            <div className="number-and-types">
              <b className="d-inline pokedex-number"> # {props.currentPokemon.pokedexNumber}</b>
              {props.currentPokemon.types.map((type) => {
                return (
                  <PokemonTyping key={type} type = {type} />
                )
              })}
            </div>
            <p className="height-weight"> height : {props.currentPokemon.height} ft </p>
            <p className="height-weight"> weight : {props.currentPokemon.weight} lbs </p>
          </div>
          <div className="col-3 change-pokemon">
            <ChangePokemon pokemon = {props.nextPokemon}
                            setEachPokemon = {props.setEachPokemon}
                            direction = "next"
            ></ChangePokemon>
          </div>
        </div>
        <div className="col content-border"></div>
      </div>
    )
  }
  else{
    return null;
  }
}