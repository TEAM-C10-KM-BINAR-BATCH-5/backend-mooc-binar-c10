/* eslint-disable */
const request = require('supertest')
const fs = require('fs')
const path = require('path')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

const getToken = async (credentials) => {
  const check = await request(app).post('/api/v1/auth/login').send(credentials)
  const res = JSON.parse(check.text)
  return res.token
}

let imageBuffer
beforeAll(async () => {
  const filePath = path.join(__dirname, '../public/img/anddev.png')
  imageBuffer = fs.readFileSync(filePath)
})

// describe('OTP endpoint', () => {
//   it('Should generate OTP and send email', async () => {
//     const user = {
//       email: 'simbahmbah77@gmail.com',
//     }

//     const response = await request(app).post('/api/v1/otp').send(user)
//     otpForRegister = response.req.session.otp
//     console.log(response.body)
//     expect(response.statusCode).toBe(200)
//     expect(response.body.success).toBe(true)
//     expect(response.body.message).toBe('Success, sent')
//   })
// })

describe('API Register', () => {
  // it('success register', async () => {
  //   const user = {
  //     otp: otpForRegister,
  //     email: 'simbahmbah77@gmail.com',
  //     password: '12345678',
  //     name: 'simbah',
  //     phoneNumber: 6288716625536,
  //   }
  //   const response = await request(app).post('/api/v1/auth/register').send(user)
  //   console.log(response.body)
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
  }, 10000)

  it('Failed register because invalid otp', async () => {
    const user = {
      email: 'imamtaufiq333@gmail.com',
      password: '12345678',
      name: 'imam',
      phoneNumber: 6288716625536,
      otp: 876513,
      hashedOtp: '55d6c68b61cefc6a66d2abaff',
    }
    const response = await request(app).post('/api/v1/auth/register').send(user)
    console.log(response.body)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('invalid or expired otp')
  }, 10000)
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
  }, 10000)

  it('Failed login user because user not including email or password', async () => {
    const user = {}
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Email and password are requred for login',
    )
  }, 10000)

  it('Failed login user because email does not exist, please register first', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Email does not exist, register instead')
  }, 10000)

  it('Failed login user because wrong password', async () => {
    const user = {
      email: 'syifa@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app).post('/api/v1/auth/login').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Password doesnt match')
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)
})

describe('API profile', () => {
  it('Success get user profile', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success')
  }, 10000)

  it('Failed get user profile because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed get user profile because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed get user profile because no token', async () => {
    const response = await request(app).get('/api/v1/auth/profile')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Success update data profile', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/data')
      .field('country', 'kenya')
      .set('Authorization', `Bearer ${tokenUser}`)
      .attach('image', imageBuffer, 'anddev.png')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  }, 50000)

  it('Failed update profile because jwt expired', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/data')
      .send(user)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed update profile because jwt malformed', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/data')
      .send(user)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

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
  }, 10000)

  it('Failed ubah password because old password is not match', async () => {
    const user = {
      oldPassword: 'usergilang1234567',
      newPassword: 'usergilang12',
      repeatNewPassword: 'usergilang12',
    }
    const tokenUser = await getToken({
      email: 'gilang@gmail.com',
      password: 'usergilang123',
    })
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Your old password is not match with this account, if you forgot the password, go to reset the password feature',
    )
  }, 20000)

  it('Failed ubah password because newPassword is lower than 8 caharacter', async () => {
    const user = {
      oldPassword: 'usergord123',
      newPassword: '123',
      repeatNewPassword: '123',
    }
    const tokenUser = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Minimum password must be 8 character')
  }, 20000)

  it('Failed ubah password because newPassword and repeating password is not same', async () => {
    const user = {
      oldPassword: 'userkhaled123',
      newPassword: 'usergilang',
      repeatNewPassword: 'usersyifa',
    }
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'New password must be the same with new repeating password',
    )
  }, 20000)

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
  }, 10000)

  it('Failed update profile because jwt expired', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: 'usergilang1234',
      repeatNewPassword: 'usergilang1234',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'

    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed update profile because jwt malformed', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: 'usergilang1234',
      repeatNewPassword: 'usergilang1234',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Success ubah password', async () => {
    const user = {
      oldPassword: 'usergilang123',
      newPassword: 'usergilang1234',
      repeatNewPassword: 'usergilang1234',
    }
    const tokenUser = await getToken({
      email: 'gilang@gmail.com',
      password: 'usergilang123',
    })
    const response = await request(app)
      .patch('/api/v1/auth/profile/edit/ubah-password')
      .send(user)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      'Success, your password successfully changed',
    )
  }, 20000)

  it('Post not found route', async () => {
    const data = {
      name: 'yuyu',
    }
    const response = await request(app).post('/2').send(data)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)
  it('Get not found route', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Get id not found route', async () => {
    const response = await request(app).get('/9')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)
  it('Patch not found route', async () => {
    const data = {
      name: 'yuyu',
    }
    const response = await request(app).patch('/1').send(data)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)
  it('Delete not found route', async () => {
    const response = await request(app).get('/1')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)
})
