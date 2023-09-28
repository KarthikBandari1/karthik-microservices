import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(3001, () => console.log('Server Running at http://localhost:3001/'))

app.post('/', async (request, response) => {
  const Data = request.body

  let isValidEmail = false
  let isValidAge = false
  let isValidUser = false

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (Data.email.match(mailformat)) {
    isValidEmail = true
  } else {
    isValidEmail = false
  }

  if (Data.age > 18 && Data.age < 45) {
    isValidAge = true
  } else {
    isValidAge = false
  }

  if (isValidEmail && isValidAge) {
    isValidUser = true
  } else {
    isValidUser = false
  }

  if (isValidUser) {
    const url2 = 'http://localhost:3002/'
    const options2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    }

    try {
      const IDresponse = await fetch(url2, options2)
      const userID = await IDresponse.text()
      if (IDresponse.ok === true) {
        response.send(userID)
      } else {
        console.log('there is an error karthik')
      }
    } catch {
      console.log('error in fetching')
    }
  }

  if (isValidEmail === false) {
    response.status(400)
    response.send('Entered Email is Invalid!')
  } else if (isValidAge === false) {
    response.status(400)
    response.send('Your age does not meet the Criteria!')
  }
})
