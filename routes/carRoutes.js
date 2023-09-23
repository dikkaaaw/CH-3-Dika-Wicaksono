const express = require("express")
const carController = require("../controllers/carController")
const fs = require("fs")

const router = express.Router()

router
  .route("/")
  .get(carController.getAllCars)
  .post(carController.createCar)

router
  .route("/:id")
  .get(carController.getCarById)
  .put(carController.updateCar)
  .delete(carController.deleteCar)

module.exports = router
