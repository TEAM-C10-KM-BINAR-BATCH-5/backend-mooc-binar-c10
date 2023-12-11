/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

describe('API Register', () => {
  // it('success register', async () => {
  //   const user = {
  //     email: 'imamtaufiq133@gmail.com',
  //     password: '12345678',
  //     name: 'imam',
  //     phoneNumber: '01234567',
  //   }
  //   const response = await request(app).post('/api/v1/auth/register').send(user)
  //   expect(response.statusCode).toBe(201)
  //   expect(response.body.success).toBe(true)
  //   expect(response.body.status).toBe('Success, register user')
  // })
  // it('Failed register because user password minimum not match', async () => {
  //   const user = {
  //     email: 'imamtaufiq333@gmail.com',
  //     password: '123',
  //     name: 'imam',
  //     phoneNumber: '01234567',
  //   }
  //   const response = await request(app).post('/api/v1/auth/register').send(user)
  //   expect(response.statusCode).toBe(400)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe('Minimum password must be 8 characters')
  // })
  // it('Failed register because email already exist', async () => {
  //   const user = {
  //     email: 'imamtaufiq133@gmail.com',
  //     password: '1234567890',
  //     name: 'imam',
  //     phoneNumber: '01234567',
  //   }
  //   const response = await request(app).post('/api/v1/auth/register').send(user)
  //   expect(response.statusCode).toBe(400)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe('User email already taken')
  // })
})

describe('API Login', () => {
  it('success login', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, login user')
  })

  it('Failed login because user not including email or password', async () => {
    const user = {}
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Email and password are requred for login',
    )
  })

  it('Failed login because email does not exist, please register first', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Email does not exist, register instead')
  })

  it('Failed login because wrong password', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Password doesnt match')
  })

  it('Failed login admin login at endpoint login for user', async () => {
    const user = {
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'This only accept register for user only',
    )
  })
})
