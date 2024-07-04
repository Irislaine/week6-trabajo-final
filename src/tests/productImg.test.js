const request = require("supertest")
const app = require("../app")
const path = require('path')

let TOKEN
let imageId

const BASE_URL = '/api/v1/product_images'
const BASE_URL_USERS = '/api/v1/users'

beforeAll(async () => {
    const user = {
        email: "ribeiroiris@email.com",
        password: "iris55555"
    }

    const res = await request(app)
        .post(`${BASE_URL_USERS}/login`)
        .send(user)

    TOKEN = res.body.token

})

test("POST -> 'BASE_URL', should return status 201, res.body.url, res.body.filename to be defined", async () => {

    const localImage = path.join(__dirname, 'createData', 'Full-STACK.jpg')

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`) //  movemos la img uploads
        .attach('image', localImage)

    imageId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()
})

test("DELETE -> 'BASE_URL/:id'should return status 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${imageId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})