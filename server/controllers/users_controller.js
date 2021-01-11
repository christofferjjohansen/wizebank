import getAllUsers from '../lib/api/users/get_all_users';
import getUser from '../lib/api/users/get_user';

export const index = async function(req, res) {
  try {
    const resp = await getAllUsers();
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}

export const show = async function(req, res) {
  const { id } = req.params;

  try {
    const resp = await getUser(id);
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}