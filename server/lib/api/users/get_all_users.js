import db from '../../../db'

const getAllUsersCtor = function({ db }) {
  return async function() {
    return await db.query(`SELECT * FROM users;`)
  };
}

export default getAllUsersCtor({ db })