import React from 'react';
import ReactDOM from 'react-dom';
import FlashCard from './flashcard';

const App = () => (
  <div>
    <FlashCard front="Hey" back="weirdo"/>
  </div>
);

ReactDOM.render(<App/>, document.getElementById('root'));
