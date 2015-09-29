
var _px: number = 0.5;

var BOX_SIZE: number = 13,
	BOX_MARGIN: number = 3,
	BOX_SIZE_REAL = BOX_SIZE - BOX_MARGIN,

	TABLE_LEFT: number = 40,
	TABLE_TOP: number = 70,

	COUNT_WEEKS: number = 52,
	COUNT_YEARS: number = 90,

	DEF_STROKE_COLOR: string = '#000',
	DEF_FILL_COLOR: string = '#000',
	DEF_BOX_COLOR: string = '#FFF',
	PASTDAY_COLOR: string = '#000',

	TITLE_TEXT: string = 'LIFE CALENDAR',
	AXIS_LEFT_TEXT: string = '← Age',
	AXIS_TOP_TEXT: string = 'Week of the Year →';

// canvas
var c = document.createElement('canvas');
c.width = 725;
c.height = 1250;
var ctx = c.getContext('2d');
ctx.strokeStyle = DEF_STROKE_COLOR;
ctx.fillStyle = DEF_FILL_COLOR;
ctx.font = '13px sans-serif';

// dates
var currentDate: any = new Date();
var bDate = null;


clearCanvas();
drawTitle();
drawAxis();
drawMetric();


interface Window { lifeCalendar: any; }
class CalendarWeek {
	isPast: boolean;
	constructor(year: number, week: number) {
		var weeks: number = year * COUNT_WEEKS + week,
			date: any = this.addDays(bDate, weeks * 7);

		this.isPast = (currentDate - date) > 0;
	}
	addDays(date: any, days: number): any {
		var clone = new Date(date.getTime());
		clone.setDate(date.getDate() + days);
		return clone;
	}
}
class CalendarYear {
	weeks: CalendarWeek[] = [];
	public add(week: CalendarWeek): void {
		this.weeks.push(week);
	}
}

// public
window.lifeCalendar = {
	init: function (element) {
		element.appendChild(c);
		this.update(null);
	},
	update: function (_bDate) {
		bDate = _bDate || new Date();

		drawTable(COUNT_YEARS, COUNT_WEEKS, generateDates(COUNT_YEARS, COUNT_WEEKS));
	}
};


// CALENDAR

function generateDates(countYears: number, countWeeks): CalendarYear[] {
	var i: number, j: number, years: CalendarYear[] = [], year: CalendarYear;

	for (i = 0; i < countYears; i++) {
		year = new CalendarYear();
		for (j = 1; j <= countWeeks; j++) {
			year.add(new CalendarWeek(i, j));
		}
		years.push(year);
	}
	return years;
}

// CANVAS

function clearCanvas(): void {
	ctx.clearRect(0, 0, c.width, c.height);
}
function drawTitle(): void {
	ctx.textAlign = 'center';
	ctx.fillText(TITLE_TEXT, c.width / 2, 20);
}
function drawAxis(): void {
	ctx.textAlign = 'left';

	// left axis
	ctx.save();
	ctx.translate(20, TABLE_TOP + 40);
	ctx.rotate(-Math.PI/2);
	ctx.translate(-20, -(TABLE_TOP + 40));
	ctx.fillText(AXIS_LEFT_TEXT, 20, TABLE_TOP + 40);
	ctx.restore();

	// top axis
	ctx.fillText(AXIS_TOP_TEXT, TABLE_LEFT, TABLE_TOP - 35);
}
function drawMetric(): void {
	var i: number = 0;

	// left metric
	ctx.textAlign = 'right';
	for (i = 0; i < COUNT_YEARS; i++) {
		if (i % 5 === 0) {
			ctx.fillText(i.toString(), TABLE_LEFT - 5, TABLE_TOP + 10 + i * BOX_SIZE);
		}
	}

	// top metric
	ctx.textAlign = 'left';
	for (i = 1; i < COUNT_WEEKS; i++) {
		if (i % 5 === 0 || i === 1) {
			ctx.fillText(i.toString(), TABLE_LEFT + (i - 1) * BOX_SIZE, TABLE_TOP - 10);
		}
	}
}
function drawTable(rows: number, cols: number, values: CalendarYear[]): void {
	for (var i = 0; i < rows; i++) {
		drawRow(i, cols, values[i].weeks);
	}
}
function drawRow(row: number, cols: number, values: CalendarWeek[]): void {
	for (var i = 0; i < cols; i++) {
		// color by type
		ctx.fillStyle = values[i].isPast ? PASTDAY_COLOR : DEF_BOX_COLOR;

		drawRect(TABLE_LEFT + i * BOX_SIZE, TABLE_TOP + row * BOX_SIZE);
	}
}
function drawRect(x: number, y: number): void {
	ctx.fillRect(_px + x, _px + y, BOX_SIZE_REAL, BOX_SIZE_REAL);
	ctx.strokeRect(_px + x, _px + y, BOX_SIZE_REAL, BOX_SIZE_REAL);
}