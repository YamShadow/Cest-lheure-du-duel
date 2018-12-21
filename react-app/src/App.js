import React, { Component } from "react";
import "./App.css";
import { GameService } from "./services/GameService";

class App extends Component {
  game = () => {
    const game = new GameService();
    console.log(game.getState());
    // console.log(game);
  };
  render() {
    return <div className="App">{this.game()}</div>;
  }
}

export default App;
