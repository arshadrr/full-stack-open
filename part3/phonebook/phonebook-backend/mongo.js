const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
  name: String,
  phone_number: String
})
const Person = mongoose.model("Person", personSchema)

function main () {
  // attempt at listing all entries, password not specified
  if (process.argv.length < 3) {
    console.log("Error: password not specified\nUsage: mongo.js <password> [<name> <phonenumber>]")
    process.exit(1)
  }
  // attempt at adding contact, phonenumber or name not specified
  if (process.argv.length > 3 && process.argv.length !== 5) {
    console.log("Error: name or phone number missing\nUsage: mongo.js <password> [<name> <phonenumber>]")
    process.exit(1)
  }

  password = process.argv[2]
  const url = `mongodb+srv://arshad:${password}@cluster0.09d4f.mongodb.net/note-app?retryWrites=true&w=majority`

  mongoose.connect(
    url, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )

  mongoose.connection.once("open", () => {
    if (process.argv.length === 3) {
      list_phonebook_entries()
    } else {
      add_phonebook_entry(process.argv[3], process.argv[4])
    }
  })

  mongoose.connection.on("error", () => {
    console.log("Error: Failed to connect to the database")
    process.exit(1)
  })
}

function list_phonebook_entries () {
  Person.find({}).then(people => {
    console.log("phonebook:")
    people.forEach(person => {
      console.log(`${person.name} ${person.phone_number}`)
    })
    mongoose.connection.close()
  })
}

function add_phonebook_entry (name, phone_number) {
  new_person = new Person({name: name, phone_number: phone_number})
  new_person.save()
    .then(res => {
      console.log(`added ${name} number ${phone_number} to phonebook`)
    mongoose.connection.close()
    })
    .catch(err => {
      console.log("Error: failed to add to database")
      mongoose.connection.close()
    })
}

main()
