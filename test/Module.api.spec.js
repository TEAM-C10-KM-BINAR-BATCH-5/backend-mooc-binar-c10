/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenAdmin = ''
let courseIdForModule = ''
let moduleId = ''

beforeAll(async () => {
  const user = {
    email: 'yuzhong@gmail.com',
    password: 'useryuzhong123',
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
  courseIdForModule = response.body.data.newCourse.id
})

describe('API Module', () => {
  it('Success create module', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
    const response = await request(app)
      .post('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    moduleId = response.body.data.newModule.id
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create module')
  })

  it('Failed create module because about to much string', async () => {
    const course = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      courseId: courseIdForModule,
    }
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
    const response = await request(app)
      .post('/api/v1/module')
      .send(module)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Cause course with id 999 not found')
  })

  it('Failed create module because user role not admin', async () => {
    const module = {
      title: 'Tutorial Html dan Css',
      courseId: courseIdForModule,
    }
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
    const response = await request(app)
      .post('/api/v1/module/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get module by id', async () => {
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
    const response = await request(app)
      .put(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update module because no token', async () => {
    const module = {
      title: 'Chapter 1 javascript async',
    }
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
    const response = await request(app)
      .put('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(module)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete module because user role not admin', async () => {
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
    const response = await request(app).delete(`/api/v1/module/${moduleId}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed delete module because id not found', async () => {
    const response = await request(app)
      .delete('/api/v1/module/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/module')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success delete module', async () => {
    const response = await request(app)
      .delete(`/api/v1/module/${moduleId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })
})
