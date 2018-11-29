import moment from "moment";

//Função que separa uma data no formato yyyy-mm-dd, transforma em int ou então exibe a mesma data, só que no formato dd-mm-yyyy
export function formatDate(eventDate) {
	let day;
	let month;
	let year;

	if (eventDate == undefined) {
		day = "Dia Invalido";
		month = "Mes Invalido";
		year = "Ano Invalido";
	} else {
		day = eventDate.slice(-2);
		month = eventDate.slice(5, 7);
		year = eventDate.slice(0, 4);
		return {
			day: day,
			month: month,
			year: year,
			intDay: parseInt(day),
			intMonth: parseInt(month),
			intYear: parseInt(year),
			formatted: day + "/" + month + "/" + year
		};
	}
}

export function datetimeParser(datetime) {
	if (datetime == undefined) {
		return 1;
	} else {
		let year = formatDate(datetime).year;
		let month = formatDate(datetime).month;
		let day = datetime.slice(8, 10);
		let time = datetime.slice(11, 16);
		return `${day}/${month}/${year} às ${time}`;
	}
}

export function hasPassed(data) {
	let today = moment();
	let date = moment(data, "DD/MM/YYYY");
	let diff = date.diff(today, "days");
	return diff < 0;
}
