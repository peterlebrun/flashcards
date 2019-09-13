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
      displayText: '',
      isFront: true
    };
  }

  componentDidMount() {
    fetch(DATA_URL)
      .then(response => response.json())
      .then(data => {
        let cardData = data.data;
        let currentCard = cardData[0]; // This will break if cardData.length < 1
        let displayText = currentCard.front;
        this.setState((state, props) => ({
          cardData,
          currentCard,
          displayText,
        }));
      });
  }

  handleCardClick = () => {
    console.log('Card Clicked');
    this.setState((state, props) => {
      console.log(state);
      return {
        displayText: state.isFront ? state.currentCard.back : state.currentCard.front,
        isFront: !state.isFront,
      };
    });
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
          displayText={this.state.displayText}
          onClick={this.handleCardClick}/>
      </div>
    );
  }
}
