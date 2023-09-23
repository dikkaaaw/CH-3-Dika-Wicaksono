const app = require("./index")

const port = process.env.port || 3000

app.listen(port, () => {
  console.log(`App running on port ${port}!`)
})
