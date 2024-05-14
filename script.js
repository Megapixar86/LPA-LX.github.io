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
	let panel = 0
	//let panel = +el('panel').value

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
		//count = el('quantity').value
		if(count<5){
			count ++
			let elem = '<div id="power_level'+count+'"><label for="zone" >Введите мощность, Вт (зона '+ count+'): </label><input type="text" id="power'+count+'" value="12" name="zone" size="1"><label for="zone">(от 12 до 520)</label></div>'
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
	//подбор оборудования
	function spec(){
		UpdateData()
		//let count = el('quantity').value
		//let pow = UpdateData()
		//panel = GetSetData('panel', 0, 32)
		total_power = 0
		for(let i =0; i<=count-1; i++){
			total_power = total_power + power_zone[i]
		}
		console.log(total_power)
		console.log(power_zone)
		console.log(panel)
		//if(power<200){
		//}
	}
	function UpdateData(){
		power_zone  = []
		panel = GetSetData('panel', 0, 32)
		//count  = el('quantity').value
		//let count = el('quantity').value
		//let power = []
		//power[0] = GetSetData('count', 0, 32)
		for(let i =1; i<=count; i++){
			power_zone[i-1] = GetSetData('power'+ i, 12, 520)
			//total_power = total_power + power_zone[i]
		}
		//console.log(power[0])
		//return power
	}
	// функция вставки данных на страницу
	function getTable(href_model, name, descript, href){
		let str = '<div id = "row"><a href=' + href_model + '>' + name + '</a></div><div id = "row">' + descript + '</div><div id = "row"><a href=' + href + '>support.luis.ru</a></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
	}
	// функция вставки пустой таблицы данных на страницу
	function getEmpty(){
		let str = '<div id = "row"></div><div id = "row">нет подходящих систем</div><div id = "row"></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
	}
	// основная функция
	function onLoadHandler() {
		//-- подключаем обработчик щелчка
		el("btn").addEventListener("click", spec);
		el("plus").addEventListener("click", addzone);
		el("minus").addEventListener("click", killzone);
		document.addEventListener("click", UpdateData)
	}
	//пуск
	window.onload = onLoadHandler;