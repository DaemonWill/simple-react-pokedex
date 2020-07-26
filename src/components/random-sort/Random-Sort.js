import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import "./Random-Sort.css";

//A row of two buttons with functionality to sort and randomize the displayed pokemon
export default function RandomSort(props){
  return (
    <div className="row random-sort-container col-12">
      <div className="col"></div>
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 random-sort-btns">
        <button className="btn random-btn" onClick={props.selectRandomPokemon}>
          <p className="random-btn"> Random </p>
          <FontAwesomeIcon icon={faRandom} />
        </button>
        <DropdownButton id="sort-btn" title={ "Sort by: " + props.sortByString }>
          <Dropdown.Item as="button" onClick={props.sortPokemonList} value="name"> 
            name 
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={props.sortPokemonList} value="number">
            number
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="col"></div>
    </div>
  )
}