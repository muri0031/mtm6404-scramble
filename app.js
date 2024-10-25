/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}




/**********************************************
 * YOUR CODE BELOW
 **********************************************/

//1 Array with more than 100 Countries
const country = 'mexico'
const countries = ['mexico', 'canada', 'brazil', 'argentina', 'germany', 'france', 'spain', 'italy', 'japan', 'australia', 'india', 'egypt', 'russia', 'nigeria', 'turkey', 'portugal' ]



//I placed all the funcions inside this app function
function App() { 
  
//function to submit and check if its correct or not
const [correctAnswer, setCorrectAnswer] = React.useState('') 
const [message, setMessage] = React.useState('') 
const [points, setPoints] = React.useState(parseInt(localStorage.getItem('points')) || 0)
const [strikes, setStrikes] = React.useState(parseInt(localStorage.getItem('strikes')) || 0)
const [gameOver, setGameOver] = React.useState(false)
const [inputValue, setInputValue] = React.useState('')

function submitHandler(e) {
    e.preventDefault()
    if (inputValue.toLowerCase() === correctAnswer) {
      setMessage('Correct.Next Word')
      const newPoints = points + 1
      setPoints(newPoints)
      localStorage.setItem('points', newPoints)
      getNextCountry() 
    } else {
      setMessage(`Wrong. Try Again`)
      const newStrikes = strikes + 1
      setStrikes(newStrikes)
      localStorage.setItem('strikes',  newStrikes)
      if (newStrikes >= 3) {
          setGameOver(true)
          setMessage('You lost! Start again.')
    }
  }
    setInputValue('') 
  }
  
  //function to make the passes
  const [passes, setPasses] = React.useState(parseInt(localStorage.getItem('passes')) || 3) 
  
  function passHandler()  {
    if (passes > 0) {
      const newPasses = passes - 1
      setPasses(newPasses)
      localStorage.setItem('passes', newPasses)
      setMessage('You passed. Next word!')
      getNextCountry()
    } else {
      setMessage('You have no more passes left!')
    }
  }

  //function to change the countries making sure it wont be repeated again once its passed or correct
  
  const [countriesLeft, setCountriesLeft] =  React.useState(JSON.parse(localStorage.getItem('countriesLeft')) || [...countries])  
  const [word, setWord] = React.useState('') 

  function getNextCountry() {
      
      
      if (countriesLeft.length === 0) {
        setGameOver(true)
        setMessage('Congratulations, you won!')
        localStorage.removeItem('countriesLeft')
      } else {
    
        const randomIndex = Math.floor(Math.random() * countriesLeft.length)
        const randomCountry = countriesLeft[randomIndex]
        const newCountriesLeft = countriesLeft.filter((_, index) => index !== randomIndex);
      setCountriesLeft(newCountriesLeft)
      localStorage.setItem('countriesLeft', JSON.stringify(newCountriesLeft))
      setWord(shuffle(randomCountry));
      setCorrectAnswer(randomCountry);
  }
}
//function to press enter and submit answer
    function keyPressHandler(e) {
      if (e.key === 'Enter') {
        submitHandler(e)
      }

  }

  React.useEffect(() => {
    getNextCountry()
  }, [])

//To restart the game again
  function restartGame() {
    setGameOver(false)
    setStrikes(0)
    localStorage.setItem('strikes', 0)
    setPoints(0)
    localStorage.setItem('points', 0)
    setPasses(3)
    localStorage.setItem('passes', 3)
    setInputValue('')
    setMessage('')
    setCountriesLeft([...countries])
    localStorage.setItem('countriesLeft', JSON.stringify([...countries]))
    
    getNextCountry()
  }
 
  return (
    <div>
      <h1 className="heading">Welcome to Scramble!</h1>
      {gameOver ? (
        <div>
        <p className={`message ${message === '' ? 'default' : message === 'Correct.Next Word' ? 'correct' : message === 'You passed. Next word!' ? 'no-passes' : message === 'You have no more passes left!' ? 'no-passes' : message === 'Wrong. Try Again' ? 'incorrect' : ''}`}>{message}</p>
          <button onClick={restartGame} className="start" >Start again</button>
        </div>
      ) : (
        <div>
        <div className="point-strike">
          <p className="strikes">Strikes: {strikes}</p>
          <p className="points">Points: {points}</p>
        </div>
        <div>
        <p className={`message ${message === '' ? 'default' : message === 'Correct.Next Word' ? 'correct' : message === 'You passed. Next word!' ? 'no-passes' : message === 'You have no more passes left!' ? 'no-passes' : message === 'Wrong. Try Again' ? 'incorrect' : ''}`}>{message}</p>
        </div>
        <div className="word-text-pass">
        <div className="word-text">
          <h2 className="word">{word}</h2>
          </div>
          <div >
          <form>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={keyPressHandler} className="input" />
          </form>
          <button onClick={passHandler} className="pass">Pass ({passes} remaining)</button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}
  







const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)