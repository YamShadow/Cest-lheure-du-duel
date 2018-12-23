import axios from "axios";

export const cleanBord = state => ({
  type: "CLEAN_BORD"
});

export const tirerCard = state => ({
  type: "TIRER_CARD"
});

export const bataille = state => ({
  type: "BATAILLE"
});

export const cuttingDeckJ1 = url => ({
  type: "CUTTING_DECK",
  decks: {
    joueur1: axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        console.error("API not call on :" + url);
        return false;
      }),
    joueur2: axios
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
  deck: new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(res => {
        console.error("API not call on :" + url);
        reject(res);
      })
  })
  .then(res => {
    console.log(res);
    return res;
  })
});
