//Core Module
const fs = require("fs")

//Third Party Module
const express = require("express")
const app = express()

const port = process.env.port || 3000

//Middleware express
app.use(express.json())

//Reading file cars.json
const cars = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/cars.json`
  )
)

//PING SERVER
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ping Successfully!",
  })
})

////////////////////////////////////
// Request for getting all cars data
const getAllCars = (req, res) => {
  res.status(200).json({
    status: "OK",
    data: {
      cars,
    },
  })
}

//////////////////////////////////////////
//Get detail car data from cars.json using id number
const getCarById = (req, res) => {
  const id = req.params.id
  const car = cars.find((el) => el.id === id)

  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Car with id number ${id} not found!`,
    })
  }

  res.status(200).json({
    status: "success",
    message: `Car with id number ${id} found!`,
    data: {
      car,
    },
  })
}

////////////////////////////////
//Create new car data
const createCar = (req, res) => {
  const newId = cars[cars.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  cars.push(newData)

  fs.writeFile(
    `${__dirname}/dev-data/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "created",
        message: "New car data added!",
        data: {
          car: newData,
        },
      })
    }
  )
}

/////////////////////////////
// Update car data by id number
const updateCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  if (carIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Car with id number ${id} not found!`,
    })
  }

  cars[carIndex] = {
    ...cars[carIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `car with id number ${id} updated!`,
        data: {
          car: cars[carIndex],
        },
      })
    }
  )
}

/////////////////////////
// Delete car data by id number
const deleteCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  if (carIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Car with id number ${id} not found!`,
    })
  }

  cars.splice(carIndex, 1)

  fs.writeFile(
    `${__dirname}/dev-data/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `Car with id number ${id} has been deleted!`,
      })
    }
  )
}

const carRoute = express.Router()

app.route("/cars").get(getAllCars).post(createCar)

app
  .route("/cars/:id")
  .get(getCarById)
  .put(updateCar)
  .delete(deleteCar)

app.use("/cars", carRoute)

app.listen(port, () => {
  console.log(`App running on port ${port}!`)
})
