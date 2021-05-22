const jwt = require('jsonwebtoken')


// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
    // console.log('\n\n\n')
    // console.log('req.headers.authorization')
    // console.log(req.headers.authorization)
    // console.log('\n\n\n')
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      req.is_authenticated = false
      req.user = null
      // console.log('no authorization')
      next()
      return
    }
    
    // console.log('yes authorization')

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const payload = jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET)
      console.debug('payload ', payload)
      // const account_result = await accounts_model.findById(payload.id)

      if( !payload ) {
        req.is_authenticated = false
        req.user = null
        next()
        return
      }

      const { password, ...user } = payload
      req.is_authenticated = true
      req.user = user
            
      next()
      return
    } catch(e) {
      req.is_authenticated = false
      req.user = null
      next()
      return
    }
};


// authenticate staff
const authenticate_staff = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    req.is_authenticated = false
    req.user = null
    next()
    return
  }

  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const payload = jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET)
    console.debug('payload ', payload)
    // const account_result = await staff_model.findById(payload.id)

    if( !payload ) {
      req.is_authenticated = false
      req.user = null
      next()
      return
    }

    const { password, ...user } = payload
    req.is_authenticated = true
    req.user = user
          
    next()
    return
  } catch(e) {
    req.is_authenticated = false
    req.user = null
    next()
    return
  }
};



const generate_access_token = (account) => {
  return jwt.sign({ ...account }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h', subject: user_id })
}

const generate_refresh_token = (account) => {
  return jwt.sign({ ...account }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y', subject: user_id })
}


const verify_access_token = (token)=> {
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  return payload
}

const verify_refresh_token = (token)=> {
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  return payload
}

module.exports = {
  authenticate,
  authenticate_staff,

  generate_access_token,
  verify_access_token,
  generate_refresh_token,
  verify_refresh_token,
}