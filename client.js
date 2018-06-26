
function doact(){
		
	var rgxp = /<(?!((\/|)b)|((\/|)i)|((\/|)em)|((\/|)mark)|((\/|)strong)|((\/|)pre)|((\/|)small)|((\/|)sub)|((\/|)sup)|((\/|)img)|(!)).*?>/igmu;
	/*((\/|)span)|*/
	
	var wrds = ["украи","ДНР","ЛНР","киев","порошенко","донбасс"];/**/

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
	
}

window.addEventListener("load", doact() );
window.addEventListener("onload", doact() );
document.addEventListener("DOMContentLoaded", doact());