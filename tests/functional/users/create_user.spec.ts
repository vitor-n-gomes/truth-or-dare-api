import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  test('It should create  an user ', async ({ client, assert }) => {

    const userPayload = {
      name: "teste Nogueira Gomes",
      email: "teste@test.com",
      password: "password123",
      passwordConfirmation: "password123"
    }

    const response = await client.post(`${BASE_URL}/register`).form(userPayload).send()

    response.assertStatus(201)

    assert.exists(response.body().token);
    assert.exists(response.body().user);

  })

  test('it should return 422 when email is already in use', async ({ client, assert }) => {

    const userPayload = {
      name: "Vitor Nogueira Gomes",
      email: "vitor@test.com",
      password: "password123",
      passwordConfirmation: "password123"

    }

    const response = await client.post(`${BASE_URL}/register`).form(userPayload).send()

    response.assertStatus(422)

  })

  test('it should return 422 when providing an invalid password', async ({ client, assert }) => {

    const userPayload = {
      name: "teste Nogueira Gomes",
      email: "teste@test.com",
      password: "23",
      passwordConfirmation: "23"
    }

    const response = await client.post(`${BASE_URL}/register`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

  })

  test('it should return 422 when password confirmation does not match ', async ({ client, assert }) => {

    const userPayload = {
      name: "teste Nogueira Gomes",
      email: "teste123@test.com",
      password: "password12",
      passwordConfirmation: "password123"
    }

    const response = await client.post(`${BASE_URL}/register`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

  })

  test('it should return 422 when required data is not provided', async ({ client, assert }) => {
    const response = await client.post(`${BASE_URL}/register`).form({}).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  group.teardown(async () => {
    return Database.rollbackGlobalTransaction()
  })

})