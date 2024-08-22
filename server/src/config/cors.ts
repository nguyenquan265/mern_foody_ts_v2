import { CorsOptions } from 'cors'
import { WHITELIST_DOMAINS } from '../utils/constants'
import ApiError from '~/utils/ApiError'

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin as string)) {
      return callback(null, true)
    }

    throw new ApiError(403, `${origin} not allowed by our CORS Policy.`)
  },

  optionsSuccessStatus: 200,
  credentials: true
}

export default corsOptions
