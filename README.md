**(ET) => {phone(home)}** presents our turn based strategy game!

# Where to Play
https://bootcamp-phone-home.herokuapp.com/

# How to Play
Once another player is available, you'll be matched and dropped into a game. Roll a die to see who takes the first turn, then pay attention to try and outmaneuver your opponent!

You'll start on a new randomly generated game board, and your goal is to dominate your opponent by fortifying the most tiles. Each turn, you'll begin by making a move. You can move two tiles Up, Down, Left, or Right, or you can move one tile diagonally. Choose wisely, however, as obstacles and traps can throw a ranch into even the best laid plans.

If you move onto an empty tile, you'll have to roll a die to see what resources are on the tiles. If you roll a one, you become the owner of that tile and establish a fortification with one guard. If you roll a six, you become the owner of that tile and establish a fortification of six soldiers.

If you move onto a tile controlled by your opponent, you'll have to roll a die to battle it out over that square. If your dice roll is higher than the number that your opponent rolled when he/she captured the tile, then you emerge the victor. If your dice roll is smaller, however, you suffer an embarassing loss and lose the soldiers you rolled for.

# Technologies Involved

### Persistence
1. MySQL (Relational Database)
2. **Redis (Cache)**

### Libraries
1. **Socket.io**
2. **Redis**
3. Bootstrap
4. Express
5. Handlebars

### API
1. **Google Auth**
2. Player
3. Leaderboard
4. Cache

### Development Tools
1. **Docker**