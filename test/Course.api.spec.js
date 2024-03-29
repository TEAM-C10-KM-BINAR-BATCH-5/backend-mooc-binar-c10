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

const getIdCourse = async (id) => {
  const check = await request(app).get(`/api/v1/course/${id}`)

  const res = JSON.parse(check.text)
  return res.data.id
}

describe('API Course', () => {
  it('Success create course', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/course')
      .field('title', 'Tutorial Html dan Css')
      .field(
        'about',
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      )
      .field(
        'objective',
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      )
      .field('categoryId', 'C-0WEB')
      .field(
        'onboarding',
        'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
      )
      .field('level', 'Beginner')
      .field('rating', 4.5)
      .field('price', 100000)
      .field('instructor', 'Sandika Galih')
      .field('telegramLink', 'http://www.telegramling.com')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .attach('image', imageBuffer, 'anddev.png')
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create course')
  }, 15000)

  it('Failed create course because jwt malformed', async () => {
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
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed create course because jwt expired', async () => {
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
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

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
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  }, 10000)

  it('Failed create course because no token', async () => {
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
    const response = await request(app).post('/api/v1/course').send(course)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Success get all course', async () => {
    const response = await request(app).get('/api/v1/course')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  }, 10000)

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
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Cause category with id C-0WEBkjhs not found',
    )
  }, 10000)

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
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'invalid input value for enum "enum_Courses_level": "Mahir"',
    )
  }, 10000)

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
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .post('/api/v1/course')
      .send(course)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

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
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .post('/api/v1/course/10')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Success get course by id', async () => {
    const courseId = await getIdCourse(1)
    const response = await request(app).get(`/api/v1/course/${courseId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  }, 10000)

  it('Failed get course because id not found', async () => {
    const response = await request(app).get('/api/v1/course/999')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  it('Success update course', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const courseId = await getIdCourse(1)
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .field('title', 'Tutorial Html dan Css')
      .field(
        'about',
        'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
      )
      .field(
        'objective',
        'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
      )
      .field('categoryId', 'C-0WEB')
      .field(
        'onboarding',
        'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
      )
      .field('level', 'Beginner')
      .field('rating', 4.5)
      .field('price', 100000)
      .field('instructor', 'Sandika Galih')
      .field('telegramLink', 'http://www.telegramling.com')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .attach('image', imageBuffer, 'anddev.png')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  }, 15000)

  it('Failed update course because jwt malformed', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const courseId = await getIdCourse(1)
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .send(course)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed update course because jwt expired', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const courseId = await getIdCourse(1)
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .send(course)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Failed update course because user role not admin', async () => {
    const course = {
      title: 'Tutorial Html dan Css',
      price: 10000,
    }
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const courseId = await getIdCourse(2)
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .send(course)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Failed update course because id not found', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .patch('/api/v1/course/999')
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  // it('Failed update course because level not the same like on enum data', async () => {
  //   const course = {
  //     title: 'Tutorial Html dan Css',
  //     about:
  //       'Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web',
  //     objective:
  //       'Course ini ditujukan untuk orang yang mau berkarier di dunia IT khususnya di bidang pengembangan web',
  //     categoryId: 'C-0WEB',
  //     onboarding:
  //       'Siapkan mental anda untuk menghadapi course ini, karena course ini sangat bagus sehingga membuat mental anda menjadi semangat',
  //     level: 'Gegeh',
  //     rating: 4.5,
  //     instructor: 'Sandika Galih',
  //     telegramLink: 'http://www.telegramling.com',
  //     price: 50000,
  //   }
  //   const tokenAdmin = await getTokenAdmin({
  //     email: 'binar.team.c10@gmail.com',
  //     password: 'admin123',
  //   })
  //   const courseId = await getIdCourse(2)
  //   const response = await request(app)
  //     .patch(`/api/v1/course/${courseId}`)
  //     .set('Authorization', `Bearer ${tokenAdmin}`)
  //     .send(course)
  //   expect(response.statusCode).toBe(500)
  //   expect(response.body.success).toBe(false)
  //   expect(response.body.message).toBe(
  //     'invalid input value for enum "enum_Courses_level": "Gegeh"',
  //   )
  // })

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
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const courseId = await getIdCourse(2)
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .send(course)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Cause category with id C-0ANDlkahjsd not found',
    )
  }, 10000)

  it('Failed update course because no token', async () => {
    const course = {
      rating: 4.3,
      price: 30000,
    }
    const courseId = await getIdCourse(2)
    const response = await request(app)
      .patch(`/api/v1/course/${courseId}`)
      .send(course)
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
      .patch('/api/v1/course')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Failed delete course because user role not admin', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .delete('/api/v1/course/1')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  }, 10000)

  it('Failed delete course because no token', async () => {
    const courseId = await getIdCourse(2)
    const response = await request(app).delete(`/api/v1/course/${courseId}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  }, 10000)

  it('Failed delete course because id not found', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .delete('/api/v1/course/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  }, 10000)

  it('Failed route does not exist', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const response = await request(app)
      .delete('/api/v1/course')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  }, 10000)

  it('Failed delete course because jwt malformed', async () => {
    let tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const courseId = await getIdCourse(2)
    const response = await request(app)
      .delete(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  }, 10000)

  it('Failed delete course because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const courseId = await getIdCourse(2)
    const response = await request(app)
      .delete(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  }, 10000)

  it('Success delete course', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'admin2@gmail.com',
      password: 'admin2123',
    })
    const courseId = await getIdCourse(3)
    const response = await request(app)
      .delete(`/api/v1/course/${courseId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  }, 10000)
})
