const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { message: error.message, status: error.status };
    ctx.app.emit('error', error, ctx);
  }
};

module.exports = {
  errorHandler,
};
