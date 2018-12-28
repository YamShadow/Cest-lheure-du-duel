const initialState = {
    tirage: 0,
    deck: [],
    cardsJoueur1: [],
    cardsJoueur2: [],
    board: {
        joueur1: [],
        joueur2: [],
        winner: undefined
    }
};

const gameReduceurs = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case "CLEAN_BORD":
            nextState = { ...state };
            let allCards = [
                ...nextState.board.joueur1,
                ...nextState.board.joueur2
            ];
            if (nextState.board.winner === "Joueur1") {
                nextState.cardsJoueur1.cards = [
                    ...nextState.cardsJoueur1.cards,
                    ...allCards
                ];
            } else {
                nextState.cardsJoueur2.cards = [
                    ...nextState.cardsJoueur2.cards,
                    ...allCards
                ];
            }
            nextState.board.joueur1 = [];
            nextState.board.joueur2 = [];
            nextState.board.winner = undefined;
            return nextState;

        case "TIRER_CARD":
            nextState = { ...state };
            nextState.board.joueur1.unshift(
                nextState.cardsJoueur1.cards.shift()
            );
            nextState.board.joueur2.unshift(
                nextState.cardsJoueur2.cards.shift()
            );
            nextState.board.winner = action.win;
            nextState.tirage = nextState.tirage + 1;
            return nextState;

        case "BATAILLE":
            nextState = { ...state };
            for (let i = 0; i < 2; i++) {
                nextState.board.joueur1.unshift(
                    nextState.cardsJoueur1.cards.shift()
                );
                nextState.board.joueur2.unshift(
                    nextState.cardsJoueur2.cards.shift()
                );
            }
            return nextState;

        case "GET_DECK":
            nextState = { ...state };
            nextState.deck = action.deck;
            return nextState;

        case "ADD_DECK_FAILURE":
            nextState = { ...state };
            nextState.error = action.payload.error;
            return nextState;

        case "CUTTING_DECK":
            nextState = { ...state };
            nextState["cardsJoueur" + action.player] = action.deck;
            return nextState;

        case "ADD_CUTTING_FAILURE":
            nextState = { ...state };
            nextState.error = action.payload.error;
            return nextState;

        default:
            return state;
    }
};

export default gameReduceurs;
