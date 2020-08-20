const passport = require('koa-passport');
const uuidv4 = require('uuid/v4');
const validator = require('validator');
const transporter = require('../config/transporter');
const { ResetToken, User } = require('../models');
const { generateSalt, sha512 } = require('../utils/crypto');

const { EMAIL_USER, URBAN_MAP_SITE_BASE_URL } = process.env;

const forgotPassword = async (ctx) => {
  const { email } = ctx.request.body;

  if (!validator.isEmail(email)) {
    ctx.throw(400, 'E-mail inválido');
  }

  const user = await User.findOne({
    attributes: ['id', 'firstName'],
    raw: true,
    where: { email },
  });

  if (!user) {
    ctx.throw(400, 'Usuário não encontrado');
  }

  const { id: userId, firstName } = user;

  await ResetToken.update({ expired: true }, {
    where: {
      userId,
      expired: false,
    },
  });

  const token = uuidv4();

  await ResetToken.create({ userId, token });
  try {
    await transporter.sendMail({
      from: `Mapa de Acessibilidade Urbana <${EMAIL_USER}>`,
      to: email,
      subject: 'Redefinir senha',
      text: `Olá, ${firstName}! Recupere sua senha. É muito simples! Clique no link a seguir e defina uma nova senha: ${URBAN_MAP_SITE_BASE_URL}/reset-password?token=${token} `,
    });
  } catch (error) {
    ctx.throw(500, 'Não foi possível enviar o e-mail de redefinição de senha');
  }

  ctx.status = 200;
};

const getUser = (ctx) => {
  const {
    admin,
    email,
    firstName,
    lastName,
  } = ctx.state.user;

  ctx.body = {
    admin,
    email,
    firstName,
    lastName,
  };
};

const login = async (ctx) => passport.authenticate('local', async (err, user) => {
  if (err) {
    ctx.throw(400, 'E-mail e/ou senha incorretos');
  }

  await ctx.login(user);
  ctx.status = 200;
})(ctx);

const loginWithFacebook = (ctx) => passport.authenticate('facebook', {
  scope: ['email'],
})(ctx);

const loginWithGoogle = (ctx) => passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
})(ctx);

const loginCallback = (strategy) => (ctx) => passport.authenticate(strategy, {
  successRedirect: `${URBAN_MAP_SITE_BASE_URL}/home`,
  failureRedirect: `${URBAN_MAP_SITE_BASE_URL}/login`,
})(ctx);

const logout = async (ctx) => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200;
};

const registerAdmin = async (ctx) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = ctx.request.body;

  if (firstName.length < 2) {
    ctx.throw(400, 'Nome inválido');
  }

  if (lastName.length < 2) {
    ctx.throw(400, 'Sobrenome inválido');
  }

  if (!validator.isEmail(email)) {
    ctx.throw(400, 'E-mail inválido');
  }

  if (password.length < 6) {
    ctx.throw(400, 'A senha deve ter pelo menos 6 caracteres');
  }

  const salt = generateSalt(16);
  const passwordHash = sha512(password, salt);

  try {
    const user = await User.create({
      admin: true,
      email,
      firstName,
      lastName,
      passwordHash,
      salt,
    });

    await ctx.login(user);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, 'Este e-mail já está em uso');
  }
};

const resetPassword = async (ctx) => {
  const { token, password } = ctx.request.body;

  if (password.length < 6) {
    ctx.throw(400, 'A senha deve ter pelo menos 6 caracteres');
  }

  const resetToken = await ResetToken.findOne({
    attributes: [],
    include: [{
      attributes: ['id'],
      as: 'user',
      model: User,
    }],
    raw: true,
    where: { token, expired: false },
  });

  if (!resetToken) {
    ctx.throw(400, 'Solicitação de redefinição de senha expirada ou inexistente.');
  }

  const id = resetToken['user.id'];
  const salt = generateSalt(16);
  const passwordHash = sha512(password, salt);

  await User.update({ passwordHash, salt }, { where: { id } });
  await ResetToken.update({ expired: true }, {
    where: {
      userId: id,
      expired: false,
    },
  });

  ctx.status = 200;
};

const signup = async (ctx) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = ctx.request.body;

  if (firstName.length < 2) {
    ctx.throw(400, 'Nome inválido');
  }

  if (lastName.length < 2) {
    ctx.throw(400, 'Sobrenome inválido');
  }

  if (!validator.isEmail(email)) {
    ctx.throw(400, 'E-mail inválido');
  }

  if (password.length < 6) {
    ctx.throw(400, 'A senha deve ter pelo menos 6 caracteres');
  }

  const salt = generateSalt(16);
  const passwordHash = sha512(password, salt);

  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      passwordHash,
      salt,
    });

    await ctx.login(user);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, 'Este e-mail já está em uso');
  }
};

module.exports = {
  forgotPassword,
  getUser,
  login,
  loginWithFacebook,
  loginWithGoogle,
  loginCallback,
  logout,
  registerAdmin,
  resetPassword,
  signup,
};
