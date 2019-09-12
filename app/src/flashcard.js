import React from 'react';
import './flashcard.css';

export default class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: props.front,
      isFront: true,
    };
  }

  // I _should_ be able to define this with fat arrows.  Babel error?
  handleClick = () => {
    this.setState((state, props) => ({
      displayText: state.isFront ? props.back : props.front,
      isFront: !state.isFront
    }));
  };

  render() {
    return (
      <div className="flashcard" onClick={this.handleClick}>
        <h2>{this.state.displayText}</h2>
      </div>
    );
  };
}
