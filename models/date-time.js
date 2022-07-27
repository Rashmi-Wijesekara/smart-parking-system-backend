class DateTime {
	let date;
	let time;

	// return today date 
	// format - 2022-07-27
	getDate(){
		defaultDate = new Date()
		date = defaultDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
		return date
	}

	// return time now
	// format - 06:54 pm
	getTime(){
		defaultTime = new Date()
		time = defaultTime.toLocaleString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		})
		return time
	}

}

module.exports = DateTime;