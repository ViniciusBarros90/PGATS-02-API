const userService = require('../service/userService');
const transferService = require('../service/transferService');
const { generateToken } = require('./auth');

module.exports = {
  Query: {
    users: () => userService.getAllUsers(),
    transfers: (parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return transferService.getTransfers();
    },
  },
  Mutation: {
    register: (parent, { username, password, isFavored }) => {
      return userService.registerUser({ username, password, isFavored });
    },
    login: (parent, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = generateToken(user);
      return { user, token };
    },
    transfer: (parent, { from, to, amount }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      // Opcional: garantir que o usuário autenticado é o remetente
      if (context.user.username !== from) throw new Error('Usuário não autorizado para transferir deste remetente');
      return transferService.transfer({ from, to, amount });
    },
  },
};
