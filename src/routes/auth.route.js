const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { middlewares } = require("../middlewares/middlewares");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// protected routes
router.post("/profile", middlewares.requireSignin, (_, res) => {
  res.status(200).json({ message: "User profile." });
});

module.exports = router;

/* 

PSEDUO CODE: SIGNIN

IF user signin
    API call to get user data
    IF user found
      Assign data to variables
      Re-route user to home
    END
      Log user not regietered
    ENDIF
ELSE
    Log bad login attempt
    Show error message
    Clear login form
ENDIF
    
*/

/* 

PSEDUO CODE: SIGNUP

IF user signup
    API call to get user data
    IF user not found
      save user to databaase
      Re-route user to home
    END
      Log user already regietered
    ENDIF
ELSE
    Log bad login attempt
    Show error message
    Clear login form
ENDIF
    
*/

/* 

PSEDUO CODE: ORDER

IF order
    IF user signedin
      API call to get user data
      route to cart
      confirm order and route to payments
      
      IF payment success
        place order
        save order to database
        Re-route user to orders page
      ELSE
        Log payment failure
      ENDIF
    ELSE  
      Log user not regietered
      redirect to login page
    ENDIF
ENDIF
    
*/

/* 

PSEDUO CODE: CHATBOT 

IF message
  API call to chatbot
  chatbot AI processes the message and sends response
  redirect to login page
ENDIF
    
*/
