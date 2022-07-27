class DateTime {
	let date;

	// return today date 
	// format - 2022-07-27
	getDate(){
		date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
		return date
	}
}

module.exports = DateTime;