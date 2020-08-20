const restrictedSession = async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401, 'Usuário não logado');
  }

  await next();
};

module.exports = {
  restrictedSession,
};
