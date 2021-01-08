import express from 'express';
import db from '../db'
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await db.query(`select * from users`)
    res.send(result);  
  } catch (error) {
    console.log(error)
  }
  
});

export default router;
