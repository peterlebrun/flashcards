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
    //console.log(this.state);
    e.preventDefault();
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
    });
    // TODO Give user feedback on whether success or not
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
