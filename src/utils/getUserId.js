import jwt from 'jsonwebtoken';

const getUserId = (request, authRequired = true) => {
  const authHeader = request.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'lkjfds3589@ds98341!l*dast');
    return decoded.userId;
  }

  if (authRequired) {
    throw new Error('Authentication required');
  }

  return null;
};

export { getUserId as default };
