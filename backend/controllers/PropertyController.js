const propertyRepository = require("../repositories/PropertyRepository");
const userRepository = require("../repositories/UserRepository");
const isValidCEP = require('@brazilian-utils/is-valid-cep');
const dateTime = require("node-datetime");
const moment = require('moment');

const getSendableUser = (user) => {
  let sendableUser = {
    userId: user._id.toString(),
    email: user.email,
    username: user.username
  };
  return sendableUser;
};

module.exports = class PropertyController {
  static async getAll(req, res) {
    try {
      const properties = await propertyRepository.getAll();
      if (!properties) {
        res.status(404).json("There are no properties yet!")
      }
      res.send(properties);
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  }

  static async getById(req, res) {
    try {
      let id = req.params.id || {};
      const property = await propertyRepository.getById(id);
      res.send(property);
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  }

  static async getProperties(req, res) {
    try {
      let filter = req.body;
      const properties = await propertyRepository.getProperties(filter);
      res.send({properties: properties});
    } catch (error) {
      res.status(500).json({error: error})
    }
  }

  static async insert(req, res) {
    try {
      if (
        !req.body ||
        !req.body.propertyData ||
        !req.body.propertyData.title ||
        !req.body.propertyData.description ||
        !req.body.propertyData.price  ||
        !req.body.propertyData.area ||
        !req.body.propertyData.address ||
        !req.body.propertyData.number ||
        !req.body.propertyData.neighborhood ||
        !req.body.propertyData.cep ||
        !req.body.propertyData.city ||
        !req.body.propertyData.uf
      ) {
        res.status(400);
        res.send({
          message: "Preencha os campos obrigatórios"
        });
        return;
      }
      
      if (req.body.propertyData.title) {
        if (
          req.body.propertyData.title.length < 3 ||
          req.body.propertyData.title.length > 20
        ) {
          res.status(400);
          res.send({
            message: "O título do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
      }

      if (req.body.propertyData.description) {
        if (
          req.body.propertyData.description.length < 3 ||
          req.body.propertyData.description.length > 20
        ) {
          res.status(400);
          res.send({
            message: "A descrição do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
      }

      if (req.body.propertyData.price) {
        if (
          req.body.propertyData.price < 0
        ) {
          res.status(400);
          res.send({
            message: "O valor do imóvel precisa ser positivo",
          });
          return;
        }
      }

      if (req.body.propertyData.area) {
        if (
          req.body.propertyData.area < 0
        ) {
          res.status(400);
          res.send({
            message: "A área do imóvel precisa ser positiva",
          });
          return;
        }
      }

      if (req.body.propertyData.address) {
        if (
          req.body.propertyData.address.length < 3 ||
          req.body.propertyData.address.length > 50
        ) {
          res.status(400);
          res.send({
            message: "O endereço do imóvel precisa ter pelo menos 3 caracteres e no máximo 50",
          });
          return;
        }
      }

      if (req.body.propertyData.number) {
        if (
          req.body.propertyData.number < 0
        ) {
          res.status(400);
          res.send({
            message: "O número do imóvel precisa ser positivo",
          });
          return;
        }
      }

      if (req.body.propertyData.additionalAddress) {
        if (
          req.body.propertyData.additionalAddress.length > 15
        ) {
          res.status(400);
          res.send({
            message: "O complemento do imóvel pode ter no máximo 15 caracteres",
          });
          return;
        }
      }

      if (req.body.propertyData.neighborhood) {
        if (
          req.body.propertyData.neighborhood.length < 3 ||
          req.body.propertyData.neighborhood.length > 20
        ) {
          res.status(400);
          res.send({
            message: "O bairro do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
      }

      if (req.body.propertyData.cep) {
        if (
          !isValidCEP(req.body.propertyData.cep)
        ) {
          res.status(400);
          res.send({
            message: "O CEP do imóvel está inválido",
          });
          return;
        }
      }

      if (req.body.propertyData.city) {
        if (
          req.body.propertyData.city.length < 3 ||
          req.body.propertyData.city.length > 20
        ) {
          res.status(400);
          res.send({
            message: "A cidade do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
      }

      if (req.body.propertyData.uf) {
        if (
          req.body.propertyData.uf.length !== 2
        ) {
          res.status(400);
          res.send({
            message: "A UF do imóvel está inválida",
          });
          return;
        }
      }

      let user = await userRepository.getById(req.userId);
      user = getSendableUser(user);

      let propertyTitle = req.body.propertyData.title;
    
      propertyRepository.getByTitle(propertyTitle).then((existingProperty) => {
        if (existingProperty) {
          res.status(409);
          res.send({ message: "Este imóvel já está cadastrado" });
          return;
        } else {
          let property = {
            title: req.body.propertyData.title,
            description: req.body.propertyData.description,
            price: req.body.propertyData.price,
            area: req.body.propertyData.area,
            address: req.body.propertyData.address,
            number: req.body.propertyData.number,
            additionalAddress: req.body.propertyData.additionalAddress,
            neighborhood: req.body.propertyData.neighborhood,
            cep: req.body.propertyData.cep,
            city: req.body.propertyData.city,
            uf: req.body.propertyData.uf,
            publicationDate: moment().format(),
            user: user,
            createdAt: dateTime.create()
          };
    
          propertyRepository.insert(property).then(() => {
            res.status(200);
            res.send({
              message: "Novo imóvel cadastrado com sucesso!",
            });
          });
        }
      });

    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  }

  static async edit(req, res) {
    try {
      if (!req.body || !req.body.updateData) {
        res.status(400);
        res.send({
          message: "Preencha os campos obrigatórios!"
        });
        return;
      }

      let updateData = req.body.updateData;
      let propertyId = req.body.updateData._id;
      
      let existingProperty = await propertyRepository.getById(propertyId);
      
      if (!existingProperty) {
        res.status(404);
        res.send({ message: "Imóvel não encontrado" });
        return;
      }
      
      if (updateData.title && updateData.title != existingProperty.title) {
        if (
          updateData.title.length < 3 ||
          updateData.title.length > 20
        ) {
          res.status(400);
          res.send({ message: "Título inválido" });
          return;
        } else {
          let propertyWithSameTitle = await propertyRepository.getByTitle(
            updateData.title
          );
      
          if (propertyWithSameTitle) {
            res.status(409);
            res.send({ message: "Já existe um imóvel com este título" });
            return;
          }
        }
        existingProperty.title = updateData.title;
      }
      
      if (updateData.description) {
        if (
          updateData.description.length < 3 ||
          updateData.description.length > 20
        ) {
          res.status(400);
          res.send({
            message: "A descrição do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
        existingProperty.description = updateData.description;
      }

      if (updateData.price) {
        if (
          updateData.price < 0
        ) {
          res.status(400);
          res.send({
            message: "O valor do imóvel precisa ser positivo",
          });
          return;
        }
        existingProperty.price = updateData.price;
      }

      if (updateData.area) {
        if (
          updateData.area < 0
        ) {
          res.status(400);
          res.send({
            message: "A área do imóvel precisa ser positiva",
          });
          return;
        }
        existingProperty.area = updateData.area;
      }

      if (updateData.address) {
        if (
          updateData.address.length < 3 ||
          updateData.address.length > 50
        ) {
          res.status(400);
          res.send({
            message: "O endereço do imóvel precisa ter pelo menos 3 caracteres e no máximo 50",
          });
          return;
        }
        existingProperty.address = updateData.address;
      }

      if (updateData.number) {
        if (
          updateData.number < 0
        ) {
          res.status(400);
          res.send({
            message: "O número do imóvel precisa ser positivo",
          });
          return;
        }
        existingProperty.number = updateData.number;
      }
      
      if (updateData.additionalAddress) {
        if (
          updateData.additionalAddress.length > 15
        ) {
          res.status(400);
          res.send({
            message: "O complemento do imóvel pode ter no máximo 15 caracteres",
          });
          return;
        }
        existingProperty.additionalAddress = updateData.additionalAddress;
      }

      if (updateData.neighborhood) {
        if (
          updateData.neighborhood.length < 3 ||
          updateData.neighborhood.length > 20
        ) {
          res.status(400);
          res.send({
            message: "O bairro do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
        existingProperty.neighborhood = updateData.neighborhood;
      }

      if (updateData.cep) {
        if (
          !isValidCEP(updateData.cep)
        ) {
          res.status(400);
          res.send({
            message: "O CEP do imóvel está inválido",
          });
          return;
        }
        existingProperty.cep = updateData.cep;
      }

      if (updateData.city) {
        if (
          updateData.city.length < 3 ||
          updateData.city.length > 20
        ) {
          res.status(400);
          res.send({
            message: "A cidade do imóvel precisa ter pelo menos 3 caracteres e no máximo 20",
          });
          return;
        }
        existingProperty.city = updateData.city;
      }

      if (updateData.uf) {
        if (
          updateData.uf.length !== 2
        ) {
          res.status(400);
          res.send({
            message: "A UF do imóvel está inválida",
          });
          return;
        }
        existingProperty.uf = updateData.uf;
      }
      
      await propertyRepository.updateOne(existingProperty);
      
      res.status(200);
      res.send({ message: "Imóvel modificado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  }

  static async removeById(req, res) {
    try {
      if (!req.params.id) {
        res.status(400);
        res.send({ message: "Informe o ID do imóvel!" });
        return;
      }

      let propertyId = req.params.id;
  
      propertyRepository.getById(propertyId).then((existingProperty) => {
        if (existingProperty) {
          propertyRepository.removeById(propertyId).then(() => {
            res.status(200);
            res.send({ message: "Imóvel removido com sucesso!" });
          });
        } else {
          res.status(400);
          res.send({ message: "Este imóvel não está cadastrado" });
        }
      });
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}