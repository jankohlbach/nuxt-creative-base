export const throw404 = () => {
  throw createError({
    statusCode: 404,
    message: 'Page not found.',
    fatal: true,
  })
}
