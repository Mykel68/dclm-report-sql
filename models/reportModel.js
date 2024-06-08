module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
     
    },
    serviceType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subServiceType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    subServiceDay: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
      },
    section: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    supervisor: {
      type: DataTypes.STRING(45),
      allowNull: false,
  
    },
    personnelCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
  
    },
    volunteerCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
  
      },
    challenges: {
        type: DataTypes.STRING(45),
        allowNull: false,
        get() {
          return JSON.parse(this.getDataValue("challenges"));
        },

        set(challenges) {
          this.setDataValue("challenges", JSON.stringify(challenges));
        },

        
   
      },
    solution: {
      type: DataTypes.STRING(45),
      allowNull: false,
      },
    equipmentDetails: {
      type: DataTypes.STRING(45),
      allowNull: false,
      },
    remarks: {
      type: DataTypes.STRING(45),
      allowNull: false,
      },
    location: {
      type: DataTypes.STRING(45),
      allowNull: false,
      },
  });

  return Report;
};






