import React from 'react';
import { Button, Typography } from '@mui/material';

import './App.css';
import Game from './Game'

function App() {
  const [inGame, setInGame] = React.useState(false);

  return (
    <>
      {/* Frequency / Rank */}
      {!inGame &&
        <div>
          <div style={{height:"20px"}}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div>
            <Typography variant="h3" fontFamily="arial" align="center">
              PSY 28 Final Project
            </Typography>
            <Typography variant="h6" fontFamily="arial" align="center" color="#7c7c7c">
              Jimmy Maslen and Theseus Lim
            </Typography>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Button size="large" variant="contained" onClick={() => { setInGame(true) }}>
                Play The Game
              </Button>
            </div>
          </div>
        </div>

<div style={{height:"100px"}}>
<div style={{ padding: '50px 20% 0px 20%' }}>
      <h4 style={{ textAlign: 'center' }}> How it Works </h4>
      {/* explain the phenomenon and why it is important, relate 
      this topic to other topics in Cognitive Psychology, 
      and discuss applications to the real world */}
      <p>
          This game is based off of an activity from PSY28 at Tufts University. It relies on the principles of <b>well-formedness</b>, which suggest that it's easier to recognize strings of characters that follow spelling rules of English. However, this increased recognition comes at the cost of a higher likelihood to make errors when reading less familiar (or made up) words. For example, one might read NICHT as NIGHT.
      </p>
      <p>
          This activity hypothesizes that this sensitivity to the rules of spelling not only impacts our ability to recognize words, but also our ability to remember them. We expect that players should score best on list 1, a little worse on list 2, and a lot worse on list 3.
      </p>
      <br />
      <h4 style={{ textAlign: 'center' }}> Wordlist Generation </h4>
      <ul>
          <li>To generate the first list (real words), we took a wordlist of the 1000 most common English words, and used a RNG to select 10 random words.</li>
          <li> To generate the second list (English-esque) words, we used the same list to generate 10 random words, and then replaced a random letter in the word. We replaced consonants with consonants and vowels with vowels, under the assumption that this would result in the word looking like it could reasonably be an English word. </li>
          <li>To generate the final list of words (nonsense words), words were randomly assigned a length of 3-5 characters and letters were selected uniformly at reandom from the alphabet.</li>
      </ul>
      </div>
  </div>
</div>

  }

      { /* Game */}
      {
        inGame &&
        <>
          <Game setInGame={setInGame} />
        </>
      }
    </>
  );
}

export default App;