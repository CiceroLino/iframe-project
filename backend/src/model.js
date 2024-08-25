const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Demo extends Sequelize.Model {}
Demo.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Demo'
  }
);

class Frame extends Sequelize.Model {}
Frame.init(
  {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    html: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    order:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Frame'
  }
);

Demo.hasMany(Frame, {as: 'frames', foreignKey: 'demoId'})
Frame.belongsTo(Demo, {as: 'demo', foreignKey: 'demoId'})

module.exports = {
  sequelize,
  Demo,
  Frame,
};
