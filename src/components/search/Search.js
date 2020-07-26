import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./Search.css";

//A search bar component that can handle searching by name or pokedex-number
export default function Search(props){
  /*
  * handle the onChange event in the search-bar and update the searchString
  * @params { event<DOM Event> }
  * @return { void }
  */
  const updateSearchString = function(event){
    props.setSearchString(event.target.value);
  }

  /*
  * handle the search form submission and update current, prev, and next pokemon if applicable
  * @params { event<DOM Event> }
  * @return { void }
  */
  const submitSearch = function(event){
    //stop the form from reloading the page upon submit
    event.preventDefault();
    props.searchAndUpdatePokemon();
  }

  return (
    <div className="row search-container col-12">
      <div className="col"></div>
      <form className="col-12 col-md-10 col-lg-9 col-xl-8 search-form" onSubmit={submitSearch}>
        <div className="col-12 search-form-fields">
          <input type="text" id="search-bar" value={props.searchString} onChange={updateSearchString}/>
          <button className="btn search-btn" type="submit" onClick={submitSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="col-12 search-form-info">
          <p className="search-form-info"> Search pokemon by name or pokedex number. </p>
        </div>
      </form>
      <div className="col"></div>
    </div>
  );
}