const gameReduceurs = (state = [], action) => {
  let nextState;

  switch (action.type) {
    case "CLEAN_BORD":
      nextState = { ...state };
      let allCards = [...nextState.board.joueur1, ...nextState.board.joueur2];
      if (nextState.board.winner === "Joueur1") {
        nextState.cardsJoueur1.push(allCards);
      } else {
        nextState.cardsJoueur2.push(allCards);
      }
      nextState.board = { joueur1: [], joueur2: [], winner: undefined };
      return nextState;

    case "TIRER_CARD":
      nextState = { ...state };
      nextState.board.joueur1.unshift(nextState.cardsJoueur1.shift());
      nextState.board.joueur2.unshift(nextState.cardsJoueur2.shift());
      return nextState;

    case "BATAILLE":
      nextState = { ...state };
      for (let i = 0; i < 2; i++) {
        nextState.board.joueur1.unshift(nextState.cardsJoueur1.shift());
        nextState.board.joueur2.unshift(nextState.cardsJoueur2.shift());
      }
      return nextState;

    case "GET_DECK":
      nextState = { ...state };
      nextState.deck = action.deck;
      return nextState;

    case "CUTTING_DECK":
      nextState = { ...state };
      nextState.cardsJoueur1 = action.decks.joueur1;
      nextState.cardsJoueur2 = action.decks.joueur2;
      return nextState;

    default:
      return state;
  }
};

export default gameReduceurs;
