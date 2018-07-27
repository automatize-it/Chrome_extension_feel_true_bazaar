//var cururl = window.location.host;
var stwhtlst = ["www.wikipedia.org", "ru.wikipedia.org"];
var localstwhtlst;
var cururl = "blckd";
var whtlst = 0;
var rgxp = /<(?!((\/|)b)|((\/|)i)|((\/|)em)|((\/|)mark)|((\/|)strong)|((\/|)pre)|((\/|)small)|((\/|)sub)|((\/|)sup)|((\/|)img)|(!)).*?>/igmu;
var curdom;
var wrdsorig = ["украи","ДНР","ЛНР","киев","порошенко","донбасс"];
var wrds = [];

var firstdomain = 0;


//dolclstrgclr();

function dolclstrgclr() {
	chrome.storage.local.clear(function() {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
}

function savecurdom(){
	
	if (firstdomain == 0){
		curdom = document.location.hostname;
	}
	firstdomain++;
	doact();
}

function doact(){
	
	/*	
	chrome.storage.local.get({sitewhtlststrg: []}, function (result) {
		
		if (result.sitewhtlststrg.length == 0){
			
			chrome.storage.local.set({sitewhtlststrg: stwhtlst}, function(){});
			
		}
		else {
			
			localstwhtlst = result.sitewhtlststrg;
		}
		
		
		localstwhtlst.forEach( function(whtlsturl){
			
			if (whtlsturl == curdom) {
				
				//cururl = whtlsturl;
				whtlst++;
				return;
			}
			//doclean();
		});
		
		if (whtlst == 0) {doclean()};
		
	});
	*/
	doclean();
}
	
function doclean(){
	
	//if (whtlst > 0) return;
	//var wrds = ["украи","ДНР","ЛНР","киев","порошенко","донбасс"];
	chrome.storage.local.get({wrdstoblck: []}, function (result) {
		
		//console.log(result);
		
		if (result.wrdstoblck.length == 0){
			
			chrome.storage.local.set({wrdstoblck: wrdsorig}, function(){});
			
		}
		else {
			
			wrds = result.wrdstoblck;
		}
		
		//console.log(wrds);
		
		(document.querySelectorAll('p,div,li,h1,h2,h3,a,td,span')).forEach(function (tag){ 
		
		wrds.forEach(function (stpwrd) {
			if (tag.innerHTML.match(new RegExp(stpwrd,"igmu")) != null) {
				
				if (tag.childNodes.length == 1 && tag.childNodes[0].nodeName == "#text") { 
					
					tag.innerHTML = "<p>Ничего интересного.</p>";
				}
				else {
						
					str = tag.innerHTML.toString();
					mth = str.match(rgxp);
					
					if (tag.nodeName == "SPAN") {
					
						console.log(tag.innerHTML);
					}
					
					if (mth == null ) {
						tag.innerHTML = "<p>Ничего интересного.</p>";
					}
				}
			}
		});
	});
		
			
	});
	
	
	
}

window.addEventListener("load", doact() );
window.addEventListener("onload", doact() );
document.addEventListener("DOMContentLoaded", savecurdom());

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  
  if (message.whtlstd == "getcur"){
    
    sendResponse(curdom);
    return true;
  }
  
  if(message.revert){
	
	chrome.storage.local.get({sitewhtlststrg: []}, function (result) {
		
		while(!result){};
		localstwhtlst = result.sitewhtlststrg;
		//console.log(localstwhtlst);
		if (localstwhtlst.includes(message.revert)){
			
			localstwhtlst.splice((localstwhtlst.indexOf(message.revert)),1);		
		}
		else{
			
			localstwhtlst.push(message.revert);
		}
		chrome.storage.local.set({sitewhtlststrg: localstwhtlst},function(){});
		sendResponse({status:"done"});
		
	});
		
  }
  
  return true;

});