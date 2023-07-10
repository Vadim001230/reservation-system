module.exports = (sequelize, Sequelize) => {
  const ReservationModel = sequelize.define('reservations', {
    client_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    client_phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    table_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reservation_start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    reservation_end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    number_of_people: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    client_comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return ReservationModel;
};