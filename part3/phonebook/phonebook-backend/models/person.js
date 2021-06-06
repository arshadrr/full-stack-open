const mongoose = require("mongoose")

const url = process.env.MONGO_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then(result => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB ", error.message)
  })

const PersonSchema = mongoose.Schema({
  name: {type: String, required: true},
  number: {type: String, required: true} 
})

PersonSchema.set("toJSON", {"transform": (doc, ret) => {
  ret.id = ret._id.toString()
  delete ret._id
  delete ret.__v
}})

module.exports = mongoose.model('Person', PersonSchema)
