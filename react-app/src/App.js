import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import { GameService } from "./services/GameService";

const playerOneCards = [
    {
        code: "9D",
        image: "https://deckofcardsapi.com/static/img/9D.png",
        images: {
            png: "https://deckofcardsapi.com/static/img/9D.png",
            svg: "https://deckofcardsapi.com/static/img/9D.svg"
        },
        suit: "DIAMONDS",
        value: "9"
    },
    {
        code: "5C",
        image: "https://deckofcardsapi.com/static/img/5C.png",
        images: {
            png: "https://deckofcardsapi.com/static/img/5C.png",
            svg: "https://deckofcardsapi.com/static/img/5C.svg"
        },
        suit: "CLUBS",
        value: "5"
    }
];

const playerTwoCards = [
    {
        code: "5H",
        image: "https://deckofcardsapi.com/static/img/5H.png",
        images: {
            png: "https://deckofcardsapi.com/static/img/5H.png",
            svg: "https://deckofcardsapi.com/static/img/5H.svg"
        },
        suit: "HEARTS",
        value: "5"
    },
    {
        code: "QD",
        image: "https://deckofcardsapi.com/static/img/QD.png",
        images: {
            png: "https://deckofcardsapi.com/static/img/QD.png",
            svg: "https://deckofcardsapi.com/static/img/QD.svg"
        },
        suit: "DIAMONDS",
        value: "QUEEN"
    }
];

class App extends Component {
    handleClick = () => {
        const leftContainer = document.getElementsByClassName(
            "leftCardContainer"
        );
        leftContainer[0].classList.add("launchRightAnimation");

        const rightContainer = document.getElementsByClassName(
            "rightCardContainer"
        );
        rightContainer[0].classList.add("launchLeftAnimation");

        const imgRight = document.getElementsByClassName("loser");
        imgRight[0].classList.add("loserCard");
    };

    render() {
        return (
            <div className="App">
                <div className="leftCardContainer">
                    <img src={playerOneCards[0].image} />
                </div>
                <div className="vs">
                    <p>VS</p>
                </div>
                <div className="rightCardContainer">
                    <img className="loser" src={playerTwoCards[0].image} />
                </div>
                <div>
                    <button onClick={this.handleClick}>Jouer</button>
                </div>
            </div>
        );
    }
}

export default App;
