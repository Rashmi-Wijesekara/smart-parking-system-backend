const mongoose = require("mongoose");
const model__shiftLog = require("../mongodb/ShiftLog-model");
const model__officer = require("../mongodb/Officer-model");

const DateTime = require("../models/date-time");

const getAllLogsById = async (soid) => {
	return await model__shiftLog
		.find({ id: soid })
		.sort({ date: -1 });
};

// add start time
const addLog = async (log) => {
	const isEmployee = await model__officer
		.find({ id: log.officerId })
		.exec();
	// invalid officer id
	if (isEmployee.length == 0) return;

	const type = DateTime.shiftType(log.startTime);
	const endTime = "---";
	const l = {
		...log,
		endTime: endTime,
		shiftType: type,
	};

	const addingLog = new model__shiftLog({
		officerId: l.officerId,
		date: l.date,
		startTime: l.startTime,
		endTime: l.endTime,
		shiftType: l.shiftType,
	});

	await addingLog.save();
	return addingLog;
};

// add end time
const updateLog = async (soid, endTime) => {
	const isOfficer = await model__officer
		.find({ id: soid })
		.exec();
	// invalid officer id
	if (isOfficer.length == 0) return;

	const check = await model__shiftLog.find({
		officerId: soid,
		endTime: "---",
	});
	
	if (check.length == 0) return "no log found";
	
	const checkDate = check[0].date;

	await model__shiftLog.updateOne(
		{ officerId: soid, endTime: "---" },
		{ $set: { endTime: endTime } }
	);

	const updatedShift = await model__shiftLog.find({
		officerId: soid,
		endTime: endTime,
		date: checkDate,
	});

	return updatedShift;
};

const getTodaysLog = async (soid) => {

	const isOfficer = await model__officer
		.find({ id: soid })
		.exec();
	// invalid officer id
	if (isOfficer.length == 0) return;

	const today = DateTime.getDate()

	const todayLog = await model__shiftLog.find({
		officerId: soid,
		date: today
	})
	return todayLog
};

module.exports = {
	getAllLogsById,
	addLog,
	updateLog,
	getTodaysLog,
};
