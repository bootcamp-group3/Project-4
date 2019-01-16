module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        googleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                len: [1, 50]
            }
        },
        icon: {
            type: DataTypes.TEXT
        },
        plays: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            defaultValue: 0
        },
        wins: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            defaultValue: 0
        },
        losses: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            defaultValue: 0
        }
    });
    return Player;
};