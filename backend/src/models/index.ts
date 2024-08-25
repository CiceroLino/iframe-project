import { Sequelize, Model, DataTypes, UUID, UUIDV4 } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class Demo extends Model {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Demo.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Demo",
  }
);

class Frame extends Model {
  public id!: string;
  public html!: string;
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Frame.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Frame",
  }
);

Demo.hasMany(Frame, { as: "frames", foreignKey: "demoId" });
Frame.belongsTo(Demo, { as: "demo", foreignKey: "demoId" });

export { sequelize, Demo, Frame };
