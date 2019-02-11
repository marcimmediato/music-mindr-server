import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { request }, info) {
    console.log('ok', request.req.headers);
    const userId = getUserId(request, false);

    if (userId && userId === parent.id) {
      return parent.email;
    } else {
      return null;
    }
  }
};

export { User as default };
