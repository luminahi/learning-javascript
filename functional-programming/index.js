import { Game } from "./lib/Game.js";

const games = [
    new Game("The Legend of Zelda", 1),
    new Game("The Legend of Zelda 2", 2),
    new Game("The Legend of Zelda: A Link to the Past", 3),
    new Game("Mario Bros", 4),
    new Game("Super Mario World", 5),
    new Game("Street Fighter 2", 6),
    new Game("Bioshock Infinity", 7),
];

const filteredGames = games
    .filter((game) => game.name.startsWith("The"))
    .map((game) => {
        return new Game(game.name, game.id * 10);
    });

const gameIdAccumulator = games.reduce((previous, current) => {
    previous.id += current.id;
    return previous;
}, new Game("GameIdAccumulator", 0));

const isAllGamesWithBigNames = games.every((game) => game.name.length > 16);

const isSomeIdsEven = games.some((game) => game.id % 2 === 0);

console.log("==================================");
console.log(gameIdAccumulator.toString());
console.log("==================================");
filteredGames.forEach((game) => console.log(game.toString()));
console.log("==================================");
console.log(isAllGamesWithBigNames);
console.log("==================================");
console.log(isSomeIdsEven);
console.log("==================================");
