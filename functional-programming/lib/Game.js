export class Game {
    #id;
    #name;

    /**
     *
     * @param {string} name
     * @param {number} id
     */
    constructor(name, id) {
        this.#id = id;
        this.#name = name;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    toString() {
        return `Game: ${this.#name} - ID: ${this.#id}`;
    }
}
