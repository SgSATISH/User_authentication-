const LocalStrategy = require('passport-local').Strategy;
const Usermodel = require('../Satish_auth/models/User.model')
exports.initializePassport=(passport)=>{
    passport.use(
        new LocalStrategy(
      
          async (email, password, done) => {
            try {
              const user = await Usermodel.findOne({ email });
      
              if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
              }
      
              const isValidPassword = await bcrypt.compare(password, user.password);
              if (!isValidPassword) {
                return done(null, false, { message: 'Invalid credentials' });
              }
      
              return done(null, user);
            } catch (err) {
              return done(err);
            }
          }
        )
      );
      
      passport.serializeUser((user, done) => {
        done(null, user._id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await Usermodel.findById(id);
          done(null, user);
        } catch (err) {
          done(err);
        }
      });

}



  
