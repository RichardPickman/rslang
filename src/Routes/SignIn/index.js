const router = require('express').Router();
const { OK } = require('http-status-codes');

const userService = require('../../Services/Users');

router.route('/').post(async (req, res) => {
  const auth = await userService.authenticate(req.body);

  res.status(OK).json({
    message: 'Authenticated',
    ...auth
  });
});

module.exports = router;
