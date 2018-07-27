var currTabUrl = null;
var msgurl = null;
var currTabId = null;

function gcu(){
	
	chrome.storage.local.get({wrdstoblck: []}, function (result) {
		
		//console.log(result);
		//console.log(Object.values(result.wrdstoblck));
		
		var ttt = document.getElementById('wrds2blck');
		
		result.wrdstoblck.forEach( function(wrd){
			
			ttt.innerHTML += '<option class=\"wrds\" value=\"' + wrd + '\">' + wrd + '</option>';
			
		});
		
		
	});
	
	document.getElementById("wrds2blck").addEventListener("click", function(event){
	
		//var targetElement = event.target || event.srcElement;
		var wrdtorem = event.target.value;
		chrome.storage.local.get({wrdstoblck: []}, function (result) {
			
			var tmparr = result.wrdstoblck;
			tmparr.splice((tmparr.indexOf(wrdtorem)),1);
			
			chrome.storage.local.set({wrdstoblck: tmparr},function(){
				
				window.location.reload();
			});
			
		});
		
		//console.log(targetElement);
	
	});
	
	/*
	chrome.tabs.getSelected(null,function (tab) {
		currTabId = tab.id;
		//currTabIndex = tab.index;
		//console.log(tab.url);
		currTabUrl = new URL(tab.url);
		var curdom = currTabUrl.hostname;
		
		var ttt = document.getElementById('ftbcrurlfld');
		ttt.innerHTML = curdom;
		
		chrome.tabs.sendMessage(currTabId,{whtlstd:"getcur"},function(response){
			
			msgurl = response;
			var curdom = currTabUrl.hostname;
			if (msgurl && msgurl == curdom)
			{
				ttt = document.getElementById('ftbcrurlfld');
				ttt.style.backgroundColor = "66FF66";
				ttt.title = "Блокировать на этом сайте";
				var ddd = document.getElementById('infotxt');
				ddd.innerHTML = "отключена";
				ddd.style.color = "FF0000";
			}
		});
			
	});
	*/
}

document.addEventListener('DOMContentLoaded', gcu());
document.getElementById("addbtn").addEventListener("click", function(){
	
	var ttt = document.getElementById('addstopwrd');
	
	chrome.storage.local.get({wrdstoblck: []}, function (result) {
			
			var tmparr = result.wrdstoblck;
			tmparr.push(ttt.value);
			
			chrome.storage.local.set({wrdstoblck: tmparr},function(){
				
				window.location.reload();
			});
			
		});
	
	
});

/*
document.getElementById("ftbcrurlfld").addEventListener("click", function(){
	
	chrome.tabs.getSelected(null,function (tab) {
		currTabId = tab.id;
		currTabUrl = new URL(tab.url);
		var curdom = currTabUrl.hostname;
		chrome.tabs.sendMessage(currTabId,{revert:curdom},function(resp){
			
			console.log("sss");
			//while(resp == null){};
			
			if (resp.status == "done"){ 
				
				chrome.tabs.executeScript(currTabId, {code: 'window.location.reload();'});
		
				window.location.reload();
			}
		});
		
		
		
	});
	
});
*/
