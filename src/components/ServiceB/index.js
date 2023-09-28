const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'user.db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3002, () =>
      console.log('Server Running at http://localhost:3002/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

app.post('/', async (req, res) => {
  console.log('hi')
  const {userId, username, email, age, location} = req.body
  const postUserQuery = `
  INSERT INTO
    person (userId, username, email,age,location)
  VALUES
    ('${userId}','${username}', '${email}', '${age}','${location}');`
  const dbResponse = await database.run(postUserQuery)
  res.status(200)
  res.send(`Created new user with User Id: ${userId}`)
})
