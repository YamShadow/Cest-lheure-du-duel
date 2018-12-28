import axios from "axios";

export const cleanBord = () => ({
    type: "CLEAN_BORD"
});

export const tirerCard = winner => ({
    type: "TIRER_CARD",
    win: winner
});

export const bataille = () => ({
    type: "BATAILLE"
});

export const cuttingDeck = (url, player) => {
    return dispatch => {
        axios
            .get(url)
            .then(res => {
                dispatch(addCuttingSuccess(res.data, player));
            })
            .catch(err => dispatch(addCuttingFailure(err.message)));
    };
};

const addCuttingSuccess = (deck, player) => ({
    type: "CUTTING_DECK",
    player: player,
    deck: deck
});

const addCuttingFailure = error => ({
    type: "ADD_CUTTING_FAILURE",
    payload: {
        error
    }
});

export const getDeck = url => {
    return dispatch => {
        axios
            .get(url)
            .then(res => {
                dispatch(addDeckSuccess(res.data));
            })
            .catch(err => dispatch(addDeckFailure(err.message)));
    };
};

const addDeckSuccess = deck => ({
    type: "GET_DECK",
    deck: deck
});

const addDeckFailure = error => ({
    type: "ADD_DECK_FAILURE",
    payload: {
        error
    }
});
