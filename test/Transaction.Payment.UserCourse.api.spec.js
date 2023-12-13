/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenAdmin = ''
let courseId = ''
let tokenMalformed =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI0NjA3NzgsImV4cCI6MTcwMjU0NzE3OH0.KCqPMrXmPeB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'

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
    email: 'binar.team.c10@gmail.com',
    password: 'admin123',
  }
  const response = await request(app)
    .post('/api/v1/auth/admin/login')
    .send(user)
  tokenAdmin = response.body.token
})

beforeAll(async () => {
  const course = {
    title: 'Tutorial Html dan Css',
    about: 'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
    objective:
      'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
    categoryId: 'C-0WEB',
    onboarding:
      'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
    level: 'Beginner',
    rating: 4.5,
    instructor: 'Sandika Galih',
    telegramLink: 'http://www.telegramling.com',
    price: 50000,
  }
  const response = await request(app)
    .post('/api/v1/course')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(course)
  courseId = response.body.data.newCourse.id
})

describe('API payment & transaction', () => {
  it('Failed initialing payment to buy course because courseId not found', async () => {
    const response = await request(app)
      .post('/api/v1/payment/777')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed initialing payment to buy course because user role is admin', async () => {
    const response = await request(app)
      .post(`/api/v1/payment/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not user, your access to this is blocked',
    )
  })

  it('Failed initialing payment to buy course because no token', async () => {
    const response = await request(app).post(`/api/v1/payment/${courseId}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed initialing payment to buy course because jwt malformed', async () => {
    const response = await request(app)
      .post(`/api/v1/payment/${courseId}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Success initialing payment to buy course', async () => {
    const response = await request(app)
      .post(`/api/v1/payment/${courseId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success initiating payment')
  })

  // it('Failed buy course because course already enrolled', async () => {
  //   const response = await request(app)
  //     .post(`/api/v1/payment/${courseId}`)
  //     .set('Authorization', `Bearer ${tokenUser}`)
  //   expect(response.statusCode).toBe(400)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe('Course already enrolled')
  // })

  it('Success get user courses', async () => {
    const response = await request(app)
      .get('/api/v1/enrollment')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get user courses because jwt malformed', async () => {
    const response = await request(app)
      .get('/api/v1/enrollment')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get user courses because no token', async () => {
    const response = await request(app).get('/api/v1/enrollment')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  // it('Success get user courses by id', async () => {
  //   const response = await request(app)
  //     .get(`/api/v1/enrollment/${courseId}`)
  //     .set('Authorization', `Bearer ${tokenUser}`)
  //   console.log(response.body)
  //   expect(response.statusCode).toBe(200)
  //   expect(response.body.success).toBe(true)
  //   expect(response.body.message).toBe('Success, fetch')
  // })

  it('Failed get user courses because jwt malformed', async () => {
    const response = await request(app)
      .get(`/api/v1/enrollment/${courseId}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get user courses by id because course not purchased yet', async () => {
    const response = await request(app)
      .get(`/api/v1/enrollment/${courseId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You have not purchased this course yet, or course not available',
    )
  })

  // it('Failed get user courses by id because no token', async () => {
  //   const response = await request(app).post(`/api/v1/enrollment/${courseId}`)
  //   expect(response.statusCode).toBe(401)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe('No token')
  // })

  it('Failed get user courses by id because id not found', async () => {
    const response = await request(app)
      .get('/api/v1/enrollment/777')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed get user courses because user role is admin', async () => {
    const response = await request(app)
      .get('/api/v1/enrollment')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not user, your access to this is blocked',
    )
  })

  it('Failed get user courses by id because user role is admin', async () => {
    const response = await request(app)
      .get(`/api/v1/enrollment/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not user, your access to this is blocked',
    )
  })

  it('Success get all transaction', async () => {
    const response = await request(app)
      .get('/api/v1/transaction')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get all transcaction because jwt malformed', async () => {
    const response = await request(app)
      .get('/api/v1/transaction')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get all transaction because no token', async () => {
    const response = await request(app).get('/api/v1/transaction')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed get all transaction because user role not admin', async () => {
    const response = await request(app)
      .get('/api/v1/transaction')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('User success get their all transaction', async () => {
    const response = await request(app)
      .get('/api/v1/user-transaction')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('User Failed success get their all transaction because jwt malformed', async () => {
    const response = await request(app)
      .get('/api/v1/user-transaction')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('User failed get all transaction because no token', async () => {
    const response = await request(app).get('/api/v1/user-transaction')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('User failed get all transaction because user role not user', async () => {
    const response = await request(app)
      .get('/api/v1/user-transaction')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not user, your access to this is blocked',
    )
  })
})
