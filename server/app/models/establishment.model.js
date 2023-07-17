module.exports = (sequelize, Sequelize) => {
  const EstablishmentModel = sequelize.define('establishments', {
    establishment_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    painting_data: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
  });

  return EstablishmentModel;
};
