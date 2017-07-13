window.onload = function () {
	
	var baseName = "AlarmDB";
	var storeName = "AlarmsTable";
	var db = openDatabase(baseName, '1.0', 'AlarmDatabase', 2*1024*1024);
	if (!db) {
		alert("Ошибка при подключении к БД!");
	}
	db.transaction(function (tx) {
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ' + storeName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, hour INTEGER, minute INTEGER, geo BOOLEAN, tasks BOOLEAN, address TEXT)', [],
				 null, null);

		 tx.executeSql('INSERT INTO ' + storeName + ' (hour, minute, geo, tasks, address) VALUES (?, ?, ?, ?, ?)', [15, 10, true, false, "Moscow"], null, function (e) {alert('Error with insert: ' + e.message);});
		 tx.executeSql('INSERT INTO ' + storeName + ' (hour, minute, geo, tasks, address) VALUES (?, ?, ?, ?, ?)', [19, 10, true, false, "Kiev"], null, function (e) {alert('Error with insert: ' + e.message);});

		 Delete();
		 getAllAlarms();
		 
	});
	
	function getAllAlarms() {
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM ' + storeName, [], onResult, function () {alert("ERROR GETALLALARMS!!");});
		});
	}
	
	function onResult(tx, res) {	
		for(var i = 0; i < res.rows.length; i++) {
		document.write('<b>' + res.rows.item(i)['hour'] + '</b><br />');
		}}
	
	function Delete() {
		db.transaction(function (tx) {
			tx.executeSql('DELETE FROM ' + storeName + ' WHERE hour=16');
		})
			
	}
};
