import React, { Component } from "react";
import { connect } from "react-redux";
import "../actions/index";
import "./App.css";
import {
    getDeck,
    cuttingDeck,
    tirerCard,
    cleanBord,
    bataille
} from "../actions/index";

const BATAILLE =
    "Il y a eu une bataille. Les cartes ont été sauvegardés (oui, on a la flemme de faire le front :D)";
const WIN_PLAYER_1 = "Le joueur 1 a gagné";
const WIN_PLAYER_2 = "Le joueur 2 a gagné";

class App extends Component {
    constructor(props) {
        super(props);
        this.props.getDeck(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
    }

    handleClick = () => {
        let winner = this.round();
        this.cleanStyleDashboard(false, winner);
        if (winner === null) {
            document.getElementById("texte").innerText = BATAILLE;
        } else {
            this.addLoose(winner);
        }
    };

    confirmRound = () => {
        this.cleanStyleDashboard(true);
        let winner = this.round();
        if (winner != null) {
            this.props.tirerCard(winner);
            this.props.cleanBord();
        } else {
            this.props.bataille();
        }
    };

    cleanStyleDashboard = (state, winner = null) => {
        if (state) {
            document.getElementById("play").style.display = "inline-block";
            document.getElementsByClassName("vs")[0].style.color = "#000";
            document.getElementById("validate").style.display = "none";

            document
                .getElementsByClassName("launchLeftAnimation")[0]
                .classList.remove("launchLeftAnimation");
            document
                .getElementsByClassName("launchRightAnimation")[0]
                .classList.remove("launchRightAnimation");
            document
                .getElementsByClassName("loserCard")[0]
                .classList.remove("loserCard");
        } else {
            document.getElementById("play").style.display = "none";
            document.getElementsByClassName("vs")[0].style.color = "#fff";
            this.animation();
            document.getElementById("validate").style.display = "inline-block";
            document.getElementById("texte").style.display = "block";
            document.getElementById("texte").innerText =
                winner == "Joueur1" ? WIN_PLAYER_1 : WIN_PLAYER_2;
        }
    };

    round = () => {
        let winner;

        let valueCardPlayer1 = this.valueCard(
            this.props.gameReduceurs.cardsJoueur1.cards[0].value
        );
        let valueCardPlayer2 = this.valueCard(
            this.props.gameReduceurs.cardsJoueur2.cards[0].value
        );

        if (valueCardPlayer1 == valueCardPlayer2) {
            winner = null;
        } else if (valueCardPlayer1 > valueCardPlayer2) {
            winner = "Joueur1";
        } else {
            winner = "Joueur2";
        }

        return winner;
    };

    valueCard = value => {
        switch (value) {
            case "JACK":
                return 11;
            case "QUEEN":
                return 12;
            case "KING":
                return 13;
            case "ACE":
                return 14;
            default:
                return value;
        }
    };

    addLoose = winner => {
        let item = "";
        if (winner === "Joueur1") {
            item = document.getElementsByClassName("rightCard");
        } else {
            item = document.getElementsByClassName("leftCard");
        }
        item[0].classList.add("loserCard");
        return true;
    };

    animation = () => {
        const leftContainer = document.getElementsByClassName("leftCard");
        leftContainer[0].classList.add("launchRightAnimation");

        const rightContainer = document.getElementsByClassName("rightCard");
        rightContainer[0].classList.add("launchLeftAnimation");
    };

    render() {
        if (
            this.props.gameReduceurs.tirage === 0 &&
            this.props.gameReduceurs.deck.deck_id
        ) {
            if (this.props.gameReduceurs.cardsJoueur1.length === 0) {
                this.props.cuttingDeck(
                    "https://deckofcardsapi.com/api/deck/" +
                        this.props.gameReduceurs.deck.deck_id +
                        "/draw/?count=26",
                    1
                );
            } else if (this.props.gameReduceurs.cardsJoueur2.length === 0) {
                this.props.cuttingDeck(
                    "https://deckofcardsapi.com/api/deck/" +
                        this.props.gameReduceurs.deck.deck_id +
                        "/draw/?count=26",
                    2
                );
            }
        }

        return (
            <div className="App">
                <div className="App">
                    <div id="overlay">
                        <p id="gameWinner" />
                        <p>
                            <a href="http://localhost:3000">
                                <button>Recommencer la partie</button>
                            </a>
                        </p>
                    </div>
                    <div className="leftCardContainer">
                        <h2>Joueur 1</h2>
                        <img
                            className="leftCard"
                            src={
                                this.props.gameReduceurs.cardsJoueur1.cards
                                    ? this.props.gameReduceurs.cardsJoueur1
                                          .cards[0].image
                                    : ""
                            }
                        />
                        <p>
                            J'ai{" "}
                            {this.props.gameReduceurs.cardsJoueur1.cards
                                ? this.props.gameReduceurs.cardsJoueur1.cards
                                      .length
                                : "??"}{" "}
                            cards en mains
                        </p>
                    </div>
                    <div className="vs">
                        <p>VS</p>
                    </div>
                    <div className="rightCardContainer">
                        <h2>Joueur 2</h2>
                        <img
                            className="rightCard"
                            src={
                                this.props.gameReduceurs.cardsJoueur2.cards
                                    ? this.props.gameReduceurs.cardsJoueur2
                                          .cards[0].image
                                    : ""
                            }
                        />
                        <p>
                            J'ai{" "}
                            {this.props.gameReduceurs.cardsJoueur2.cards
                                ? this.props.gameReduceurs.cardsJoueur2.cards
                                      .length
                                : "??"}{" "}
                            cards en mains
                        </p>
                    </div>
                    <div id="groupButtons">
                        <p id="texte" />
                        {this.props.gameReduceurs.cardsJoueur1.cards &&
                        this.props.gameReduceurs.cardsJoueur2.cards ? (
                            <button id="play" onClick={this.handleClick}>
                                Jouer
                            </button>
                        ) : (
                            ""
                        )}
                        <button id="validate" onClick={this.confirmRound}>
                            Retirer des cartes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        getDeck: url => {
            dispatch(getDeck(url));
        },
        cuttingDeck: (url, player) => {
            dispatch(cuttingDeck(url, player));
        },
        tirerCard: winner => {
            dispatch(tirerCard(winner));
        },
        cleanBord: () => {
            dispatch(cleanBord());
        },
        bataille: () => {
            dispatch(bataille());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
