/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenUserForUbahPass = ''
let tokenAdmin = ''

beforeAll(async () => {
  const user = {
    email: 'syifa@gmail.com',
    password: 'usersyifa123',
  }
  const response = await request(app).post('/api/v1/auth/login').send(user)
  tokenUser = response.body.token
})

beforeAll(async () => {
  const user = {
    email: 'gilang@gmail.com',
    password: 'usergilang123',
  }
  const response = await request(app).post('/api/v1/auth/login').send(user)
  tokenUserForUbahPass = response.body.token
})

beforeAll(async () => {
  const user = {
    email: 'binar.team.c10@gmail.com',
    password: 'admin123',
  }
  const response = await request(app)
    .post('/api/v1/auth/admin/login')
    .send(user)
  tokenAdmin = response.body.token
})

describe('API Register', () => {
  // it('success register', async () => {
  //   const otp = otpGenerator.generate(6, {
  //     upperCaseAlphabets: false,
  //     lowerCaseAlphabets: false,
  //     specialChars: false,
  //   })
  //   req.session.otp = otp
  //   const user = {
  //     email: 'simbahmbah77@gmail.com',
  //     password: '12345678',
  //     name: 'simbah',
  //     phoneNumber: 6288716625536,
  //     otp: otp,
  //   }
  //   const response = await request(app).post('/api/v1/auth/register').send(user)
  //   expect(response.statusCode).toBe(201)
  //   expect(response.body.success).toBe(true)
  //   expect(response.body.status).toBe('Success, register user')
  // })
  it('Failed register because user not including otp', async () => {
    const user = {
      email: 'imamtaufiq333@gmail.com',
      password: '12345678',
      name: 'imam',
      phoneNumber: 6288716625536,
    }
    const response = await request(app).post('/api/v1/auth/register').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Otp required!')
  })

  it('Failed register because ', async () => {
    const user = {
      email: 'imamtaufiq333@gmail.com',
      password: '12345678',
      name: 'imam',
      phoneNumber: 6288716625536,
      otp: 876513,
    }
    const response = await request(app).post('/api/v1/auth/register').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('invalid or expired otp')
  })
})

describe('API Login', () => {
  it('Success login user', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, login user')
  })

  it('Failed login user because user not including email or password', async () => {
    const user = {}
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Email and password are requred for login',
    )
  })

  it('Failed login user because email does not exist, please register first', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Email does not exist, register instead')
  })

  it('Failed login user because wrong password', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Password doesnt match')
  })

  it('Failed login admin because login at endpoint login for user', async () => {
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

  it('Success login admin', async () => {
    const user = {
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, login admin')
  })

  it('Failed login admin because user not including email or password', async () => {
    const user = {}
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Email and password are requred for login',
    )
  })

  it('Failed login admin because email does not exist, please register first', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Email does not exist, register instead')
  })

  it('Failed login admin because wrong password', async () => {
    const user = {
      email: 'binar.team.c10@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Password doesnt match')
  })

  it('Failed login user because login at endpoint login for admin', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'This only accept register for admin only',
    )
  })
})

describe('API profile', () => {
  it('Success get user profile', async () => {
    const response = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success')
  })

  it('Failed get user profile because no token', async () => {
    const response = await request(app).get('/api/v1/auth/profile')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success update data profile', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/data')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update data profile because no token', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/data')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed ubah password because old password is not match', async () => {
    const user = {
      oldPassword: 'usergilang1234567',
      newPassword: 'usergilang12',
      repeatNewPassword: 'usergilang12',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .set('Authorization', `Bearer ${tokenUserForUbahPass}`)
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Your old password is not match with this account, if you forgot the password, go to reset the password feature',
    )
  })

  it('Failed ubah password because newPassword is lower than 8 caharacter', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: '123',
      repeatNewPassword: '123',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .set('Authorization', `Bearer ${tokenUserForUbahPass}`)
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Minimum password must be 8 character')
  })

  it('Failed ubah password because newPassword and repeating password is not same', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: 'usergilang',
      repeatNewPassword: 'usersyifa',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .set('Authorization', `Bearer ${tokenUserForUbahPass}`)
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'New password must be the same with new repeating password',
    )
  })

  it('Failed ubah password because no token', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success ubah password', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: 'usergilang1234',
      repeatNewPassword: 'usergilang1234',
    }
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .set('Authorization', `Bearer ${tokenUserForUbahPass}`)
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      'Success, your password successfully changed',
    )
  })
})
