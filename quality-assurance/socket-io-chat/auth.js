const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, myDataBase) {
  /*
  This is called after authentication succeeds upon a login request. After authentication succeeds, a session
  will be established and maintained via a cookie in the user's browser. 

  Each subsequent request will not contain credentials but instead the unique cookie identifies the session. 
  Serialize determines what information gets stored in the session, in this case it's user._id, which is the _id
  key in mongoDB database. 

  This ID will be used to get the user obejct from the database, which will be stored in req.user. 
  */
  passport.serializeUser((user, done) => {
      done(null, user._id);
  });

  /*
  Called on subsequent requests to retrieve the user object and store it in req.user. 
  */
  passport.deserializeUser((id, done) => {
      myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
          if (err) return console.error(err);
          done(null, doc);
      });
  });

  /*
  This is the authentication strategy that is run before serializing the user. 
  Basically check if the username is in the db and the passwords match, then return the user object to serialize it. 
  */
  passport.use(new LocalStrategy((username, password, done) => {
    myDataBase.findOne({ username: username }, (err, user) => {
      console.log(`User ${username} attempted to log in.`);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { 
          return done(null, false);
      }
      return done(null, user);
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://volunteer-construct-collecting-artistic.trycloudflare.com/auth/github/callback"
  },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        myDataBase.findOneAndUpdate(
            { id: profile.id },
            {
              $setOnInsert: {
                id: profile.id,
                username: profile.username,
                name: profile.displayName || 'John Doe',
                photo: profile.photos[0].value || '',
                email: Array.isArray(profile.emails)
                  ? profile.emails[0].value
                  : 'No public email',
                created_on: new Date(),
                provider: profile.provider || ''
              },
              $set: {
                last_login: new Date()
              },
              $inc: {
                login_count: 1
              }
            },
            { upsert: true, new: true },
            (err, doc) => {
              return cb(null, doc.value); // send for serialization
            }
          );
    }));
}