import React from 'react';
import _ from 'lodash'; import FlashCard from './FlashCard';
import FlashCardForm from './FlashCardForm';
import './style.css';
const DATA_URL = 'http://localhost:8888/api/flashcards';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      currentCard: {},
      displayText: '',
      isFront: true,
      numCards: 0,
      numCorrect: 0,
    };
  }

  componentDidMount() {
    fetch(DATA_URL, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Express-Auth-Token': 'FAKE-AUTH-TOKEN',
        'Content-Type': 'application/json',
      })
    })
      .then(response => response.json())
      .then(data => {
        // data comes back pre-sorted by recency
        let currentCard = data[0]; // This will break if cardData.length < 1
        let cardData = data.slice(1);
        let displayText = currentCard.front;
        this.setState((state, props) => ({
          currentCard,
          displayText,
          cardData,
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

  handleButtonClick = (isCorrect) => {
    this.setState((state, props) => {
      let currentCard = this.state.cardData[0];
      return {
        currentCard,
        cardData: this.state.cardData.slice(1),
        displayText: currentCard.front,
        isFront: true,
        numCards: state.numCards + 1,
        numCorrect: isCorrect ? state.numCorrect + 1 : state.numCorrect,
      };
    });
  }

  handleIncorrectClick = e => {
    e.preventDefault();
    fetch('http://localhost:8888/api/attempt/create' , {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Express-Auth-Token': 'FAKE-AUTH-TOKEN',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        flashcard_id: this.state.currentCard.id,
        review_success: 'false',
      })
    })
      .then(() => this.handleButtonClick(false));
  };

  handleCorrectClick = e => {
    e.preventDefault();
    fetch('http://localhost:8888/api/attempt/create' , {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Express-Auth-Token': 'FAKE-AUTH-TOKEN',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        flashcard_id: this.state.currentCard.id,
        review_success: 'true',
      })
    })
      .then(() => this.handleButtonClick(true));
  }

  render() {
    return (
      <div className="container">
        <div className="navHeader">
          <div className="navOption"><a href="#">Home</a></div>
          <div className="navOption"><a href="#">All Cards</a></div>
          <div className="navOption"><a href="#">Create New Card</a></div>
        </div>
        <h1>Cartões de Estudo</h1>
        <h2>{this.state.numCorrect}/{this.state.numCards}</h2>
        <FlashCard
          displayText={this.state.displayText}
          id={this.state.currentCard.id}
          onClick={this.handleCardClick}/>
        <button
          className="incorrectButton"
          onClick={this.handleIncorrectClick}
        >
          Incorrect
        </button>
        <button
          className="correctButton"
          onClick={this.handleCorrectClick}
        >
          Correct
        </button>
        <FlashCardForm />
      </div>
    );
  }
}
