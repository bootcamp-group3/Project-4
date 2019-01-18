module.exports = function (sequelize, DataTypes) {
    var Game = sequelize.define("Player", {
        googleId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
    Game.belongsTo(db.Player);
    return Player;
};