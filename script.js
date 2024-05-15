	// получить елемент по ID
	const el = (id)=> document.getElementById(id)
	//выбираем элементы
	const es = (selector)=> document.querySelector(selector)
	//извлечь значение первого элемента по имени
	const enm = (name)=> document.getElementsByName(name)[0]
	//глобальные переменные
	let total_power
	let count  = 1
	let power_zone = []
	let panel = 1
	//ограничить значение
	function LimNum(num, minNum, maxNum){
		if(num < minNum || isNaN(num) ){
			num = minNum
		}
		if(num > maxNum){
			num = maxNum
		}
		return num
	}
	//получить и отредактировать значение
	function GetSetData(str, minVal, maxVal){
		let Val = LimNum(+el(str).value, minVal, maxVal)
		el(str).value = Val
		return Val
	}
	//функция добавления зон
	function addzone(){
		if(count<5){
			count ++
			let elem = '<div id="power_level'+count+'"><label for="zone" >Введите мощность, Вт (линия '+ count+'): </label><input type="text" id="power'+count+'" value="12" name="zone" size="1"><label for="zone">(от 12 до 520)</label></div>'
			es('#power_field').insertAdjacentHTML('beforeend', elem)
			el('quantity').value = count
		}
	}
	//функция удаления зоны
	function killzone(){
		//let count = el('quantity').value
		if(count > 1){
			el('power_level' + count).remove()
			count--
			el('quantity').value = count
		}
	}
	//обновить данные ввода пользователя
	function UpdateData(){
		power_zone  = []
		total_power = 0
		panel = GetSetData('panel', 1, 5)
		//получим мощности каждой зоны и расчитаем сумму
		for(let i =1; i<=count; i++){
			power_zone[i-1] = GetSetData('power'+ i, 12, 520)
			total_power = total_power + power_zone[i-1]
		}
		//добавим на страницу
		el('total_power').value = total_power
	}
	//функция выключения таблицы
	function turnoff(){
		el("head").style.display = "none"
		el("LX240").style.display = "none"
		el("DT1240").style.display = "none"
		el("LX480").style.display = "none"
		el("DTM1255L").style.display = "none"
		el("LX650").style.display = "none"
		el("DT1240").style.display = "none"
		el("M1").style.display = "none"
		el("btn2").style.display = "none"
		el("btn3").style.display = "none"
		el("empty").style.display = "none"
	}
	//подбор оборудования
	function spec(){
		turnoff()
		UpdateData()
		switch (true) {
			case (total_power <= 200):
				//console.log( '<200' );
				el("head").style.display = "block"
				el("LX240").style.display = "block"
				if(el('alarm').checked){
					el("DT1240").style.display = "block"
				}
				el("M1").style.display = "block"
				el("row_q").innerHTML = panel
				el("btn2").style.display = "block"
				el("btn3").style.display = "block"
				break;
			case (total_power <= 400 &&  total_power >= 200):
				//console.log( '>200 и <400' );
				el("head").style.display = "block"
				el("LX480").style.display = "block"
				if(el('alarm').checked){
					el("DTM1255L").style.display = "block"
				}
				el("M1").style.display = "block"
				el("row_q").innerHTML = panel
				el("btn2").style.display = "block"
				el("btn3").style.display = "block"
				break;
			case (total_power <= 540 &&  total_power >= 400):
				el("head").style.display = "block"
				//console.log( '>400 и <540' );
				el("LX650").style.display = "block"
				if(el('alarm').checked){
					el("DT1265").style.display = "block"
				}
				el("M1").style.display = "block"
				el("row_q").innerHTML = panel
				el("btn2").style.display = "block"
				el("btn3").style.display = "block"
				break;
			default:
				//console.log( 'Мощность превышает допустимую' );
				el("empty").style.display = "block"
		}
		
	}
	// функция печати
	function print() {
		html2pdf( es('body') );
	}
	// функция перенаправления на структурную схему
	const url = ()=> window.open("https://support.luis.ru/ru/home/LPA/lpaLX")
	// основная функция
	function onLoadHandler() {
		//-- подключаем обработчик щелчка
		el("btn").addEventListener("click", spec);
		el("plus").addEventListener("click", addzone);
		el("minus").addEventListener("click", killzone);
		document.addEventListener("click", UpdateData);
		el("btn2").addEventListener("click", print);
		el("btn3").addEventListener("click", url);
	}
	//пуск
	document.addEventListener("DOMContentLoaded", UpdateData)
	window.onload = onLoadHandler;