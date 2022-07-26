const fs = require('fs');

const saveToDatabase = (database)=> {
	fs.writeFileSync('./database/database.json', JSON.stringify(database, null, 2), {
		encoding: 'utf-8',
	});
}

module.exports = {saveToDatabase}