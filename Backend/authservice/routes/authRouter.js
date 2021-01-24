const express = require('express');
const authRouter = express.Router();


const {
    signUpController,
    signInController,
    forgotPasswordController,
    resetPasswordController
   
} = require('../controllers/authController');

const {activationController}=require('../controllers/activationController');

const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../helpers/validator')
//sign-up
authRouter.route('/sign-up')
.post(signUpValidator, signUpController);
//account activation
authRouter.route('/activate-account')
.post(activationController);
authRouter.route('/sign-in')
.post(signInValidator, signInController);
authRouter.route('/forget-password')
.post(forgotPasswordValidator, forgotPasswordController);
authRouter.route('/reset-password')
.post( resetPasswordValidator, resetPasswordController)


module.exports = authRouter;