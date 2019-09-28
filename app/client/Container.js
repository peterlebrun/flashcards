import React from 'react';
import _ from 'lodash'; import FlashCard from './FlashCard';
import FlashCardForm from './FlashCardForm';
import './style.css';
//const DATA_URL = 'https://www.dee-znutz.com/api';
const DATA_URL = 'http://localhost:8888/api/flashcards';

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
        let cardData = data;
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
    });
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
    });
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
        <button
          className="nextCardButton"
          onClick={this.handleButtonClick}
        >
          Next Card
        </button>
        <FlashCardForm />
      </div>
    );
  }
}
