import React from 'react'

function CandyDispenser() {
  const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
  const [candies, setCandies] = React.useState(initialCandies)
  function dispense(candy) {
    setCandies(allCandies => allCandies.filter(c => c !== candy))
  }
  return (
    <div>
      <h1>Candy Dispenser</h1>
      <div>
        <div>Available Candy</div>
        {candies.length === 0 ? (
          <button onClick={() => setCandies(initialCandies)}>refill</button>
        ) : (
          <ul>
            {candies.map(candy => (
              <li key={candy}>
                <button onClick={() => dispense(candy)}>grab</button> {candy}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Poll() {
  const [answer, setAnswer] = React.useState(null)
  const isWrong = answer === 'useCallback'
  const isRight = answer === 'original'
  return (
    <div style={{margin: '20px 0 50px 0'}}>
      {isRight ? (
        <div>
          You are correct!{' '}
          <span role="img" aria-label="partying">
            🥳
          </span>
        </div>
      ) : (
        <div>
          <div style={{marginBottom: 10}}>
            <button onClick={() => setAnswer('original')}>original</button>
          </div>
          <div>
            <button onClick={() => setAnswer('useCallback')} disabled={isWrong}>
              useCallback
            </button>
          </div>
          {answer === 'useCallback' ? (
            <div>Sorry, wrong answer. Try again</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export {CandyDispenser, Poll}
