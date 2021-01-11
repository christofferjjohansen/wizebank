import express from 'express';
import usersRoutes from './users_routes'

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

usersRoutes(router);

export default router;
