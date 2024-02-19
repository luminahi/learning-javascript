class AsyncTask {
    executionTime;
    message;

    constructor(message, executionTime = 1000) {
        this.message = message;
        this.executionTime = executionTime;
    }
}

export { AsyncTask };
