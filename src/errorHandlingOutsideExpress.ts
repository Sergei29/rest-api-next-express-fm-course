/**
 * @description sometime we need to assure the unhandled errors thown
 * outside the express server, happended purely inside node.js env
 * the following event listeners can be put at the top of the index file
 * then use some error logging service to signal these occurence
 */

/**
 * @description event listener on the synchronous errors occurred within the node.js process
 * @param {string} 'uncaughtException' event name
 * @param {Error} error a thrown error
 * @returns {undefined} event listener effect fn
 */
process.on("uncaughtException", (error) => {
  console.log("Sync error: ", error.message);
});

/**
 * @description event listener on the asynchronous/reject errors occurred within the node.js process
 * @param {string} 'unhandledRejection' event name
 * @param {unknown} error a thrown error
 * @returns {undefined} event listener effect fn
 */
process.on("unhandledRejection", (error) => {
  console.log("Async error: ", error);
});
