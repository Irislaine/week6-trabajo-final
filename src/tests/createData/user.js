const User = require("../../models/User")

const user = async () => {
  const body = {
    firstName: "Irislaine",
    lastName: "Ribeiro",
    email: "ribeiroiris@email.com",
    password: "iris55555",
    phone: "123456789"
  }

  await User.create(body)
}

module.exports = user; 