require('dotenv').config()
const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})
const Person = mongoose.model('Person', personSchema)

function main () {
  // attempt at adding contact, phonenumber or name not specified
  if (process.argv.length > 2 && process.argv.length !== 4) {
    console.log('Error: name or phone number missing\nUsage: mongo.js [<name> <phonenumber>]')
    process.exit(1)
  }

  const url = process.env.MONGO_URI

  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )

  mongoose.connection.once('open', () => {
    if (process.argv.length === 2) {
      listPhonebookEntries()
    } else {
      addPhonebookEntry(process.argv[2], process.argv[3])
    }
  })

  mongoose.connection.on('error', () => {
    console.log('Error: Failed to connect to the database')
    process.exit(1)
  })
}

function listPhonebookEntries () {
  Person.find({}).then(people => {
    console.log('phonebook:')
    people.forEach(p => console.log(p))
    mongoose.connection.close()
  })
}

function addPhonebookEntry (name, phoneNumber) {
  const newPerson = new Person({ name: name, number: phoneNumber })
  newPerson.save()
    .then(res => {
      console.log(`added ${name} number ${phoneNumber} to phonebook`)
      mongoose.connection.close()
    })
    .catch(() => {
      console.log('Error: failed to add to database')
      mongoose.connection.close()
    })
}

main()
