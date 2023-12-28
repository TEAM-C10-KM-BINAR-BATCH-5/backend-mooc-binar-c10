/* eslint-disable */
const request = require('supertest')
const fs = require('fs')
const path = require('path')
const app = require('../server')
const { faker } = require('@faker-js/faker')
const supertest = require('supertest')
require('dotenv').config()

let otp = ''
let hash = ''

describe('API for send OTP', () => {
  it('Success send OTP for reset password', async () => {
    const email = {
      email: 'neymar@gmail.com',
    }
    const response = await supertest(app)
      .post('/api/v1/reset-password/otp')
      .send(email)
    otp = response.body.otp
    hash = response.body.data
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, sent')
  })
  it('Failed send OTP for reset password because email not found in system', async () => {
    const email = {
      email: 'yayaya@gmail.com',
    }
    const response = await supertest(app)
      .post('/api/v1/reset-password/otp')
      .send(email)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Please input email that you use for register!',
    )
  })
  it('Failed reset password because including email or otp or password', async () => {
    const reset = {
      email: 'neymar@gmail.com',
      otp,
      hashedOtp: hash,
    }
    const response = await supertest(app)
      .post('/api/v1/reset-password/verify')
      .send(reset)
    console.log(response.body)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('email, otp, and password required')
  })
  // it('Failed reset password because email not exist in system', async () => {
  //   const reset = {
  //     email: 'huhuhu@gmail.com',
  //     password: '123456789',
  //     otp,
  //     hashedOtp: hash,
  //   }
  //   const response = await supertest(app)
  //     .post('/api/v1/reset-password/verify')
  //     .send(reset)
  //   console.log(response.body)
  //   expect(response.statusCode).toBe(404)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe(
  //     'Email not registered!, Please input email that you use for register!',
  //   )
  // })
  it('Failed reset password because password is lower than 8', async () => {
    const reset = {
      email: 'neymar@gmail.com',
      password: '12345',
      otp,
      hashedOtp: hash,
    }
    const response = await supertest(app)
      .post('/api/v1/reset-password/verify')
      .send(reset)
    console.log(response.body)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Minimum password must be 8 character')
  })

  it('Success reset password', async () => {
    const reset = {
      email: 'neymar@gmail.com',
      password: 'userneymar1234',
      otp,
      hashedOtp: hash,
    }
    const response = await supertest(app)
      .post('/api/v1/reset-password/verify')
      .send(reset)
    console.log(response.body)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Reseting your password successfully')
  })
})
