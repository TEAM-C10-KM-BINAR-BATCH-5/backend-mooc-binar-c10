/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenAdmin = ''
let categoryId = ''

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

describe('API Category', () => {
  it('Success create category', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    categoryId = response.body.data.newCategory.id
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create category')
  })

  it('Failed create category because about to much string', async () => {
    const category = {
      name: 'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, category ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      id: 'C-0BUB',
    }
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .post('/api/v1/category/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get all category', async () => {
    const response = await request(app).get('/api/v1/category')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed create module because user role not admin', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Success get category by id', async () => {
    const response = await request(app).get(`/api/v1/category/${categoryId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get course because id not found', async () => {
    const response = await request(app).get('/api/v1/category/777')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Success update category', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const response = await request(app)
      .put(`/api/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update category because id not found', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const response = await request(app)
      .put('/api/v1/category/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed update category because user role not admin', async () => {
    const category = {
      name: 'Artificial intelligence',
    }
    const response = await request(app)
      .put(`/api/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .put('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success delete category', async () => {
    const response = await request(app)
      .delete(`/api/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })

  it('Failed delete category because user role not admin', async () => {
    const response = await request(app)
      .delete(`/api/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete category because id not found', async () => {
    const response = await request(app)
      .delete('/api/v1/category/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })
})
