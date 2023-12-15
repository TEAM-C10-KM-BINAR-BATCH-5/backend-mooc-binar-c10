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

const getIdCourse = async (id) => {
  const check = await request(app).get(`/api/v1/course/${id}`)

  const res = JSON.parse(check.text)
  return res.data.id
}

const getIdModule = async (id) => {
  const check = await request(app).get(`/api/v1/module/${id}`)

  const res = JSON.parse(check.text)
  return res.data.id
}

describe('API Module', () => {
  it('Success create module', async () => {
    const courseIdForModule = await getIdCourse(1)
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    console.log(response.body)
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create module')
  })

  it('Failed create module because jwt malformed', async () => {
    const courseIdForModule = await getIdCourse(1)
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(module)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create module because jwt expired', async () => {
    const courseIdForModule = await getIdCourse(1)
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(module)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed create module because about to much string', async () => {
    const courseIdForModule = await getIdCourse(1)
    const course = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      courseId: courseIdForModule,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Failed create module because no token', async () => {
    const courseIdForModule = await getIdCourse(1)
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const response = await request(app).post('/api/v1/module').send(module)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success get all module', async () => {
    const response = await request(app).get('/api/v1/module')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed create module because courseId not found', async () => {
    const module = {
      title: 'Chapter 1 javascript dasar',
      courseId: 999,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/module')
      .send(module)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Cause course with id 999 not found')
  })

  it('Failed create module because user role not admin', async () => {
    const courseIdForModule = await getIdCourse(1)
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const tokenUser = await getToken({
      email: 'yuzhong@gmail.com',
      password: 'useryuzhong123',
    })
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(module)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed route does not exist', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: 888,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/module/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get module by id', async () => {
    const moduleId = await getIdModule(1)
    const response = await request(app).get(`/api/v1/module/${moduleId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get module because id not found', async () => {
    const response = await request(app).get('/api/v1/module/777')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Success update module', async () => {
    const module = {
      title: 'Chapter 1 javascript async',
    }
    const moduleId = await getIdModule(1)
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update because jwt expired', async () => {
    const module = {
      title: 'Chapter 1 javascript async',
    }
    const moduleId = await getIdModule(1)
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(module)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed update module because jwt malformed', async () => {
    const module = {
      title: 'Chapter 1 javascript async',
    }
    const moduleId = await getIdModule(1)
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(module)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed update module because no token', async () => {
    const module = {
      title: 'Chapter 1 javascript async',
    }
    const moduleId = await getIdModule(1)
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .send(module)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed update module because user role not admin', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
    }
    const moduleId = await getIdModule(1)
    const tokenUser = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(module)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed update module because id not found', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/module/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed update module because courseId not found', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: 888,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const moduleId = await getIdModule(1)
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Cause course with id 888 not found')
  })

  it('Failed route does not exist', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: 888,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete module because user role not admin', async () => {
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
    const moduleId = await getIdModule(1)
    const response = await request(app)
      .delete(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete module because no token', async () => {
    const moduleId = await getIdModule(1)
    const response = await request(app).delete(`/api/v1/module/${moduleId}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed delete module because id not found', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/module/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete module because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const moduleId = await getIdModule(1)
    const response = await request(app)
      .delete(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed delete module because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const moduleId = await getIdModule(1)
    const response = await request(app)
      .delete(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success delete module', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const moduleId = await getIdModule(2)
    const response = await request(app)
      .delete(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })
})
