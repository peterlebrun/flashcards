import React from 'react';
import './style.css';

export default class FlashCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: '',
      back: '',
    };
  }

  handleFrontChange = e => {
    this.setState({front: e.target.value});
  }

  handleBackChange = e => {
    this.setState({back: e.target.value});
  }

  handleSubmit = e => {
    console.log(this.state);
    e.preventDefault();
const DATA_URL = 'http://localhost:8888/api';
    fetch('http://localhost:8888/api/flashcard/create' , {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Express-Auth-Token': 'FAKE-AUTH-TOKEN',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        front: this.state.front,
        back: this.state.back
      })
    })
      .then(response => console.log(response.json()));
    /*
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
*/
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      front:
      <input type="text" value={this.state.front} onChange={this.handleFrontChange}/>
      </label>
      <label>
      back:
      <input type="text" value={this.state.back} onChange={this.handleBackChange}/>
      </label>
        <input type="submit" value="Save" />
      </form>
    );
  };
}
