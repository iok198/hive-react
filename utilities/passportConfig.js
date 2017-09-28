var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var googPassCred = require('../googPassCred.js')

function extractProfile (profile) {
  var imageUrl = '';
  if (profile.photos && profile.photos[0] && profile.photos[0].value) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    email: profile.emails[0].value,
    image: imageUrl
  };
}

function queryUD(connection,email,done,extracted){
    return function(){
    connection.query("SELECT * FROM hive1718.userDirectory WHERE " +
                            "emailID REGEXP " + "'" + email + 
                            "' OR altEmailStr REGEXP '" + email + "'",
                        function (err,rsl,fds){
                            if(err) throw err
                            if(rsl.length > 0){
                                console.log('rsl: (emailID entryID lastName)')
                                console.log(rsl[0].emailID,rsl[0].entryID,rsl[0].lastName)
                                done(null,rsl[0])
                            } else { done(null,extracted)}
                        }
                    )
    }
}

function strategyConfig(connection){
    passport.use(
        new GoogleStrategy(googPassCred,
            function(accessToken, refreshToken, profile, done) {
                console.log(extractProfile(profile))
                console.log("SELECT * FROM hive1718.userDirectory " +
                            "WHERE emailID REGEXP " + "'" + profile.emails[0].value + 
                            "' OR altEmailStr REGEXP '" + profile.emails[0].value + "'")
                queryUD(connection,profile.emails[0].value,done,extractProfile(profile))()
            }
        )
    )
}

module.exports = {strategyConfig:strategyConfig, passport:passport, queryUD:queryUD}