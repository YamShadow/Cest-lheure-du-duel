import React, { Component } from "react";
import { connect } from "react-redux";
import "../actions/index";
import { getDeck, cuttingDeck } from "../actions/index";

class App extends Component {
    constructor(props) {
        super(props);
        this.props.getDeck(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
    }

    render() {
        console.log(this.props.gameReduceurs);
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
            <div>
                <p>TEEEEEEEEEEEEEEST</p>
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
