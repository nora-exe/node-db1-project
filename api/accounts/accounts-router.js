const router = require('express').Router()
const midware = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
      next(err)
  }
});

router.get('/:id', midware.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    res.json(account)
  } catch (err) {
      next(err)
  }
});

router.post(
  '/',
  midware.checkAccountPayload,
  midware.checkAccountNameUnique,
  async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
      next(err)
  } 
});

router.put(
  '/:id',
  midware.checkAccountId,
  midware.checkAccountPayload,
  midware.checkAccountNameUnique,
  (req, res, next) => {
  // DO YOUR MAGIC
  try {

  } catch (err) {
      next(err)
  } 
});

router.delete('/:id', midware.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
      next(err)
  } 
});

// handle error
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  })
});

module.exports = router;
