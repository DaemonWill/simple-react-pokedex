import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SpriteBox from "../sprite-box/Sprite-Box";
import "./Change-Pokemon.css";

//A slim column for displaying the next/prev pokemon and a button to change pokemon
export default function ChangePokemon(props){
  //change the currentPokemon to the pokemon represented at previous or next, update accordingly
  const shiftPokemon = function(){
    if(props.pokemon){
      props.setEachPokemon(props.pokemon.index);
    }
  }

  //dynamically show a left or right arrow depending on if the given pokemon is the previous or next
  const generateArrow = function(){
    if(props.direction === "previous"){
      return (
        <button className="arrow-icon" onClick={shiftPokemon}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      )
    }
    else{
      return (
        <button className="arrow-icon" onClick={shiftPokemon}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )
    }
  }

  return (
    <div className="col-12 change-pokemon-container">
      <SpriteBox pokemon = {props.pokemon} />
      { generateArrow() }
    </div>
  )
}