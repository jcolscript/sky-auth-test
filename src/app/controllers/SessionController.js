import User from '../models/User';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: 'Usuário e/ou senha inválidos',
        });
      }

      if (!(await User.comparePassword(password, user.password))) {
        return res.status(401).json({
          message: 'Usuário e/ou senha inválidos',
        });
      }

      const { _id, name, phones, lastLogin, createdAt, updatedAt } = user;

      return res.status(200).json({
        _id,
        name,
        email,
        phones,
        lastLogin,
        createdAt,
        updatedAt,
        token: User.generateToken(_id),
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
        error,
      });
    }
  }
}

export default new SessionController();
