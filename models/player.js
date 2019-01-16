module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        googleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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