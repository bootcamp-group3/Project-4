## ( ET ) => { phone ( home ) }
#### "Grandma's Browser Cookies"

### Project Proposal
We intend to build a (currently unnamed) game, styled similarly to popular turn-based strategy games, but with added elements of chance. The game will be...
- Turn-Based Strategy/RPG
- Two Player
- Played on a 'tile' map

##### Gameplay
Upon launching the game, the user will be connected to the an available game. If no games are available, a new game will be created. The user will be placed on a new game board and await another rival user.

Once a game has begun, the users will both roll a die. The user with the higher number takes the first turn.



#### Turns
- Each turn, the user must begin by moving his/her respective 'Player', which is his/her avatar which is placed randomly on the board at the start of the game. A 'move' may be to up to two tiles in a cardinal direction (Up, Down, Left Right), or the player may move to a diagonally adjacent tile. The player may not move onto certain 'obstacle tiles' randomly placed on each new map.

- After the player has moved, he/she will be prompted to roll a die. The result of the roll will be the 'fortification' value on that tile. This means the player will now own the tile onto which he/she moved, and will have a number of 'troops' present on said tile.
    - Should the user elect to move to a tile that is currently owned by his/her opponent, the user will engage in a 'battle' with the opponent. The agressor will roll a die as he/she would in any turn, and the result will then be compared to the current fortification value of the tile. If the dice roll is greater than the current fortification, the agressor will win the battle and take over the tile. If the dice roll is less than the current fortification value, the agressor will lose the battle and be returned to his/her previous location. The agressor will also then have the difference between his/her roll and the fortifaction value deducted from his/her score (e.g., a tile has a fortifcation value of 5 and the attacking player rolls a 3. The attacking player's score will be reduced by two points).  

#### Tiles
- There are (for now) three main types of tiles:
    - 1. Grassland {type : 0}
        Plain tile. These tiles may be moved over and onto, claimed, and battled over by the players.
    - 2. Mountain {type : 1}
        Inland obstacle tile. Mountain tiles are scattered randomly around the center of the board. The players may not move over or onto mountain tiles.
    - 3. Ocean {type : 2}
        Border obstacle tiles. Ocean tiles are scattered randomly around the border of the board. The players may not move over or onto ocean tiles.

- Bonuses - Some tiles may hold special 'bonus' items. If a player travels over or onto a bonus tile, he/she will be awarded the bonus that the tile holds. Bonuses include:
    - Double Die : Single-use bonus that allows the player to roll two die when fortifying or attacking a tile
    - Multiplier : Bonus that, for 5 turns, adds 1 to each roll the player makes. (i.e., Rolling a four puts a 5 on the tile)
    - Siege Proof : Bonus that, for 3 turns, adds 1 to all fortifications the player has established (i.e., A tile with a fortification of 4 will be treated as a 5, so the agressor must roll a 6 to win)
    - Bountiful Harvest : Bonus that adds a certain number of points to the players total score

#### Scorekeeping
- The game is turn-limited (at least for now). Each game will consist of 15 turns (this is an arbitrary number; the finalized turn limit will be determined during the game testing phase)
- Both players have a 'score' which is computed via
    - Ratio of tiles owned
    - Total fortifications
    - Bonuses
- Upon reaching the turn limit, the game concludes. The winner is whichever player has the higher score.