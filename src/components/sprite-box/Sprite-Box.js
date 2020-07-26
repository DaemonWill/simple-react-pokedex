import React from "react";
import "./Sprite-Box.css";

//A component that shows off the pokemon sprite image in the center
export default function SpriteBox(props){
  return (
    <div className="row col-12 sprite-box-container" style={
      { backgroundImage : "url(" + ((props.pokemon) ? props.pokemon.spriteUrl : "") + ")" }
    }></div>
  )
}