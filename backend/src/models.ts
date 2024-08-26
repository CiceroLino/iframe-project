import { Sequelize, Model, DataTypes, UUID, UUIDV4 } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
