import { AsyncQueue } from "./AsyncQueue.js";
import { AsyncTask } from "./AsyncTask.js";

const asyncQueue = new AsyncQueue();

asyncQueue.enqueue(new AsyncTask("task0", 12000));
asyncQueue.enqueue(new AsyncTask("task1", 1000));
asyncQueue.enqueue(new AsyncTask("task2", 3000));
asyncQueue.enqueue(new AsyncTask("task3", 2000));
asyncQueue.enqueue(new AsyncTask("task3", 8000));
asyncQueue.enqueue(new AsyncTask("task5", 5000));

asyncQueue.execute();
