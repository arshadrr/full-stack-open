import React, {useState} from 'react'

const Statistic = ({text, value}) => (
    <tr>
        <th scope="row">{text}</th>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const average = (good - bad) / (good + neutral + bad)
    const positive_percentage = (good / (good + neutral + bad)) * 100

    if(isNaN(average)) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <Statistic text={"good"} value={good}/>
                    <Statistic text={"neutral"} value={neutral}/>
                    <Statistic text={"bad"} value={bad}/>
                    <Statistic text={"average"} value={average}/>
                    <Statistic text={"positive"} value={positive_percentage.toString() + "%"}/>
                </table>
            </div>
        )
    }
}

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>{text}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = () => {setGood(good + 1)}
    const incrementNeutral = () => {setNeutral(neutral + 1)}
    const incrementBad = () => {setBad(bad + 1)}

    return (
    <>
    <h1>Give feedback</h1>
        <Button text="good" handleClick={incrementGood} />
        <Button text="neutral" handleClick={incrementNeutral} />
        <Button text="bad" handleClick={incrementBad} />
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
    )
}

export default App;
