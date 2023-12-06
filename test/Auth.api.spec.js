/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

describe('API Register', () => {
  it('success register', async () => {
    const user = {
      email: 'imamtaufiq133@gmail.com',
      password: '12345678',
      name: 'imam',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Bandung',
    }
    const response = await request(app).post('/api/v1/auth/register').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Register successful')
  })

  it('Failed register because user password minimum not match', async () => {
    const user = {
      email: 'imamtaufiq333@gmail.com',
      password: '123',
      name: 'imam',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Bandung',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Minimum password must be 8 characters')
  })

  it('Failed register because email already exist', async () => {
    const user = {
      email: 'imamtaufiq133@gmail.com',
      password: '1234567890',
      name: 'imam',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Bandung',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('User email already taken')
  })
})

describe('API Login', () => {
  it('success login', async () => {
    const user = {
      email: 'imam.user@gmail.com',
      password: 'admin123',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Login successful')
  })

  it('Failed login because user not verified', async () => {
    const user = {
      email: 'imamtaufiq133@gmail.com',
      password: '123',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('User not verified')
  })

  it('Failed login because email not found', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(404)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Email not found')
  })

  it('Failed login because wrong password', async () => {
    const user = {
      email: 'imam.user@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Incorrect password')
  })
})
