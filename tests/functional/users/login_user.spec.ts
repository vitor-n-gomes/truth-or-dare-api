import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const userPayload = {
  name: "teste Nogueira Gomes",
  email: "teste@test.com",
  password: "password123",
  passwordConfirmation: "password123"
}


test.group('User', (group) => {

  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })


  test('It should create an user ', async ({ client, assert }) => {

    const response = await client.post(`${BASE_URL}/register`).form(userPayload).send()

    response.assertStatus(201)

    const body = response.body();

    assert.exists(response.body().token);
    assert.exists(response.body().user);

  })

  test('it should return 422 when e-mail is invalid', async ({ client, assert }) => {

    userPayload.email = 'testeteste.com.br';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

  })

  test('it should return 422 when password is invalid because the lenght is too small', async ({ client, assert }) => {

    userPayload.email = 'teste@test.com';
    userPayload.password = '12';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

  })

  test('it should return 422 when password is invalid because the lenght is too large', async ({ client, assert }) => {

    userPayload.email = 'teste@test.com';
    userPayload.password = '0Iny9Zv21EXFSniuQimQOKWr0UOId3WU5UOqDhva8';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

  })

  test('it should return 409 when an e-mail does not exist ', async ({ client, assert }) => {

    userPayload.email = '0Iny9Zv21EXFS@teste.com.br';
    userPayload.password = 'password123';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    const body = response.body();

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)

  })

  test('it should return 400 when password is wrong', async ({ client, assert }) => {

    userPayload.email = 'teste@test.com';
    userPayload.password = 'password';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    const body = response.body();

    response.assertStatus(400)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 400)

  })

  test('it should return 201 when login is successful', async ({ client, assert }) => {

    userPayload.email = 'teste@test.com';
    userPayload.password = 'password123';

    const response = await client.post(`${BASE_URL}/login`).form(userPayload).send()

    response.assertStatus(201)

    const body = response.body();

    assert.exists(body.token);

  })

  group.teardown(async () => {
    return Database.rollbackGlobalTransaction()
  })

})