const {sign, verify} = require('jsonwebtoken')

const createToken = (user)=>{
     const accessToken = sign({userName: user.userName, userId: user.userId}, process.env.SECRET_TOKEN, {expiresIn: '2w'})
     return accessToken
}

const validateToken = (req, res, next)=>{
     const accessToken = req.cookies["access-token"];
     if (!accessToken) {
          res.status(400).send({ error: "User Not Authenticated" });
          return;
     }    
     try{
          const validToken = verify(accessToken, process.env.SECRET_TOKEN)
          if (validToken) {
               req.authenticated = true;
               req.body.userId = accessToken.userId;
               return next()
          }
     }catch(err){
          return res.status(400).send({error: err})
     }
}

const createAdminToken = (user) =>{
     const adminAccessToken = sign({userName: user.userName, userId: user.userId}, process.env.ADMIN_SECRET_TOKEN ,{ expiresIn: '1d'})
     return adminAccessToken
}

const validateAdminToken = (req, res, next) => {
   const adminAccessToken = req.cookies["admin-access-token"];
   if (!adminAccessToken) {
      res.status(400).send({ error: "Access Denied" });
      return;
   }
   try {
      const validToken = verify(
         adminAccessToken,
         process.env.ADMIN_SECRET_TOKEN
      );
      if (validToken) {
         req.authenticated = true;
         return next();
      }
   } catch (err) {
      return res.status(400).send({ error: err });
   }
};



module.exports = {
   createToken,
   validateToken,
   createAdminToken,
   createAdminToken,
   validateAdminToken,
};