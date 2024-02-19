import { AsyncQueue } from "./AsyncQueue.js";
import { AsyncTask } from "./AsyncTask.js";

const asyncQueue = new AsyncQueue();

asyncQueue.enqueue(new AsyncTask("task0", 6000));
asyncQueue.enqueue(new AsyncTask("task1", 5000));
asyncQueue.enqueue(new AsyncTask("task2", 3000));
asyncQueue.enqueue(new AsyncTask("task3", 2000));
asyncQueue.enqueue(new AsyncTask("task4", 8000));
asyncQueue.enqueue(new AsyncTask("task5", 5000));

asyncQueue.execute();

// const t1 = () => {
//     return new Promise((resolve) =>
//         setTimeout(() => {
//             console.log("hello task 1");
//             resolve();
//         }, 4000)
//     );
// };

// const t2 = () => {
//     return new Promise((resolve) =>
//         setTimeout(() => {
//             console.log("hello task 2");
//             resolve();
//         }, 4000)
//     );
// };
// const t3 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("hello task 3");
//             resolve();
//         }, 4000);
//     });
// };

// await t1();
// await t2();
// await t3();
