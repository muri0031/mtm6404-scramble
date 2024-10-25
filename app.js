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
  const randomCountry = countries[Math.floor(Math.random() * countries.length)] 
  const [word, setWord] = React.useState(shuffle(randomCountry)) 
  const [inputValue, setInputValue] = React.useState('')
  const [correctAnswer, setCorrectAnswer] = React.useState(randomCountry) 
  const [strikes, setStrikes] = React.useState(parseInt(localStorage.getItem('strikes')) || 0)
  const [points, setPoints] = React.useState(parseInt(localStorage.getItem('points')) || 0)
  const [countriesLeft, setCountriesLeft] =  React.useState(JSON.parse(localStorage.getItem('countriesLeft')) || [...countries])  
  const [gameOver, setGameOver] = React.useState(false)
  const [passes, setPasses] = React.useState(localStorage.getItem('passes') || 3) 
  const [message, setMessage] = React.useState('') 


//function to submit and check if its correct or not
  function submitHandler(e) {
    e.preventDefault()
    if (inputValue.toLowerCase() === correctAnswer) {
      setMessage('Correct.Next Word')
      setPoints(parseInt(points) + 1)
      localStorage.setItem('points', points + 1)
      getNextCountry() 
    } else {
      setMessage(`Wrong. Try Again`)
      setStrikes(strikes + 1)
      localStorage.setItem('strikes', parseInt(strikes) + 1)
      if (parseInt(strikes) + 1 >= 3) {
          setGameOver(true)
          setMessage('You lost! Start again.')
    }
  }
    setInputValue('') 
  }
  
  //function to make the passes
  function passHandler()  {
    if (passes > 0) {
      setPasses(passes - 1)
      localStorage.setItem('passes', passes - 1)
      setMessage('You passed. Next word!')
      getNextCountry()
    } else {
      setMessage('You have no more passes left!')
    }
  }

  //function to change the countries making sure it wont be repeated again once its passed or correct
    function getNextCountry() {
      
      
      if (countriesLeft.length === 0) {
        setGameOver(true)
        setMessage('Congratulations, you won!')
      } else {
    
      const randomCountry = countriesLeft[Math.floor(Math.random() * countriesLeft.length)] 
    setWord(shuffle(randomCountry)) 
    setCorrectAnswer(randomCountry) 
  }
}
//function to press enter and submit answer
    function keyPressHandler(e) {
      if (e.key === 'Enter') {
        submitHandler(e)
      }

  }
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
    
    
    const randomCountry = countries[Math.floor(Math.random() * countries.length)]
    setWord(shuffle(randomCountry))
    setCorrectAnswer(randomCountry)
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