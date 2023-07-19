const EstablishmentModel = require('../models/establishment.model');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const initEstablishment = EstablishmentModel(sequelize, Sequelize);
sequelize.sync()
  .then(() => console.log('Tables has been created successfully.'))
  .catch(error => console.error('Unable to create tables:', error));

class EstablishmentController {
  async createEstablishment(req, res) {
    const { establishment_name, painting_data } = req.body;
    if (!establishment_name) {
      return res.status(400).json({ message: 'Отсутствует название заведения' });
    }
    try {
      const establishment = await initEstablishment.create({
        establishment_name,
        painting_data
      });
      if (!establishment) {
        res.status(500).json({ message: 'Не удалось создать заведение' });
      } else {
        res.json({ message: 'Заведение создано', establishment });
      }
    } catch (error) {
      console.error('Произошла ошибка при создании заведения:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании заведения' });
    }
  }

  async getEstablishments(req, res) {
    try {
      const establishments = await initEstablishment.findAll();
      res.json({ establishments });
    } catch (error) {
      console.error('Произошла ошибка при получении заведений:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении заведений' });
    }
  }

  async getEstablishment(req, res) {
    const establishmentId = req.params.id;

    try {
      const establishment = await initEstablishment.findOne({
        where: { id: establishmentId },
      });

      if (!establishment) {
        res.status(404).json({ message: 'Заведение не найдено' });
      } else {
        res.json({ establishment });
      }
    } catch (error) {
      console.error('Произошла ошибка при получении заведения:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении заведения' });
    }
  }

  async updateEstablishment(req, res) {
    const establishmentId = req.params.id;
    const { establishment_name, painting_data } = req.body;

    try {
      const [updatedCount, updatedEstablishments] = await initEstablishment.update(
        {
          establishment_name,
          painting_data
        },
        {
          where: { id: establishmentId },
          returning: true
        }
      );

      if (updatedCount === 0) {
        res.status(404).json({ message: 'Заведение не найдено' });
      } else {
        res.json({ message: 'Заведение успешно обновлено', establishment: updatedEstablishments[0] });
      }
    } catch (error) {
      console.error('Произошла ошибка при обновлении заведения:', error);
      res.status(500).json({ message: 'Произошла ошибка при обновлении заведения' });
    }
  }

  async deleteEstablishment(req, res) {
    const establishmentId = req.params.id;

    try {
      const deletedEstablishment = await initEstablishment.destroy({
        where: { id: establishmentId }
      });

      if (deletedEstablishment === 0) {
        res.status(404).json({ message: 'Заведение не найдено' });
      } else {
        res.json({ message: 'Заведение успешно удалено' });
      }
    } catch (error) {
      console.error('Произошла ошибка при удалении заведения:', error);
      res.status(500).json({ message: 'Произошла ошибка при удалении заведения' });
    }
  }
}

module.exports = new EstablishmentController();