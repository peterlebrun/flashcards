import React from 'react';
import './style.css';

export default class FlashCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flashcard" onClick={this.props.onClick}>
        <h2>{this.props.displayText}</h2>
      </div>
    );
  };
}
