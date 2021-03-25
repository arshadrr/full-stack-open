import React, { useState } from 'react'

function randomInt(max) {
    return Math.floor(Math.random() * max)
}

function maxIdx(array) {
    let max_idx = 0
    array.forEach(
        (el, idx) => {
            if(el > array[max_idx]) {
                max_idx = idx
            }
        }
    )

    return max_idx
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
      const idx = randomInt(anecdotes.length)
      setSelected(idx)
  }
  const voteAnecdote = () => {
      const newvotes = [...votes]
      newvotes[selected] += 1
      setVotes(newvotes)
  }

  return (
      <>
      <h1>Anecdote of the day</h1>
        <div>
          {anecdotes[selected]}
        </div>
        <div>
          has {votes[selected]} votes
        </div>
        <div>
            <button onClick={voteAnecdote}>Vote</button>
            <button onClick={randomAnecdote}>Next Anecdote</button>
        </div>

      <br></br>

      <h1>Anecdote with most votes</h1>
      <div>
        <div>
          {anecdotes[maxIdx(votes)]}
        </div>
        <div>
          has {votes[maxIdx(votes)]} votes
        </div>
      </div>
      </>
  )
}

export default App
