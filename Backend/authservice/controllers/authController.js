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
const user = require('../models/user');
/*const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);*/


exports.signUpController= (req,res)=>{

  const{name, email, password}= req.body;
  const errors=validationResult(req);

  if(!errors.isEmpty()){
    const firstError=errors.array().map(error= error.message)[0];
    return res.status(422).json({
      errors: firstError
    });
  }

  else{

    User.findOne({email})
    .exec((err, user)=>{

      if(user){
        return res.status(400).json({
          errors: "This email is already used!"
        });
      }
    });

    const token = jwt.sign({
      name,
      email,
      password
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {expiresIn: '20m'}
    );

    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: 'ASEDS Social Network',
      to: req.body.email,
      subject: 'Your ASEDS Social Network activation link',
      html: `
                <h1 style='color:#03254c'>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };



    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.status(400).json({
          success: false,
          errors:errorHandler(error)
          
        });
      } else {
        return res.json({
          message: `The verification mail has been sent to your mail: ${email}`
        });
      }
    });

    
  }
};

/*
exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {


    let promise = new Promise(function(resolve, reject) {

      try{
        var decoded=jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
        //tokenVerified=true;
        
        //next();
        return resolve;
      }catch(err){
        return reject;
        /*tokenVerified=false;
        return res.status(401).json({
          error: 'Your activation link is expired! Sign Up again!'
        });*/
     /* }
      
    });

    promise.then(result => {

      
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

      
      

  }).catch(err => {
    return res.status(401).json({
      error: 'Your activation link is expired! Sign Up again!'
    });
  });
     
/*
      try{
      var decoded=jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
      tokenVerified=true;
      
      //next();
      return res.status(200).json(decoded);*/
      

/*
      if(decoded){
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

      }*/


      
      
/*
  
      }catch(err){
        tokenVerified=false;
        return res.status(401).json({
          error: 'Your activation link is expired! Sign Up again!'
        });
      }*/

      
/*
      if(tokenVerified){
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

      }*/

   /*   
    
  } else {
    return res.json({
      message: 'error happening please try again'
    });
  }
};
/*
exports.activationController=(req, res)=>{
    const{token}=req.body;

    if(token){
      jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,

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


}*/


/*
exports.signInController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email and password do not match'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      });
    });
  }
};

*/


exports.signInController=(req,res)=>{

  const {email, password }=req.body;
 
  
  const errors=validationResult(req);

  if(!errors.isEmpty()){
    const firstError=errors.array().map(error= error.message)[0];
    return res.status(422).json({
      errors: firstError
    });
  }

  else {

    User.findOne({email})
    .exec((err,user)=>{

        if(err || !user)
        {
          return res.status(400).json({
            errors: 'This email is incorrect '+
            'or not registred, Please verify it!'
          });
        }

        if(!user.authenticate(password))
        {
         return res.status(400).json({
           message: 'The password you\'ve entered is incorrect!'
         });
        }


        const token=jwt.sign(
           { _id: user._id},
           process.env.JWT_SECRET,
          {expiresIn: '8d'});
          const { _id, name, email, role } = user;
          return res.status(200).json({
            token,
            user:{_id, name, email, role}
          });
    });

  }





};


exports.forgotPasswordController=(req, res)=>{

             const{email}=req.body;
             const errors=validationResult(req);
             if(!errors.isEmpty())
             {
              const firstError=errors.array().map(error= error.message)[0];
              return res.status(422).json({
                errors: firstError
              });
            }

            else
            {
              User.findOne({email}, (err, user)=>{
                 
                if(err || !user)
                 {
                   return res.status(400).json({
                    errors: 'This emial is incorrect '+
                    'or not registred, Please verify it!'
                 });
                }

                const token= jwt.sign({_id:user._is},
                  process.env.JWT_RESET_PASSWORD,{expiresIn:'30m'});

                    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: 'ASEDS Social Network',
      to: req.body.email,
      subject: 'Password Reset Link',
      html: `
                <h1 style='color:#03254c'>Please use the following link to 
                reset your Password</h1>
                <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };



        return user.updateOne({resetPasswordLink: token},
          (err, success)=>{

            if (err) 
            {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'Database connection error on user password forgot request'
              });
            }
            else
            {

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  return res.status(400).json({
                    success: false,
                    errors:errorHandler(error)
                    
                  });
                } else {
                  return res.json({
                    message:`The Password Reset Link has been sent to your mail: ${email}`
                  });
                }
              });

            }

          });



              });
              

            }}


exports.resetPasswordController=(req,res)=>{
  const { resetPasswordLink, newPassword } = req.body;


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }


  else{

    if(resetPasswordLink)
    {
     
        jwt.verify(resetPasswordLink,
           process.env.JWT_RESET_PASSWORD,
           (err, decoded)=>{

            if (err) {
              return res.status(400).json({
                error: 'Your Reset Link has expired. Try agian!'
              });
            }

            User.findOne({resetPasswordLink}, (err, user)=>{
              if(err || !user){
                return res.status(400).json({
                  error:'Something went wrong. Try again!'
                });
              }

              const updatedUser = {
                password: newPassword,
                resetPasswordLink: ''
              };

              user=_.extend(user, updatedUser);
              user.save((err, user)=>{

                if(err){

                  return res.status(400).json({
                    error:'An Error has occured while reseting the Password. Try again later!'
                  })

                }
                else{
                  return res.status(200).json({
                    message: 'Your Password is reseted successfuly. Sign in with your new Password'
                  });
                }

              });
            })

           });
    }


  }

}