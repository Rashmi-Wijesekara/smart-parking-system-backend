// return today date
// format - 2022-07-27
const getDate = () => {
	defaultDate = new Date();
	const date = defaultDate
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");
	return date;
};

// return time now
// format - 06:54 pm
const getTime = () => {
	defaultTime = new Date();
	const time = defaultTime.toLocaleString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
	return time;
};

// true -> selectedTime < checkTime
// false -> selectedTime > checkTime
const isPast = (checkTime, selectedTime) => {
	// type - am OR pm
	const checkTime__type = checkTime.substring(6);
	const selectedTime__type = selectedTime.substring(6);

	// hours as int
	const checkTime__hours = parseInt(
		checkTime.substring(0, 2)
	);
	const selectedTime__hours = parseInt(
		selectedTime.substring(0, 2)
	);

	// minutes in int
	const checkTime__minutes = parseInt(
		checkTime.substring(3, 5)
	);
	const selectedTime__minutes = parseInt(
		selectedTime.substring(3, 5)
	);

	// console.log(checkTime__hours, selectedTime__hours)
	// console.log(checkTime__minutes, selectedTime__minutes)
	// console.log(checkTime__type, selectedTime__type)

	// console.log("inside the func");
	// console.log("check = ", checkTime);
	// console.log("selected = ", selectedTime);
	// console.log("============================");

	let result;

	if (checkTime === selectedTime) result = true;

	if (selectedTime__type < checkTime__type) {
		result = true;
	} else if (selectedTime__type > checkTime__type) {
		result = false;
	} else {
		// am/pm type is same
		if(selectedTime__hours < checkTime__hours){
			result = true;
		} else if(selectedTime__hours > checkTime__hours){
			result = false;
		}else {
			// hour is same
			if(selectedTime__minutes < checkTime__minutes){
				result = true;
			}else if(selectedTime__minutes > checkTime__minutes){
				result = false;
			}
		}
	}

	// console.log("result == " + result);
	// console.log("============================");

	return result;
};

module.exports = {
	getDate,
	getTime,
	isPast
};
