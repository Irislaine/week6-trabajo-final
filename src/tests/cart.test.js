require("../models")

const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")

const BASE_URL_USERS = "/api/v1/users"
const BASE_URL = "/api/v1/cart"

let TOKEN
let productBody
let bodyCart
let product
let userId
let cartId


beforeAll(async () => {
  const user = {
    email: "ribeiroiris@email.com",
    password: "iris55555"
  }
  const res = await request(app)
    .post(`${BASE_URL_USERS}/login`)
    .send(user)


  TOKEN = res.body.token
  userId = res.body.user.id

  productBody = {
    title: "productTest",
    description: "lorem20",
    price: 23
  }

  product = await Product.create(productBody)

  bodyCart = {
    quantity: 1,
    productId: product.id
  }

})

test("POST -> 'BASE_URL', should return status code 201 and res.body.quantity === bodyCart.quantity", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(bodyCart)
    .set("Authorization", `Bearer ${TOKEN}`)

  cartId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyCart.quantity)
  expect(res.body.userId).toBe(userId)
})

test("GET -> 'BASE_URL',should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].userId).toBeDefined()
  expect(res.body[0].userId).toBe(userId)

  expect(res.body[0].product).toBeDefined()
  expect(res.body[0].productId).toBe(product.id)
  expect(res.body[0].product.id).toBe(product.id)

})

test("GET -> 'BASE_URL/:id',should return status code 200 and res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyCart.quantity)

  expect(res.body.userId).toBeDefined()
  expect(res.body.userId).toBe(userId)

  expect(res.body.product).toBeDefined()
  expect(res.body.productId).toBe(product.id)
  expect(res.body.product.id).toBe(product.id)

})

test("PUT -> 'BASE_URL/:id',should return status code 200 and res.body.quantity === bodyUpdate.quantity", async () => {
  const bodyUpdate = {
    quantity: 2
  }

  const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(bodyUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyUpdate.quantity)
})


test("DELETE -> 'BASE_URL/:id',should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
  await product.destroy()
})