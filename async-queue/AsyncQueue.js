class AsyncQueue {
    queue;

    constructor() {
        this.queue = [];
    }

    async execute() {
        while (this.queue.length > 0) {
            const task = this.#dequeue();
            await task();
        }
    }

    enqueue(task) {
        const promisifiedTask = () => {
            return new Promise((resolve) => {
                console.log("starting %s", task.name);
                delay(task.time).then(() => {
                    console.log("%s completed", task.name);
                    resolve();
                });
            });
        };

        this.queue.unshift(promisifiedTask);
    }

    #dequeue() {
        return this.queue.pop();
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { AsyncQueue };
