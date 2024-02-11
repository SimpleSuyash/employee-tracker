const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const departmentRouter = require('./department');
const roleRouter = require('./role');
const employeeRouter = require('./employee');

router.use('/department', departmentRouter);
router.use('/role', roleRouter);
router.use('/employee', employeeRouter);

module.exports = router;