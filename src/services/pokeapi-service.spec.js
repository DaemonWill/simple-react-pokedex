import chai from "chai";
import sinon from "sinon";
import axios from "axios";
import PokeapiService from "./pokeapi-service";
const pokeapi = new PokeapiService();

let spy, stub;

/*
* Simple testing for the pokeapi service
*/
describe("Pokeapi Service", () => {
  beforeEach(function(){
    //refresh a spy obj for function wrapping
    spy = sinon.spy();
  });

  /*
  * mock a getAllPokemon call with the service
  */
  it("should use axios to make a get request", function(){
    //wrapping the post() method for axios to avoid an actual call
    stub = sinon.stub(axios, "get", spy);
    //attempt to trigger the spy
    pokeapi.getAllPokemon();
    stub.restore();
    chai.assert.isTrue(spy.called);
  });
});
