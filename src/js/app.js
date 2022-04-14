/* global selectionDate */
/* global LC */
(function(){

	var DEFAULT_CALENDAR_FILE_NAME = 'my-life-calendar',
		DEFAULT_IMAGE_TYPE = 'image/jpeg',

		datePicker,
		theme = document.getElementById('theme'),
		lang = document.getElementById('lang'),
		block = document.getElementById('calendar-canvas'),
		saveImage = document.getElementById('lang_save_jpg'),
		savePdf = document.getElementById('lang_save_pdf'),
		printPage = document.getElementById('lang_print'),

		themes = [
			{
				box: {
					borderColor: '#000',
					backgroundDefaultColor: '#FFF',
					backgroundPastDayColor: '#000',
				}
			},
			{
				box: {
					borderColor: '#CCC',
					backgroundDefaultColor: '#FFF',
					backgroundPastDayColor: '#87ccc9',
				}
			},
			{
				box: {
					borderColor: '#CCC',
					backgroundDefaultColor: '#FFF',
					backgroundPastDayColor: '#a52126',
				}
			},
			{
				box: {
					borderColor: '#CCC',
					backgroundDefaultColor: '#ebedf0',
					backgroundPastDayColor: '#30a14e',
				}
			}
		],

		langs = [
			{
				months: [
					'Январь',
					'Февраль',
					'Март',
					'Апрель',
					'Май',
					'Июнь',
					'Июль',
					'Август',
					'Сентябрь',
					'Октябрь',
					'Ноябрь',
					'Декабрь'
				],
				settings: {
					lang_set_birthday: "Дата вашего рождения:",
					dp_day: "День",
					dp_month: "Месяц",
					dp_year: "Год",
					lang_set_theme: "Дизайн календаря:",
					lang_select_lang: "Язык:",
					lang_save_print: "Сохранение или печать:",
					lang_save_jpg: "JPG",
					lang_save_pdf: "PDF",
					lang_print: "Печать",
				},
				calendar: {
					title: 'КАЛЕНДАРЬ ЖИЗНИ',
					left_text: '← Возраст',
					top_text: 'Недели года →'
				}
			},
			{
				months: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				],
				settings: {
					lang_set_birthday: "Set your birthday:",
					dp_day: "Day",
					dp_month: "Month",
					dp_year: "Year",
					lang_set_theme: "Select theme:",
					lang_select_lang: "Select language:",
					lang_save_print: "Save or print:",
					lang_save_jpg: "JPG",
					lang_save_pdf: "PDF",
					lang_print: "Print",
				},
				calendar: {
					title: 'LIFE CALENDAR',
					left_text: '← Age',
					top_text: 'Week of the Year →'
				}
			},
			{
				months: [
					'1月',
					'2曰',
					'3月',
					'4月',
					'5月',
					'6月',
					'7月',
					'8月',
					'9月',
					'10月',
					'11月',
					'12月'
				],
				settings: {
					lang_set_birthday: "设置您的生日:",
					dp_day: "日",
					dp_month: "月",
					dp_year: "年",
					lang_set_theme: "选择一个主题:",
					lang_select_lang: "选择一个语言:",
					lang_save_print: "保存或打印:",
					lang_save_jpg: "JPG",
					lang_save_pdf: "PDF",
					lang_print: "打印",
				},
				calendar: {
					title: '人生日历',
					left_text: '← 年龄',
					top_text: '一年中的第几周 →'
				}
			},
		];


	datePicker = selectionDate(LC.update, langs[0].months);

	updateLang(langs[0].settings);
	LC.init(block, langs[0].calendar);


	theme.onchange = function (e) {
		var themeId = e.target.value || 0;
		var theme = themes[themeId];

		LC.changeTheme(theme);
	};

	lang.onchange = function (e) {
		var langId = e.target.value || 0;
		var lang = langs[langId];

		datePicker = selectionDate(LC.update, lang.months);

		updateLang(lang.settings);
		LC.changeLang(lang.calendar);
	};

	saveImage.onclick = function (e) {
		var image = getImageFromCanvas();
		image = image.replace(DEFAULT_IMAGE_TYPE, 'image/octet-stream');

		e.target.href = image;
		e.target.download = DEFAULT_CALENDAR_FILE_NAME + '.jpg';
	};

	savePdf.onclick = function (e) {
		e.preventDefault();

		var image = getImageFromCanvas(),
			doc = new jsPDF();

		doc.addImage(image, 'JPEG', 20, 5, 170, 280);
		doc.save(DEFAULT_CALENDAR_FILE_NAME + '.pdf');
	};

	printPage.onclick = function (e) {
		e.preventDefault();

		window.print();
	};

	function getImageFromCanvas() {
		return block.querySelector('canvas').toDataURL(DEFAULT_IMAGE_TYPE);
	}

	function updateLang(lang) {
		for (var key in lang)
		{
			if (lang.hasOwnProperty(key)) {
				var element = document.getElementById(key);
				if (element != null) {
					element.textContent = lang[key];
				} else {
					console.error('[updateLang] ' + key);
				}
			}
		}
	}
}());