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

const getTokenAdmin = async (credentials) => {
  const check = await request(app)
    .post('/api/v1/auth/admin/login')
    .send(credentials)
  const res = JSON.parse(check.text)
  return res.token
}

let imageBuffer
beforeAll(async () => {
  const filePath = path.join(__dirname, '../public/img/anddev.png')
  imageBuffer = fs.readFileSync(filePath)
})

describe('API Category', () => {
  it('Success create category', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/category')
      .field('id', 'C-0DOP')
      .field('name', 'Devops')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .attach('image', imageBuffer, 'anddev.png')
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create category')
  }, 30000)

  it('Failed create category because jwt expired', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/category')
      .send(category)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed create category because jwt malformed', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/category')
      .send(category)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed create category because about to much string', async () => {
    const category = {
      name: 'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, category ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      id: 'C-0BUB',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/category')
      .send(category)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  }, 10000)

  it('Failed create category because user role not admin', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const tokenUser = await getToken({
      email: 'yuzhong@gmail.com',
      password: 'useryuzhong123',
    })
    const response = await request(app)
      .post('/api/v1/category')
      .send(category)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Failed create category because no token', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const response = await request(app).post('/api/v1/category').send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/category/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Success get all category', async () => {
    const response = await request(app).get('/api/v1/category')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  }, 10000)

  it('Failed create category because user role not admin', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .post('/api/v1/category')
      .send(category)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Success get category by id', async () => {
    const response = await request(app).get('/api/v1/category/C-0WEB')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  }, 10000)

  it('Failed get category because id not found', async () => {
    const response = await request(app).get('/api/v1/category/C-0WEBBBBBB')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  it('Success update category', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .patch('/api/v1/category/C-0WEB')
      .field('name', 'Devops')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .attach('image', imageBuffer, 'anddev.png')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  }, 30000)

  it('Failed update category route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .put('/api/v1/category/C-0WEB')
      .field('name', 'Devops')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .attach('image', imageBuffer, 'anddev.png')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Failed update category because jwt expired', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .patch('/api/v1/category/C-0AND')
      .send(category)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed update category because jwt malformed', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch('/api/v1/category/C-0AND')
      .send(category)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed update category because id not found', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .patch('/api/v1/category/C-0ANDDDDDDDD')
      .send(category)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  it('Failed update category because user role not admin', async () => {
    const category = {
      name: 'Artificial intelligence',
    }
    const tokenUser = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const response = await request(app)
      .patch('/api/v1/category/C-0AND')
      .send(category)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Failed update category because no token', async () => {
    const category = {
      name: 'Artificial intelligence',
    }
    const response = await request(app)
      .patch('/api/v1/category/C-0UIX')
      .send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .patch('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Failed delete category because user role not admin', async () => {
    const tokenUser = await getToken({
      email: 'layla@gmail.com',
      password: 'userlayla123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0WEB')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Failed delete category because id not found', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0ANDDDD')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  it('Failed delete category because no token', async () => {
    const response = await request(app).delete('/api/v1/category/C-0IOS')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .delete('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Failed delete category because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .delete('/api/v1/category/C-0OT')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed create category because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .delete('/api/v1/category/C-0OT')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Success delete category', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0DS')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  }, 10000)
})
