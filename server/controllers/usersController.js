
const signup = (req, res) => {
     try {
          res.send("/signup");
     } catch (err) {
          res.status(500).send(err);
     }
};

module.exports = { signup };
