/*
chrome.storage.local.get('cururl', function(data)
{
	
    if(chrome.runtime.lastError)
    {
        return;
    }
	console.log(data);
});
*/

var crurl = "empty";

window.addEventListener("message", function(event) {
    if(event.data.type === 'gtcrurl') {
        window._test = event.data.value;
        console.log(event.data.value);
		crurl = event.data.value;
    }
}, false);


function writeonpage() {
    
	if(crurl==="empty") {//we want it to match
        setTimeout(writeonpage, 50);//wait 50 millisecnds then recheck
        return;
    }
    //something_cachedValue=something;
    //real action
	//document.write(crurl);
	document.getElementById("ftb_crurl_fld").innerHTML = crurl.toString();
	crurl = "empty";
}

writeonpage();


//document.write(crurl);


