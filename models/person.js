const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('Successfully connected to database')
    })
    .catch(() => {
        console.log('Failed to connect to database')
    })

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: 3,
            required: true
        },
        number: {
            type: String,
            validate: {
                validator: (v) => {
                    return ( /\d{2}-\d{6,}/.test(v) || /\d{3}-\d{5,}/.test(v) )
                },
                message: (props) => `${props.value} is not a valid number!`
            },
            required: true
        }
    }
)

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)