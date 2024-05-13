	// получить елемент по ID
	const el = (id)=> document.getElementById(id)
	//выбираем элементы
	const es = (selector)=> document.querySelector(selector)
	//извлечь значение первого элемента по имени
	const enm = (name)=> document.getElementsByName(name)[0]
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
	}
	//функция добавления зон
	function addzone(){
		let elem = '<div><label for="power" >Введите мощность зоны:</label><input type="text" id="power" value="200" name="zone" size="2"></div>'
		es('#power_level').insertAdjacentHTML('beforeend', elem)
	}
	//функция удаления зоны
	function killzone(){
		es('#power_level').insertAdjacentHTML('beforeend', elem)
	}
	//подбор оборудования
	function selmodel(){
		
	}
	function UpdateData(){
		GetSetData('zone', 1, 320)
		GetSetData('power', 200, 102000)
		GetSetData('count', 0, 32)
	}
	// функция вставки данных на страницу
	function getTable(href_model, name, descript, href){
		let str = '<div id = "row"><a href=' + href_model + '>' + name + '</a></div><div id = "row">' + descript + '</div><div id = "row"><a href=' + href + '>support.luis.ru</a></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
		
	}
	function getEmpty(){
		let str = '<div id = "row"></div><div id = "row">нет подходящих систем</div><div id = "row"></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
	}
	// основная функция
	function onLoadHandler() {
		//-- подключаем обработчик щелчка
		//el("btn").addEventListener("click", selmodel);
		
		//document.addEventListener("click", UpdateData)
		el("plus").addEventListener("click", addzone);

		//el("btn2").addEventListener("click", print);
	}
	//пуск
	window.onload = onLoadHandler;