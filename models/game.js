const Player = require()

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
    Game.belongsTo(Player);
    return Player;
};