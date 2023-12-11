/* eslint-disable */
const request = require('supertest')
const app = require('../server')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

let tokenUser = ''
let tokenAdmin = ''
let courseId = ''
let courseIdForModule = ''

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
  courseIdForModule = response.body.data.newCourse.id
})

describe('API Course', () => {
  it('Success create course', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
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
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create course')
  })

  it('Failed create course because about to much string', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
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
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Success get all course', async () => {
    const response = await request(app).get('/api/v1/course')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed create course because categoryId not found', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      objective:
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      categoryId: 'C-0WEBkjhs',
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
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Cause category with id C-0WEBkjhs not found',
    )
  })

  it('Failed create course because level not the same like on enum data', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      objective:
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      categoryId: 'C-0WEB',
      onboarding:
        'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
      level: 'Mahir',
      rating: 4.5,
      instructor: 'Sandika Galih',
      telegramLink: 'http://www.telegramling.com',
      price: 50000,
    }
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'invalid input value for enum "enum_Courses_level": "Mahir"',
    )
  })

  it('Failed create course because user role not admin', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
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
      .send(course)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed route does not exist', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
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
      .post('/api/v1/course/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get course by id', async () => {
    const response = await request(app).get(`/api/v1/course/${courseId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get course because id not found', async () => {
    const response = await request(app).get('/api/v1/course/999')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Success update course', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update course because user role not admin', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      price: 10000,
    }
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(course)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed update course because id not found', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const response = await request(app)
      .patch('/api/v1/course/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed update course because level not the same like on enum data', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      objective:
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      categoryId: 'C-0WEB',
      onboarding:
        'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
      level: 'Gegeh',
      rating: 4.5,
      instructor: 'Sandika Galih',
      telegramLink: 'http://www.telegramling.com',
      price: 50000,
    }
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'invalid input value for enum "enum_Courses_level": "Gegeh"',
    )
  })

  it('Failed update course because categoryId not found', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      about:
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      objective:
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      categoryId: 'C-0ANDlkahjsd',
      onboarding:
        'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
      level: 'Beginner',
      rating: 4.5,
      instructor: 'Sandika Galih',
      telegramLink: 'http://www.telegramling.com',
      price: 50000,
    }
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(course)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Cause category with id C-0ANDlkahjsd not found',
    )
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .patch('/api/v1/course')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success delete course', async () => {
    const response = await request(app)
      .delete(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })

  it('Failed delete course because user role not admin', async () => {
    const response = await request(app)
      .delete(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete course because id not found', async () => {
    const response = await request(app)
      .delete('/api/v1/course/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed route does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/course')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })
})
