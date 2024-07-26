require('dotenv').config()
const fs = require('fs')
const express = require('express')
const port = process.env.PORT | 3000

// Express App
const app = express()

// Middleware
app.use(express.json())

// Routes
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'))

app.get('/api/v1/tours' , (req, res) => {

  res.status(200).json({
    status: 'success',
    result : tours.length,
    data: {
      tours: tours
    }
  })
})

app.get('/api/v1/tours/:id' , (req, res) => {

  const { id } = req.params
  if(id > tours.length){
    return res.status(404).json({
      status: 'fail',
      result: 0,
      message: 'This tour does not exist'
    })
  }
  const tour = tours.filter(element => element.id === Number(id))

  res.status(200).json({
    status: 'success',
    result : tour.length,
    data: {
      tour: tour
    }
  })
})

app.post('/api/v1/tours' , (req, res) => {

  const newTour = {...req.body, id: tours[tours.length - 1].id + 1}
  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
})


// Port Listening
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})