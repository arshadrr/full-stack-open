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

app.get("/api/persons/:id", (request, response, next) => {
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
    .catch(error => {
      next(error)
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
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
    .catch(error => {
      next(error)
    })
})

app.post("/api/persons", (request, response, next) => {
  const newPerson = Person({
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndUpdate(
    request.params.id,
    {
      "name": request.body.name,
      "number": request.body.number
    },
    {"new": true, "runValidators": true, "context": "query"}
  )
    .then(updatedPerson => {
      if (updatedPerson === null) {
        response.status(404).json({error: "Person not found"})
      } else {
        response.json(updatedPerson)
      }
    })
    .catch(error => {
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(400).json({error: "Malformed ID"})
  }
  if (error.name === "ValidationError") {
    response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`started on port ${PORT}`))
