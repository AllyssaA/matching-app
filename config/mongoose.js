const mongoose = require('mongoose')

const connectDBMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log('connected to the database 🧙‍♂️')
  } catch (error) {
    console.log(`an error occurred: ${error}`)
    throw error
  }
}

module.exports = connectDBMongoose