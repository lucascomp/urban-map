const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const validator = require('validator');
const { User } = require('./models');
const { sha512 } = require('./utils/crypto');

const {
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
} = process.env;

passport.serializeUser(async ({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    raw: true,
    where: { id },
  });

  done(null, user);
});

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    if (!validator.isEmail(email)) {
      done(new Error('E-mail inválido'));
      return;
    }

    if (password.length < 6) {
      done(new Error('A senha precisa ter no mínimo 6 caracteres'));
      return;
    }

    const user = await User.findOne({
      attributes: ['id', 'passwordHash', 'salt'],
      raw: true,
      where: { email },
    });

    if (!user) {
      done(new Error('Usuário não encontrado'));
      return;
    }

    const {
      passwordHash,
      salt,
    } = user;
    const generatedHash = sha512(password, salt);

    if (generatedHash === passwordHash) {
      done(null, user);
    } else {
      done(new Error('Senha inválida'));
    }
  },
));

const findOrCreateProviderUser = async (provider, profile, done) => {
  try {
    const [user] = await User.findOrCreate({
      attributes: ['id'],
      defaults: {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      },
      raw: true,
      where: {
        [`${provider}Id`]: profile.id,
      },
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

passport.use(new FacebookStrategy(
  {
    clientID: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: '/api/login/facebook/callback',
    profileFields: [
      'id',
      'first_name',
      'last_name',
      'email',
    ],
  },
  async (accessToken, refreshToken, profile, done) => {
    findOrCreateProviderUser('facebook', profile, done);
  },
));

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: '/api/login/google/callback',
  },
  async (request, accessToken, refreshToken, profile, done) => {
    findOrCreateProviderUser('google', profile, done);
  },
));
