import React, { Component } from "react";
import axios from "axios";

export class Game extends Component {
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

  componentDidMount = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        const deck = res.data;
        this.setState({ deck });
      })
      .catch(res => {
        console.log("API not call");
      });
  };

  cuttingDeck = () => {
    console.log("tirage :" + this.state.tirage);
    if (this.state.tirage < 2) {
      const deck = axios
        .get(
          "https://deckofcardsapi.com/api/deck/" +
            this.state.deck.deck_id +
            "/draw/?count=26"
        )
        .then(res => {
          const cards = res.data;
          console.log(cards);
          console.log(this.state.tirage);
          if (this.state.tirage === 0) {
            this.setState({ tirage: 1 });
            console.log(this.state.tirage);
            this.setState({ cardsJoueur1: cards });
          } else if (this.state.tirage === 1) {
            this.setState({ tirage: 2 });
            console.log(this.state.tirage);
            this.setState({ cardsJoueur2: cards });
          }
        })
        .catch(res => {
          console.log("API not call");
        });
    }
  };

  axios = url => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          console.log(res);
          resolve(res.data);
        })
        .catch(res => {
          console.error("API not call on :" + url);
          reject("Error");
        });
    });
  };

  render() {
    return <div>{this.cuttingDeck()}</div>;
  }
}
