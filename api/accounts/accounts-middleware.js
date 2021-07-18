const Account = require('./accounts-model');

/**
  - If either name or budget are undefined, return `{ message: "name and budget are required" }`
  - If name is not a string, return `{ message: "name of account must be a string" }`
  - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
  - If budget is not a number, return `{ message: "budget of account must be a number" }`
  - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`
*/
exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const {name, budget} = req.body
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
    next(error)
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    next(error)    
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  } else next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('some kinda middleware is active here');

  next()

}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found'})
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    next(err)
  }
}
