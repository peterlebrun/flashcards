import React from 'react';
import ReactDOM from 'react-dom';
import FlashCard from './flashcard';

const App = () => (
  <div>
    <h1>Hello world!</h1>
    <FlashCard front="Hey" back="weirdo"/>
  </div>
);

ReactDOM.render(<App/>, document.getElementById('root'));
