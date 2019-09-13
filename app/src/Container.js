import React from 'react';
import FlashCard from './FlashCard';
import './style.css';
const DATA_URL = 'https://www.dee-znutz.com/api';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      currentCard: {
        front: 'FooFront',
        back: 'FooBack',
        isFront: true,
      },
    };
  }

  componentDidMount() {
    fetch(DATA_URL, { mode: 'cors' })
      .then(response => console.log(response)); //response.json())
      //.then(data => console.log(data.data));
    /*
    // Fetch data API here
    this.setState((state, props) => {
      return {
        cardData: [
          {
            front: 'Front1',
            back: 'Back1',
          },
          {
            front: 'Front2',
            back: 'Back2',
          },
        ],
      };
    });
    */
  }

  handleCardClick = () => {
    // Define card flip
  }

  handleButtonClick = () => {
    // Define next button
  }

  render() {
    return (
      <div>
        <FlashCard front={this.state.currentCard.front} back={this.state.currentCard.back} onClick={this.handleCardClick}/>
      </div>
    );
  }
}
