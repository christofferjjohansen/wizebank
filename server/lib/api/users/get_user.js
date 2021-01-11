import db from '../../../db'

const getUserCtor = function({ db }) {
  return async function(id) {
    return db.one(`SELECT * FROM users where id = $id`, { bind: { id } });
  };
}

export default getUserCtor({ db });