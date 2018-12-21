import axios from "axios";

export const cleanBord = state => ({
  type: "CLEAN_BORD",
  state
});

export const tirerCard = state => ({
  type: "TIRER_CARD",
  state
});

export const bataille = state => ({
  type: "BATAILLE",
  state
});

export const cuttingDeckJ1 = url => ({
  type: "CUTTING_DECK",
  decks: {
    Joueur1: axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        console.error("API not call on :" + url);
        return false;
      }),
    Joueur2: axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        console.error("API not call on :" + url);
        return false;
      })
  }
});

export const getDeck = url => ({
  type: "GET_DECK",
  Joueur2: axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(res => {
      console.error("API not call on :" + url);
      return false;
    })
});
