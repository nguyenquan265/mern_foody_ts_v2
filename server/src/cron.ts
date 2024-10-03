import { CronJob } from 'cron'
import https, { RequestOptions } from 'https'
import http, { RequestOptions as HttpRequestOptions } from 'http'
import env from './config/env'

let job: CronJob

if (env.nodeEnv === 'production') {
  job = new CronJob('*/14 * * * *', function () {
    const options: RequestOptions = {
      method: 'GET',
      hostname: 'mern-foody-ts-v2-backend.onrender.com',
      path: '/api/v1/check'
    }

    https
      .request(options, (res) => {
        if (res.statusCode === 200) {
          console.log('GET request sent successfully')
        } else {
          console.log('GET request failed', res.statusCode)
        }
      })
      .on('error', (e) => {
        console.error('Error while sending request', e)
      })
      .end()
  })
} else {
  job = new CronJob('*/14 * * * *', function () {
    const options: HttpRequestOptions = {
      method: 'GET',
      hostname: 'mern-foody-ts-v2-backend.onrender.com',
      path: '/api/v1/check'
    }

    http
      .request(options, (res) => {
        if (res.statusCode === 200) {
          console.log('GET request sent successfully')
        } else {
          console.log('GET request failed', res.statusCode)
        }
      })
      .on('error', (e) => {
        console.error('Error while sending request', e)
      })
      .end()
  })
}

export default job
