const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://khanhbnguyen:${password}@fullstackopen-part3.vnbrmhr.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  }
)

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(JSON.stringify(person))
    })
    mongoose.connection.close()
  })

} else {
  const person = new Person(
    {
      name: `${name}`,
      number: `${number}`
    }
  )

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook!`)
    mongoose.connection.close()
  })
}

