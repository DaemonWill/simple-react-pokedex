import React from "react";
import "./Pokemon-Typing.css";

//A dynamic tag that displays the currentPokemon's type
export default function PokemonTyping(props){
  return (
    <span className={"pokemon-typing " + props.type}> 
      { props.type } 
    </span>
  )
}