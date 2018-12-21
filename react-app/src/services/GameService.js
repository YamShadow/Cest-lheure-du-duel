import axios from "axios";

export class GameService {
  state = {
    tirage: 0,
    deck: [],
    cardsJoueur1: [],
    cardsJoueur2: [],
    board: {
      joueur1: [],
      joueur2: []
    }
  };

  constructor() {
    this.axios(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    ).then(deck => {
      this.state.deck = deck;
      this.cuttingDeck("cardsJoueur1");
    });
  }

  //   Getter

  getState = () => {
    return this.state;
  };

  getCardsPlayer1 = () => {
    return this.state.cardsJoueur1;
  };

  //   Setter

  //   Methode générique

  // Methode Axios qui permet de faire des call ajax
  axios = url => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(res => {
          console.error("API not call on :" + url);
          reject("Error");
        });
    });
  };

  // Methode CuttingDeck qui permet de découper le deck de cards en deux
  cuttingDeck = (index, finish = false) => {
    this.axios(
      "https://deckofcardsapi.com/api/deck/" +
        this.state.deck.deck_id +
        "/draw/?count=26"
    ).then(tirage => {
      this.state[index] = tirage;
      if (!finish) this.cuttingDeck("cardsJoueur2", true);
      return true;
    });
  };

  round = () => {
    console.log(this.state);
    console.log(this.state.cardsJoueur1);
  };
}
