require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()
app.use(express.json())
app.use(express.static("build"))

// setup logging
morgan.token("body", (req, res) => JSON.stringify(req.body))
const format = ":method :url :status :res[content-length] - :response-time ms :body"
app.use(morgan(format))

app.get("/info", (request, response) => {
  Person.count({}).then(n => {
    response.send(`
    <div>Phonebook has info for ${n} people</div>
    <br>
    <div>${new Date().toString()}</div>
      `)
  })
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).json({error: "Person not found"})
      }
    })
    .catch(err => {
      response.status(400).json({error: "Invalid person id"})
    })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(res => {
      if (res) {
        response.json(res)
      }
      else {
        response.status(404).json({error: "Person not found"})
      }
    })
    .catch(err => {
      response.status(400).json({error: "Invalid person id"})
    })
})

app.post("/api/persons", (request, response) => {
  let newPerson = Person({
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(err => {
      response.status(400).json({error: "Name of number missing"})
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`started on port ${PORT}`))
