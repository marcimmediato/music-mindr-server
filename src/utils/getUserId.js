import jwt from 'jsonwebtoken';

const getUserId = request => {
  const authHeader = request.request.headers.authorization;

  if (!authHeader) {
    throw new Error('Authentication required');
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'lkjfds3589@ds98341!l*dast');
  return decoded.userId;
};

export { getUserId as default };
