const router = require('express').Router()
const midware = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {

  } catch (err) {
      next(err)
  }
});

router.get('/:id', midware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {

  } catch (err) {
      next(err)
  } 
});

router.post(
  '/',
  midware.checkAccountPayload,
  midware.checkAccountNameUnique,
  (req, res, next) => {
  // DO YOUR MAGIC
  try {

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

router.delete('/:id', midware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {

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
