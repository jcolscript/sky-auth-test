import User from '../models/User';

class UserController {
  async show(req, res) {
    const { id } = req.params;
    const decodedId = req.userId;

    try {
      const user = await User.findOne({ _id: id });

      const {
        _id,
        name,
        email,
        phones,
        lastLogin,
        createdAt,
        updatedAt,
      } = user;

      if (decodedId !== _id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      user.lastLogin = Date.now();
      await user.save();

      return res.status(200).json({
        _id,
        name,
        email,
        phones,
        lastLogin,
        createdAt,
        updatedAt,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  }

  async store(req, res) {
    try {
      const userData = req.body;
      const isUserAccount = await User.findOne({ email: userData.email });

      if (isUserAccount) {
        return res.status(400).json({
          message: 'E-mail ja existente',
        });
      }

      const {
        _id,
        name,
        email,
        phones,
        lastLogin,
        createdAt,
        updatedAt,
      } = await User.create(userData);

      return res.status(201).json({
        _id,
        name,
        email,
        phones,
        lastLogin,
        createdAt,
        updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}

export default new UserController();
