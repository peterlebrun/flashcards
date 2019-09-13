import React from 'react';
import FlashCard from './FlashCard';
import './style.css';
const DATA_URL = 'https://www.dee-znutz.com/api';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      currentCard: {},
    };
  }

  componentDidMount() {
    fetch(DATA_URL)
      .then(response => response.json())
      .then(data => {
        let cardData = data.data;
        let currentCard = cardData[0]; // This will break if cardData.length < 1
        this.setState((state, props) => ({ cardData, currentCard }));
      });
  }

  handleCardClick = () => {
    console.log('Card Clicked');
    // Flip card from front to back
    // Define card flip
  }

  handleButtonClick = () => {
    console.log('Button Clicked');
    // Get next card
    // Define next button
  }

  render() {
    return (
      <div>
        <FlashCard
          front={this.state.currentCard.front}
          back={this.state.currentCard.back}
          onClick={this.handleCardClick}/>
      </div>
    );
  }
}
