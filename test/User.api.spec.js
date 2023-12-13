/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { User } = require('../models')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenAdmin = ''
let idUser = ''
let idUserForDelete = ''
let tokenMalformed =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI0NjA3NzgsImV4cCI6MTcwMjU0NzE3OH0.KCqPMrXmPeB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'

beforeAll(async () => {
  const user = {
    email: 'gord@gmail.com',
    password: 'usergord123',
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

describe('API User', () => {
  it('Success get all user', async () => {
    const response = await request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    const gilang = response.body.data.users[2]
    const alucard = response.body.data.users[3]
    idUser = gilang.id
    idUserForDelete = alucard.id
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get all user because jwt malformed', async () => {
    const response = await request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get all user because user role not admin', async () => {
    const response = await request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed get all user because no token', async () => {
    const response = await request(app).get('/api/v1/user')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .post('/api/v1/user/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get user by id', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get user by id because jwt malformed', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get user because id not found', async () => {
    const response = await request(app)
      .get('/api/v1/user/777')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed get user by id because user role not admin', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed get user by id because no token', async () => {
    const response = await request(app).get(`/api/v1/user/${idUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success update user', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update user because jwt malformed', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(user)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed update user because no token', async () => {
    const user = {
      country: 'Indonesia',
      city: 'bandung',
    }
    const response = await request(app)
      .patch(`/api/v1/user/${idUser}`)
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed update user because user role not admin', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${idUser}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete user because user role not admin', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${idUserForDelete}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete user because id not found', async () => {
    const response = await request(app)
      .delete('/api/v1/user/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed delete user because no token', async () => {
    const response = await request(app).delete(
      `/api/v1/user/${idUserForDelete}`,
    )
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/user')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete user because jwt malformed', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${idUserForDelete}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Success delete user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${idUserForDelete}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })
})
