const db = require('./db/connection'); // Import the db object

const init = require('./tracker'); // Import the init function

// ...

// Pass the db object to the init function
init(db);
