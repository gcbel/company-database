/* DEPENDENCIES */
const router = require('express').Router();

const deptsRouter = require('./departments'); 
const rolesRouter = require('./roles'); 
const employeesRouter = require('./employees'); 

/* ROUTES */
router.use('/departments', deptsRouter);
router.use('/roles', rolesRouter);
router.use('/employees', employeesRouter);

module.exports = router;