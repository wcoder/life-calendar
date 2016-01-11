
/**
 * Function for generate date picker.
 *
 * @author https://github.com/wcoder
 * @source https://github.com/wcoder/sdate.js
 * @version 1.0.0
 *
 * @param [callback] onChange - function to get the value of date
 * @param [array] months - array of month names
 * @param [string] optionDay - default value for select day
 * @param [string] optionMonth - default value for select month
 * @param [string] optionYear - default value for select year
 */
var selectionDate = function (onChange, months, optionDay, optionMonth, optionYear) {

	var _day, _month, _year, _i, _currentYear;

	_day = document.getElementById('sdate-day'),
	_month = document.getElementById('sdate-month'),
	_year = document.getElementById('sdate-year');

	optionDay = optionDay || 'Day';
	optionMonth = optionMonth || 'Month';
	optionYear = optionYear || 'Year';
	_currentYear = new Date().getFullYear();

	// validations

	if (!onChange) throw Exception('Argument "onChange" not found!');
	if (typeof onChange !== 'function') throw Exception('Argument "onChange" not a function!');
	if (!months) throw Exception('Argument "months" not found!');
	if (!(typeof months === 'object')
		&& months.hasOwnProperty('length')) throw Exception('Argument "months" not an array!');
	if (months.length !== 12) throw Exception('Length of argument "months" not equals 12');

	if (!_day) throw Exception('Page not contains the element with id="sdate-day"');
	if (!_month) throw Exception('Page not contains the element with id="sdate-month"');
	if (!_year) throw Exception('Page not contains the element with id="sdate-year"');

	// clear selects

	_day.innerHTML = _month.innerHTML = _year.innerHTML = '';

	// fill selects

	_day.appendChild(createFirstOption('dp_day', optionDay));
	_month.appendChild(createFirstOption('dp_month', optionMonth));
	_year.appendChild(createFirstOption('dp_year', optionYear));

	for (_i = 1; _i <= 31; ++_i) {
		_day.appendChild(createOption(_i, _i));
	}
	for (_i = 0; _i < 12; ++_i) {
		_month.appendChild(createOption(_i + 1, months[_i]));
	}
	for (_i = _currentYear; _i > 1930; --_i) {
		_year.appendChild(createOption(_i, _i));
	}

	// set hander

	_day.onchange = _month.onchange = _year.onchange = function (e) {
		if (_day.value > 0 && _month.value > 0 && _year.value > 0) {
			onChange(new Date(_year.value, _month.value, _day.value));
		}
	}

	// export

	return {
		setDate: function (date) {
			_day.selectedIndex = date.getDate();
			_month.selectedIndex = date.getMonth() + 1;
			_year.selectedIndex = (_currentYear - date.getFullYear()) + 1;

			onChange(date);
		}
	};

	// private helper functions

	function createFirstOption(id, text) {
		var o = createOption('0', text);
		o.id = id;
		o.disabled = true;
		o.selected = true;
		return o;
	}

	function createOption(value, text) {
		var o = document.createElement('option');
		o.value = value;
		o.textContent = text;
		return o;
	}

	function Exception (message) {
		return new Error('[selectionDate] ' + message);
	}

};
