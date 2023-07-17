const ReservationModel = require('../models/reservation.model');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const initReservation = ReservationModel(sequelize, Sequelize);

class ReservationController {
  async createReservation(req, res) {
    const {
      client_name,
      client_phone,
      table_number,
      reservation_start_time,
      reservation_end_time,
      number_of_people,
      client_comment
    } = req.body;

    try {
      if (!client_name || !client_phone || !table_number || !reservation_start_time || !reservation_end_time || !number_of_people) {
        return res.status(400).json({ message: 'Недостаточно данных для бронирования' });
      }

      const existingReservation = await initReservation.findOne({
        where: {
          table_number,
          [Sequelize.Op.or]: [
            {
              reservation_start_time: {
                [Sequelize.Op.between]: [reservation_start_time, reservation_end_time]
              }
            },
            {
              reservation_end_time: {
                [Sequelize.Op.between]: [reservation_start_time, reservation_end_time]
              }
            }
          ]
        }
      });

      if (existingReservation) {
        return res.status(400).json({ message: 'Столик уже забронирован в указанном временном диапазоне' });
      }

      const reservation = await initReservation.create({
        client_name,
        client_phone,
        table_number,
        reservation_start_time,
        reservation_end_time,
        number_of_people,
        client_comment
      });
      res.json({ message: 'Столик успешно забронирован', reservation });
    } catch (error) {
      console.error('Произошла ошибка при бронировании стола:', error);
      res.status(500).json({ message: 'Произошла ошибка при бронировании стола' });
    }
  }

  async getReservations(req, res) {
    const { reservation_time } = req.query;

    try {
      const startTime = new Date(reservation_time);
      const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);
      const reservations = await initReservation.findAll({
        where: {
          [Sequelize.Op.and]: [
            {
              reservation_start_time: {
                [Sequelize.Op.between]: [startTime, endTime]
              }
            },
            {
              reservation_end_time: {
                [Sequelize.Op.gte]: startTime
              }
            }
          ]
        }
      });
      res.json({ reservations });
    } catch (error) {
      console.error('Ошибка при получении забронированных столиков:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении забронированных столиков' });
    }
  }

  async deleteReservation(req, res) {
    const id = req.params.id;
    try {
      const reservation = await initReservation.findOne({ where: { id } });
      if (!reservation) {
        return res.status(404).json({ message: 'Бронь не найдена' });
      }
      await reservation.destroy();

      res.json({ message: 'Бронь успешно удалена' });
    } catch (error) {
      console.error('Произошла ошибка при удалении брони:', error);
      res.status(500).json({ message: 'Произошла ошибка при удалении брони' });
    }
  }
}

module.exports = new ReservationController();