const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
   const accessToken = sign(
      { userName: user.userName, userId: user.userId },
      process.env.SECRET_TOKEN,
      { expiresIn: "2w" }
   );
   return accessToken;
};

const validateToken = (req, res, next) => {
   const accessToken = req.cookies["access-token"];
   if (!accessToken) {
      res.status(401).send({ error: "User Not Authenticated" });
      return;
   }
   try {
      const validToken = verify(accessToken, process.env.SECRET_TOKEN);
      if (validToken) {
         req.authenticated = true;
         return next();
      }
   } catch (err) {
      return res.status(400).send({ error: err });
   }
};

const createAdminToken = (user) => {
   const adminAccessToken = sign(
      { userName: user.userName, userId: user.userId },
      process.env.ADMIN_SECRET_TOKEN,
      { expiresIn: "8h" }
   );
   return adminAccessToken;
};

const validateAdminToken = (req, res, next) => {
   const adminAccessToken = req.cookies["admin-access-token"];
   if (!adminAccessToken) {
      res.status(401).send({ error: "Access Denied" });
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
