import { Router } from 'express';
import validateRequestParams from '../validations/validateRequestParams.validation';
import { AdapterRoute } from '../adapters/express.adapter';
import { authorize } from '../validations/authorize.validation';
import { tokenTypes } from '../../domain/enums/token.enum';
import * as userValidation from '../validations/userRequestParams.validation';

import {
  makeGetAllUserFactorie,
  makeGetOneUserFactorie,
  makeVerifyUserEmailFactorie,
  makeUpdateUserFactorie,
  makeDeleteUserFactorie,
  makeRegisterUserFactorie,
} from '../factories/user.factorie';

export default (router: Router): void => {
  router
    .route('/users/')
    .get(
      [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.getUsers)],
      AdapterRoute(makeGetAllUserFactorie())
    );

  router
    .route('/users/:userId')
    .get(
      [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.getUser)],
      AdapterRoute(makeGetOneUserFactorie())
    )
    .patch([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.updateUser)], AdapterRoute(makeUpdateUserFactorie()))
    .delete([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.deleteUser)], AdapterRoute(makeDeleteUserFactorie()));

  router
    .route('/signup/')
    .post([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.createUser)], AdapterRoute(makeRegisterUserFactorie()));

  router.route('/verify-user/').get([validateRequestParams(userValidation.verifyUserEmail)], AdapterRoute(makeVerifyUserEmailFactorie()));
};