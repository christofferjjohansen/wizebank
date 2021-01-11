import { index, show } from '../controllers/users_controller';

export function usersRoutes(router) {
  router.get('/users', index);
  router.get('/users/:id', show);
};

export default usersRoutes;