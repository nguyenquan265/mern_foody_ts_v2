import { CronJob } from 'cron'
import https from 'https'
import http from 'http'
import env from './config/env'

const URL = 'https://mern-foody-ts-v2-backend.onrender.com/api/v1/check'
let job: CronJob

if (env.nodeEnv === 'production') {
  job = new CronJob('*/14 * * * *', function () {
    https
      .get(URL, (res) => {
        if (res.statusCode === 200) {
          console.log('GET request sent successfully')
        } else {
          console.log('GET request failed', res.statusCode)
        }
      })
      .on('error', (e) => {
        console.error('Error while sending request', e)
      })
  })
} else {
  job = new CronJob('*/14 * * * *', function () {
    http
      .get(URL, (res) => {
        if (res.statusCode === 200) {
          console.log('GET request sent successfully')
        } else {
          console.log('GET request failed', res.statusCode)
        }
      })
      .on('error', (e) => {
        console.error('Error while sending request', e)
      })
  })
}

export default job
