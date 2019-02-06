import jwt from 'jsonwebtoken';

const generateToken = userId => {
  return jwt.sign({ userId }, 'lkjfds3589@ds98341!l*dast', { expiresIn: '7d' });
};

export { generateToken as default };
