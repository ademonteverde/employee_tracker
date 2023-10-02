// Import the db object
const db = require('./db/connection'); 

// Import the init function
const init = require('./tracker'); 

init(db);
