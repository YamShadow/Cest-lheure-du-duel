import React from "react";
import { connect } from 'react-redux';
import '../actions/index';
import { getDeck } from "../actions/index";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getDeck('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'));
  }

  render() {
    console.log(this.props.gameReduceurs);
    return (
      <div>
        <p>TEEEEEEEEEEEEEEST</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: (action) => { dispatch(action) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
