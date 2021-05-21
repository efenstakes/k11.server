const jwt = require('jsonwebtoken')

// get a handle to accounts coolection
const accounts = require('../accounts/model')

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      req.is_authenticated = false
      // return
      next()
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const payload = jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET)
      console.debug('payload ', payload)
      const account_result = await accounts.findById(payload.id)

      if( !account_result ) {
        req.is_authenticated = false
        // return
        next()
      }

      const { password, ...user } = account_result
      req.user = user
      
      
      next()
      // return;
    } catch(e) {
      req.is_authenticated = false
      // return
      next()
    }
  };



const generate_access_token = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h', subject: user_id })
}

const generate_refresh_token = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y', subject: user_id })
}


const verify_access_token = (token)=> {
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  return payload.id
}

const verify_refresh_token = (token)=> {
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  return payload.id
}

module.exports = {
  authenticate,

  generate_access_token,
  verify_access_token,
  generate_refresh_token,
  verify_refresh_token,
}