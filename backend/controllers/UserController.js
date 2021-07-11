const userRepository = require("../repositories/UserRepository");
const security = require("../security");
const dateTime = require("node-datetime");
const jwt = require('jsonwebtoken');

module.exports = class UserController {
  static async auth(req, res) {
    try {
      if (
        !req.body ||
        !req.body.signinData ||
        !req.body.signinData.email ||
        !req.body.signinData.key
      ) {
        res.status(400);
        res.send();
        return;
      }
    
      let userEmail = req.body.signinData.email.toLowerCase();
    
      userRepository.getByEmail(userEmail).then((existingUser) => {
        if (!existingUser) {
          res.status(404);
          res.send();
          return;
        } else if (
          !security.matchPassword(
            req.body.signinData.key,
            existingUser.password
          )
        ) {
          res.status(404);
          res.send();
          return;
        } else {
          const token = jwt.sign({ id: existingUser._id }, process.env.SECRET, {
            expiresIn: 1800 // 30min
          });
          return res.json({ auth: true, token: token });
        }
      });
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async getAll(req, res) {
    try {
      const users = await userRepository.getAll();
      if(!users){
        res.status(404).json("There are no users yet!")
      }
      res.send(users);
    } catch (error) {
      res.status(500).json({error: error})
    }
  }

  static async getById(req, res) {
    try {
      let id = req.params.id || {};
      const user = await userRepository.getById(id);
      res.send(user);
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async insert(req, res) {
    try {
      if (
        !req.body ||
        !req.body.signupData ||
        !req.body.signupData.email ||
        !req.body.signupData.password ||
        !req.body.signupData.username ||
        !req.body.signupData.phone
      ) {
        res.status(400);
        res.send({ message: "Preencha os campos obrigatórios" });
        return;
      }
    
      if (
        req.body.signupData.email
      ) {
        if (
          req.body.signupData.email.length < 4 ||
          req.body.signupData.email.indexOf("@") < 0 ||
          req.body.signupData.email.indexOf(".") < 0
        ) {
          res.status(400);
          res.send({ message: "Email inválido" });
          return;
        }
      }
    
      if (req.body.signupData.username) {
        if (
          req.body.signupData.username.length < 5 ||
          req.body.signupData.username.length > 15
        ) {
          res.status(400);
          res.send({
            message: "O usuário precisa ter pelo menos 5 caracteres e no máximo 15",
          });
          return;
        }
      }
    
      if (req.body.signupData.password) {
        if (
          req.body.signupData.password.length < 6 ||
          req.body.signupData.password.length > 12
        ) {
          res.status(400);
          res.send({
            message: "A senha precisa ter pelo menos 6 caracteres e no máximo 12",
          });
          return;
        }
      }
    
      if (req.body.signupData.phone) {
        if (
          req.body.signupData.phone.length < 1 ||
          req.body.signupData.phone.length > 15
        ) {
          res.status(400);
          res.send({ message: "Telefone inválido" });
          return;
        }
      }
    
      let userEmail = req.body.signupData.email.replace(/\s/g, "");
    
      userRepository.getByEmail(userEmail).then((existingUser) => {
        if (existingUser) {
          res.status(409);
          res.send({ message: "Este email já está cadastrado" });
          return;
        } else {
          let user = {
            email: userEmail,
            password: security.encryptPassword(
              req.body.signupData.password
            ),
            username: req.body.signupData.username,
            phone: req.body.signupData.phone,
            createdAt: dateTime.create(),
          };
    
          userRepository.insert(user).then(() => {
            res.status(200);
            res.send({
              message: "Novo usuário cadastrado com sucesso!",
            });
          });
        }
      });
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async edit(req, res) {
    try {
      if (!req.body || !req.body.updateData) {
        res.status(400);
        res.send({ message: "Preencha os campos obrigatórios!" });
        return;
      }
      
      let updateData = req.body.updateData;
      
      let userId = req.body.updateData._id;
      
      let existingUser = await userRepository.getById(userId);
      
      if (!existingUser) {
        res.status(404);
        res.send({ message: "Usuário não encontrado" });
        return;
      }
      
      if (updateData.email && updateData.email != existingUser.email) {
        if (
          updateData.email.length < 4 ||
          updateData.email.indexOf("@") < 0 ||
          updateData.email.indexOf(".") < 0
        ) {
          res.status(400);
          res.send({ message: "Email inválido" });
          return;
        } else {
          let userWithSameEmail = await userRepository.getByEmail(
            updateData.email
          );
      
          if (userWithSameEmail) {
            res.status(409);
            res.send({ message: "Já existe um usuário com este email" });
            return;
          }
        }
        existingUser.email = updateData.email;
      }
      
      if (updateData.username) {
        existingUser.username = updateData.username;
      }
      
      if (updateData.changePassword) {
        if (updateData.password) {
          if (updateData.password < 6) {
            res.status(400);
            res.send({
              message: "A senha precisa ter pelo menos 6 caracteres",
            });
            return;
          }
      
          if (
            !security.matchPassword(
              updateData.oldPassword,
              existingUser.password
            )
          ) {
            res.status(404);
            res.send({
              message: "Cheque a senha atual e tente novamente",
            });
            return;
          }
      
          existingUser.password = security.encryptPassword(
            updateData.password
          );
        }
      }
      
      await userRepository.updateOne(existingUser);
      
      res.status(200);
      res.send({ message: "Usuário modificado com sucesso!" });
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async removeById(req, res) {
    try {
      if (!req.params.id) {
        res.status(400);
        res.send({ message: "Informe o ID do usuário!" });
        return;
      }
  
      let userId = req.params.id;
  
      userRepository.getById(userId).then((existingUser) => {
        if (existingUser) {
          userRepository.removeById(userId).then(() => {
            res.status(200);
            res.send({ message: "Usuário removido com sucesso!" });
          });
        } else {
          res.status(400);
          res.send({ message: "Este usuário não está cadastrado" });
        }
      });
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}
