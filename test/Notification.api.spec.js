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

const getIdNotificationToMarkAsReadById = async (token) => {
  const check = await request(app)
    .get(`/api/v1/notification/my`)
    .set('Authorization', `Bearer ${token}`)

  const res = JSON.parse(check.text)
  return res.data[0].id
}

describe('API Notification', () => {
  it('Success create notification to all user', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    console.log(response.body)
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      'Notification created and sent to all users',
    )
  })

  it('Failed create notification to all because jwt malformed', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create notification to all because jwt expired', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed create noitification to all user because no token', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const response = await request(app).post('/api/v1/notification').send(notif)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed create notification to all user because about to much string', async () => {
    const notif = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, category ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      description: 'Promonya besar ini',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Failed create notification to all user because user role not admin', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenUser = await getToken({
      email: 'layla@gmail.com',
      password: 'userlayla123',
    })
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(notif)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed create notification to all user because not including title or desc', async () => {
    const notif = {}
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Title and description required')
  })

  it('Success create notification to user by id', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      `Notification created and sent to user with id 2`,
    )
  })

  it('Failed create notification to user id because jwt malformed', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenMalformed}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed create notification to user id because jwt expired', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenExpired}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success create notification to user by id', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)

    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      `Notification created and sent to user with id 2`,
    )
  })

  it('Failed create noitification to user by id because no token', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const response = await request(app)
      .post('/api/v1/notification/2')
      .send(notif)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed create notification by id because about to much string', async () => {
    const notif = {
      title:
        'Tutorial Html dan Css. Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, Html dan Css adalah sebuah kerangka dasar dalam membuat suatu web, dengan html kita bisa membuat pondasinya sedangkan dengan css kita bisa membuatnya menjadi lebih cantik dengan berbagai style yang dimiliki oleh css. Maka dari itu, category ini sangat cocok untuk orang yang benar-benar mau belajar mengenai pengembangan web dasar',
      description: 'Promonya besar ini',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'value too long for type character varying(255)',
    )
  })

  it('Failed create notification by id because user role not admin', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenUser = await getToken({
      email: 'layla@gmail.com',
      password: 'userlayla123',
    })
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(notif)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed create notification by id because not including title or desc', async () => {
    const notif = {}
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post('/api/v1/notification/2')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('Title and description required')
  })

  it('Failed create notification by id because user id not found', async () => {
    const notif = {
      title: 'Promo 12.12',
      description: 'Ada promo ada uang',
    }
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .post(`/api/v1/notification/999`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(notif)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('User with id 999 not exist')
  })

  // ntar
  it('Success get all notification', async () => {
    const tokenAdmin = await getTokenAdmin({
      email: 'binar.team.c10@gmail.com',
      password: 'admin123',
    })
    const response = await request(app)
      .get('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch notification')
  })

  it('Failed get all notification because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .get('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get all notification because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .get('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed get all notification because user role not admin', async () => {
    const tokenUser = await getToken({
      email: 'khaled@gmail.com',
      password: 'userkhaled123',
    })
    const response = await request(app)
      .get('/api/v1/notification')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You are not admin, your access to this is blocked',
    )
  })

  it('Failed get all notification because no token', async () => {
    const response = await request(app).get('/api/v1/notification')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success get my notification', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .get('/api/v1/notification/my')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch notification')
  })

  it('Failed get my notification because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .get('/api/v1/notification/my')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed get my notification because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .get('/api/v1/notification/my')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success get my notification', async () => {
    const tokenUser = await getToken({
      email: 'layla@gmail.com',
      password: 'userlayla123',
    })
    const response = await request(app)
      .get('/api/v1/notification/my')
      .set('Authorization', `Bearer ${tokenUser}`)
    const notif = response.body.data[0]
    idNotif2 = notif.id
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, fetch notification')
  })

  it('Failed get my notification because no token', async () => {
    const response = await request(app).get('/api/v1/notification/my')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  // ni
  it('Success mark notification as read by id', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const idNotification = await getIdNotificationToMarkAsReadById(tokenUser)
    const response = await request(app)
      .patch(`/api/v1/notification/my/markasread/${idNotification}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, mark notification as read')
  })

  it('Failed mark notification as read by id because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch('/api/v1/notification/my/markasread/1')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed mark notification as read by id because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .patch('/api/v1/notification/my/markasread/1')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed mark notification as read by id because id not found', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .patch(`/api/v1/notification/my/markasread/999`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed mark notification as read by id because marked notification with id not his own', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const tokenUser2 = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const idNotification = await getIdNotificationToMarkAsReadById(tokenUser2)
    const response = await request(app)
      .patch(`/api/v1/notification/my/markasread/${idNotification}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You only have access to access your notification',
    )
  })

  it('Failed mark as read notification because no token', async () => {
    const tokenUser2 = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const idNotification = await getIdNotificationToMarkAsReadById(tokenUser2)
    const response = await request(app).patch(
      `/api/v1/notification/my/markasread/${idNotification}`,
    )
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Success mark all notification as read', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .patch('/api/v1/notification/my/markallasread')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(
      'Success, mark all the notification as read',
    )
  })

  it('Failed mark all notification as read because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .patch('/api/v1/notification/my/markallasread')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })

  it('Failed mark all notification as read because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .patch('/api/v1/notification/my/markallasread')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Failed mark as read all notification because no token', async () => {
    const response = await request(app).patch(
      '/api/v1/notification/my/markallasread',
    )
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed delete notification by id because deleted not his own', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const tokenUser2 = await getToken({
      email: 'gord@gmail.com',
      password: 'usergord123',
    })
    const idNotification = await getIdNotificationToMarkAsReadById(tokenUser2)
    const response = await request(app)
      .delete(`/api/v1/notification/my/${idNotification}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(
      'You only have access to delete your notification',
    )
  })

  it('Failed delete notification by id because id not found', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const response = await request(app)
      .delete(`/api/v1/notification/my/999`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('id does not exist')
  })

  it('Failed delete notification by id because no token', async () => {
    const response = await request(app).delete('/api/v1/notification/my/2')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No token')
  })

  it('Failed delete notification by id because jwt malformed', async () => {
    const tokenMalformed =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6NywibmFtZSI6ImFkbWluIiiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xl3MDI0NjA3NPeB0iP5KtK97mMc4jzq6poxj9c'
    const response = await request(app)
      .delete('/api/v1/notification/my/2')
      .set('Authorization', `Bearer ${tokenMalformed}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt malformed')
  })
  it('Failed delete notification by id because jwt expired', async () => {
    const tokenExpired =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJiaW5hci50ZWFtLmMxMEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIzNzc1NzksImV4cCI6MTcwMjQ2Mzk3OX0.4eAhzrpoZ9kUnabNdil8YHxkVNa-EnD5iimahZ8ky2g'
    const response = await request(app)
      .delete('/api/v1/notification/my/2')
      .set('Authorization', `Bearer ${tokenExpired}`)
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('jwt expired')
  })

  it('Success delete notification by id', async () => {
    const tokenUser = await getToken({
      email: 'syifa@gmail.com',
      password: 'usersyifa123',
    })
    const idNotification = await getIdNotificationToMarkAsReadById(tokenUser)
    const response = await request(app)
      .delete(`/api/v1/notification/my/${idNotification}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Success, notification deleted')
  })
})
