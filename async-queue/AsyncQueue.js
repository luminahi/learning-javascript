class AsyncQueue {
    queue;

    constructor() {
        this.queue = [];
    }

    async execute() {
        while (this.queue.length > 0) {
            const task = await this.dequeue();
            console.log(task);
        }
    }

    /**
     *
     * @param {AsyncTask} task
     */
    enqueue(task) {
        const promisifiedTask = new Promise((resolve) => {
            setTimeout(() => {
                resolve(task.message);
            }, task.executionTime);
        });
        this.queue.unshift(promisifiedTask);
        console.log(
            "task [%s] started with execution time of [%s seconds]",
            task.message,
            task.executionTime / 1000
        );
    }

    dequeue() {
        return this.queue.pop();
    }
}

export { AsyncQueue };
