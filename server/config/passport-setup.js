const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('../model/index.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const googleId = user.rows[0].google_id;
  db.query(`select * from UserTable where google_id = '${googleId}'`)
    .then((user) => {
      done(null, user);
    });
});


passport.use(
  new GoogleStrategy({
    callbackURL: '/api/auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  }, (accessToken, refreshToken, profile, done) => { 
    const { id, displayName } = profile;

    db.query(`select google_id from UserTable where google_id = '${id}'`)
      .then((user) => {
        if (user.rows.length === 1) {
          // WE have the user in the db
          done(null, user);
        } else {
          db.query(`INSERT INTO UserTable (user_name, google_id)
          VALUES ('${displayName}', '${id}')`)
            .then((newUser) => done(null, newUser));
        }
      });
  },
  )
);