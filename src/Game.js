import { Box, Button, TextField, Grid, Typography } from '@mui/material'
import React from 'react'
import { ALLWORDS } from './words.js';
import './Game.css';

let realwords = [];
let semiwords = [];
let fakewords = [];

let wordLists = [];

const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const ALL_LETTERS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'a', 'e', 'i', 'o', 'u'];

const numWords = 10;
const WORD_DELAY = 1000;

function startPage(startGame) {

    realwords = [];
    semiwords = [];
    fakewords = [];

    //Set Real Words
    while (realwords.length < numWords) {
        let idx = Math.floor(Math.random() * 1000);
        let randomword = String(ALLWORDS[idx]);
        if (!realwords.includes(randomword)) {
            realwords.push(randomword);
        }
    }

    //Set Semi Words
    while (semiwords.length < numWords) {
        let idx = Math.floor(Math.random() * 1000);
        let randomword = ALLWORDS[idx];
        while (ALLWORDS.includes(randomword)) {
            let changeidx = Math.floor(Math.random() * randomword.length);
            let changeletter = randomword.charAt(changeidx);
            if (VOWELS.includes(changeletter)) {
                let newletter = VOWELS[Math.floor(Math.random() * VOWELS.length)];
                let wordarr = randomword.split("");
                wordarr[changeidx] = newletter;
                randomword = wordarr.join("");
            } else {
                let newletter = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
                let wordarr = randomword.split("");
                wordarr[changeidx] = newletter;
                randomword = wordarr.join("");
            }
        }
        semiwords.push(randomword);
    }

    //Set Not Words
    for (let i = 0; i < numWords; i++) {
        let word = ""
        for (let j = 0; j < Math.round(3 + Math.random() * 2); j++) {
            word += ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)]
        }
        fakewords.push(word)
    }

    wordLists = [realwords, semiwords, fakewords]

    return (
        <>
        <Grid container xs={12} paddingBottom="40px">
            <Grid item xs={3}></Grid>
            <Grid item xs={6} class="introprompt">
              <Typography align="center">
                When you press the 'start game' button, you will be shown <b>three</b> lists of ten words each.
              </Typography>
              <br/>
              <Typography align="center">
              After each list, you will be asked to recall as many words as you can.
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
            <p style={{ textAlign: 'center' }}>
                <Button onClick={startGame} variant='contained'> Start Game </Button>
            </p>
        </>
    )
}

function wordPage(word) {
    return (
        <>
            <h2 style={{ textAlign: 'center' }}> {word} </h2>
        </>
    )
}

function recallPage(wordsRemembered, setWordsRemembered, incrementPage, curWordList) {
    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Typography align="center" variant="p" fontSize="24px">
                        Type all words you remember from that round. Wrong answers will not be penalized.
                    </Typography>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <TextField
                            fullWidth
                            multiline
                            value={wordsRemembered}
                            onChange={event => setWordsRemembered(event.target.value)}
                            variant="outlined"
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button size="large" variant='contained' onClick={incrementPage}> {curWordList < 2 ? "Continue" : "View Results"} </Button>
                    </div>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </>
    )
}

function resultsPage(wordsRememberedReal, wordsRememberedSemi, wordsRememberedFake, setInGame) {
    let correctWordsReal = realwords.filter(word => wordsRememberedReal.includes(word));
    let correctWordsSemi = semiwords.filter(word => wordsRememberedSemi.includes(word));
    let correctWordsFake = fakewords.filter(word => wordsRememberedFake.includes(word));


    return (
        <>
            <Grid container item xs={12} sx={{padding: '30px 20% 0 20%'}} paddingLeft="100px" paddingRight="100px">
                <Grid item xs={12} paddingBottom="20px">
                    <Typography align="center" variant="h4">
                        RESULTS
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography class="result-header" align="left">
                        Real Words: {correctWordsReal.length} / {realwords.length}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography class="result-header" align="left">
                        English-esque Words: {correctWordsSemi.length} / {semiwords.length}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography class="result-header" align="left">
                        Nonsense Words: {correctWordsFake.length} / {fakewords.length}
                    </Typography>
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={4}>
                    {realwords.map(word => <Typography align="left" color={correctWordsReal.includes(word) ? "green" : "red"}> {word} </Typography>)}
                </Grid>
                <Grid item xs={4}>
                      {semiwords.map(word => <Typography align="left" color={correctWordsSemi.includes(word) ? "green" : "red"}> {word} </Typography>)}
                </Grid>
                <Grid item xs={4}>
                      {fakewords.map(word => <Typography align="left" color={correctWordsFake.includes(word) ? "green" : "red"}> {word} </Typography>)}
                </Grid>
            </Grid>

            <div style={{ padding: '30px 20% 0px 20%' }}>
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

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Button color="error" size="large" variant='contained' onClick={() => { setInGame(false) }}>
                    Exit
                </Button>
            </div>

        </>
    )
}

export default function Game(props) {
    const [curWordList, setCurWordList] = React.useState(0)
    const [page, setPage] = React.useState(-1)

    const [wordsRememberedReal, setWordsRememberedReal] = React.useState("")
    const [wordsRememberedSemi, setWordsRememberedSemi] = React.useState("")
    const [wordsRememberedFake, setWordsRememberedFake] = React.useState("")
    const setInGame = props.setInGame

    const incrementPage = () => {
        setPage(page => page + 1)
        if (page < numWords) {
            setTimeout(() => { incrementPage() }, WORD_DELAY)
        } else {
            setPage(0)
            setCurWordList(x => x + 1)
        }
    }

    return (
        <>
            {curWordList <= 2 &&
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        // position: 'absolute',
                        top: '20px',
                    }}
                >
                    {page === -1 && startPage(incrementPage)}
                    {curWordList < 3 && page <= numWords && wordPage(wordLists[curWordList][page - 1])}
                    {curWordList === 0 && page > numWords && recallPage(wordsRememberedReal, setWordsRememberedReal, incrementPage, curWordList)}
                    {curWordList === 1 && page > numWords && recallPage(wordsRememberedSemi, setWordsRememberedSemi, incrementPage, curWordList)}
                    {curWordList === 2 && page > numWords && recallPage(wordsRememberedFake, setWordsRememberedFake, incrementPage, curWordList)}

                </Box>
            </Box>}
            {curWordList > 2 && resultsPage(wordsRememberedReal, wordsRememberedSemi, wordsRememberedFake, setInGame)}
        </>
    )
}