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

describe('API Video', () => {
  it('Success create video', async () => {
    const video = {
      title: 'Pendahuluan html',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, create video')
  })

  it('Failed create video because jwt malformed', async () => {
    const video = {
      title: 'Pendahuluan html',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(video)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create video because jwt expired', async () => {
    const video = {
      title: 'Pendahuluan html',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(video)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed create video because about to much string', async () => {
    const video = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Failed create video because no token', async () => {
    const video = {
      title: 'Pendahuluan html',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const response = await request(app).post('/api/v1/video').send(video)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success get all video', async () => {
    const response = await request(app).get('/api/v1/video')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed create video because moduleId not found', async () => {
    const video = {
      title: 'Pendahuluan html',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 999,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Cause module with id 999 not found')
  })

  it('Failed create video because not including title or moduleId', async () => {
    const video = {
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Title and module id are required!')
  })

  it('Failed create video because user role not admin', async () => {
    const video = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .post('/api/v1/video')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(video)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed route does not exist', async () => {
    const video = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, course ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      no: 1,
      videoUrl: 'http://wkwkwk.com',
      duration: 10,
      moduleId: 1,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/video/10')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Success get video by id', async () => {
    const response = await request(app).get('/api/v1/video/1')
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch')
  })

  it('Failed get video because id not found', async () => {
    const response = await request(app).get('/api/v1/video/777')
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Success update video', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/video/1')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, updated')
  })

  it('Failed update video because jwt malformed', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .put('/api/v1/video/1')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(video)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed update video because jwt expired', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .put('/api/v1/video/1')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(video)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed update video because no token', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const response = await request(app).put('/api/v1/video/1').send(video)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed update video because user role not admin', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .put('/api/v1/video/1')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(video)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed update video because id not found', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/video/888')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed update video because courseId not found', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
      moduleId: 777,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/video/1')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'Bad request / cause module with id 777 not found',
    )
  })

  it('Failed route does not exist', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
      moduleId: 777,
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .put('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(video)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete video because user role not admin', async () => {
    const video = {
      no: 2,
      videoUrl: 'http://awokawok.com',
    }
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .put('/api/v1/video/3')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(video)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed delete video because no token', async () => {
    const response = await request(app).delete('/api/v1/video/2')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed delete vudeo because id not found', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/video/999')
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
      .delete('/api/v1/video')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Routes does not exist')
  })

  it('Failed delete video because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .delete('/api/v1/video/3')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed delete video because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .delete('/api/v1/video/3')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success delete video', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .delete('/api/v1/video/6')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, deleted')
  })
})
