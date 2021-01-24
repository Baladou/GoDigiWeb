const User= require('../models/user');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const{OAuth2}= require('google-auth-library');
const fetch= require('node-fetch');
const {validationResult} = require('express-validator');
const jwt= require('jsonwebtoken');


//Vraiables d'environnement
require('dotenv').config();

////errorHandler helps us get useful form of error for database's errors
const {errorHandler}= require('../helpers/dbErrorHandling');

/// sendgrid for sending verification mails
var nodemailer = require('nodemailer');



exports.activationController=(req, res)=>{
    const{token}=req.body;

    const options = {
      //...
      timeout: 5000,
  };

    if(token){
      jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,options,

         (err, decoded)=>{


        if(err){
          return res.status(401).json({
            error: 'Your activation link is expired! Sign Up again!'
          });
        }


  
        else{
  
          const{ name, email, password}= jwt.decode(token);

          var user= new User({ name, email, password});
         

          user.save(
            (err, user)=>{

            if(err){
              return res.status(401).json({
                 errors: errorHandler(err)
  
              });
            }
  
            else{
              return res.status(200).json({
                success:true,
                message: 'You\'ve signed up successfully',
                user
  
              });
            }
          });
  
        }
      });
      
    }

    else{
      return res.status(401)
      .json({
        success: false,
        message: 'Something went wrong! Please try again.'
      })
    }


}