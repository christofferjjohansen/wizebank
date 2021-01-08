import sequelize from './models';

export const none = async function(sql, options) {
  await sequelize.query(sql, options)
} 

export const one = async function(sql, options) {
  const resp = await sequelize.query(sql, options)

  if (resp[0].length > 1) throw 'More than 1 row returned'
  else if (resp[0].length === 0) throw 'No rows returned'
  return resp[0][0]
}

export const oneOrNone = async function(sql, options) {
  const resp = await sequelize.query(sql, options)

  if (resp[0].length > 1) throw 'More than 1 row returned'
  return resp[0][0]
}

export const query = async function(sql, options) {
  const resp = await sequelize.query(sql, options)
  return resp[0]
} 

export default {
  none,
  one,
  oneOrNone,
  query
}