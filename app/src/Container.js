import React from 'react';
import _ from 'lodash';
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
        let currentCard = _.sample(cardData); // This will break if cardData.length < 1
        let displayText = currentCard.front;
        this.setState((state, props) => ({
          cardData,
          currentCard,
          displayText,
        }));
      });
  }

  handleCardClick = () => {
    this.setState((state, props) => {
      return {
        displayText: state.isFront ? state.currentCard.back : state.currentCard.front,
        isFront: !state.isFront,
      };
    });
  }

  handleButtonClick = () => {
    let currentCard = _.sample(this.state.cardData);
    this.setState({
      currentCard,
      displayText: currentCard.front,
      isFront: true,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Cartões de Estudo</h1>
        <FlashCard
          displayText={this.state.displayText}
          onClick={this.handleCardClick}/>
        <button
          className="nextCardButton"
          onClick={this.handleButtonClick}
        >
          Next Card
        </button>
      </div>
    );
  }
}
