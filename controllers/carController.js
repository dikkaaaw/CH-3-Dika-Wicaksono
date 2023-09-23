const fs = require("fs")

//Reading file cars.json
const cars = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/cars.json`
  )
)

const checkId = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val * 1)

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `data with this ${val} not found`,
    })
  }
  next()
}

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "OK",
    data: {
      cars,
    },
  })
}

const getCarById = (req, res) => {
  const id = req.params.id
  const car = cars.find((el) => el.id === id)

  res.status(200).json({
    status: "success",
    message: `Car with id number ${id} found!`,
    data: {
      car,
    },
  })
}

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

const updateCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

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

const deleteCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

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

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  checkId,
}
