import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, cur) => (acc + cur.exercises), 0)
  return(
    <b><p>Total of {sum} exercises</p></b>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
    {course.parts.map(part => (
      <Part name={part.name} exercises={part.exercises} key={part.id} />
    ))}
    </div>
  )
}

const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
)

export default Course
