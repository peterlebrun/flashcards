import React from 'react';
import './flashcard.css';

export default class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: props.front,
      back: props.back
    };
  }

  render() {
    return (
      <div className="flashcard">
        Front:<h2>{this.state.front}</h2>
        Back:<h2>{this.state.back}</h2>
      </div>
    );
  };
}
