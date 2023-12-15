/* eslint-disable */
const request = require('supertest')
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

// const getIdCategory = async (id) => {
//   const check = await request(app).get(`/api/v1/category/${id}`)

//   const res = JSON.parse(check.text)
//   return res.data.id
// }

describe('API Category', () => {
  it('Success create category', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    console.log(response.body)
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create category')
  })

  it('Failed create category because jwt expired', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(category)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed create category because jwt malformed', async () => {
    const category = {
      id: 'C-0DOP',
      name: 'DevOps',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/category')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(category)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create category because about to much string', async () => {
    const category = {
      name: 'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, category ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      id: 'C-0BUB',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
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

  it('Failed create category because user role not admin', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
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

  it('Failed create category because no token', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const response = await request(app).post('/api/v1/category').send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
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

  it('Failed create category because user role not admin', async () => {
    const category = {
      id: 'C-0AI',
      name: 'Artificial intelligence',
    }
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
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
    const response = await request(app).get('/api/v1/category/C-0WEB')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get category because id not found', async () => {
    const response = await request(app).get('/api/v1/category/C-0WEBBBBBB')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Success update category', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/category/C-0BI')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(category)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed create category because jwt expired', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .put('/api/v1/category/C-0AND')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(category)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed update category because jwt malformed', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .put('/api/v1/category/C-0AND')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(category)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed update category because id not found', async () => {
    const category = {
      name: 'Cyber Security',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/category/C-0ANDDDDDDDD')
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
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
    const response = await request(app)
      .put('/api/v1/category/C-0AND')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed update category because no token', async () => {
    const category = {
      name: 'Artificial intelligence',
    }
    const response = await request(app)
      .put('/api/v1/category/C-0UIX')
      .send(category)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete category because user role not admin', async () => {
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0WEB')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete category because id not found', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0ANDDDD')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed delete category because no token', async () => {
    const response = await request(app).delete('/api/v1/category/C-0IOS')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/category')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete category because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NyBnbWFpbC5jb20iLCJybpYXQiOjE3MDI0NjA3NzgsB0C7ex_p-tYiP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .delete('/api/v1/category/C-0OT')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create category because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .delete('/api/v1/category/C-0OT')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success delete category', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/category/C-0DS')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })
})
