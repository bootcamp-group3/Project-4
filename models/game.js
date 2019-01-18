module.exports = function (sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        score: {
            type: DataTypes.BIGINT,
            allowNull: false,
            default: 0
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Game.associate = function (models) {
        Game.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Game;
};