module.exports = (sequelize, dataTypes) => {
    
  let alias = "Products";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
    },

    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: dataTypes.DOUBLE,
      allowNull: true,
    },

    category: {
      type: dataTypes.STRING,
      allowNull: false,
    },

    discount: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },

    image: {
      type: dataTypes.STRING,
      allowNull: true,
    }

  };

  let config= {
    tableName: "productos",
    timestamps: false
  }

  const Product = sequelize.define(alias, cols, config);
  return Product;
}