

function initialize(){
	//alert("init");
	var listmgr = new listmanager();
	var listfcty = new listfactory();
	
	var firstlist = listfcty.createlist(88,"verticle");
	listmgr.addlist(firstlist);
	
	for(var i=0;i<25;i++){
		var divelem = listfcty.createdivelement(firstlist);
	
		try{
			var msgdiv=document.createTextNode("entry "+i);
			//msgdiv.innerHTML="entry "+i;
			divelem.htmldiv.appendChild(msgdiv);
			firstlist.adddivelement(divelem);
			//alert("height "+divelem.htmldiv.childNodes.item(0).style.top);
			//console.log(i+"height2 "+divelem.htmldiv.style.height);
			//console.dir(firstlist);
		}catch(exception){
			alert("Dom Exception Occurred "+exception);
		}
		//divelem.htmldiv.style.height=20;
	}
	//alert("show list");
	document.getElementById("list0").appendChild(firstlist.roothtmldivelement);
	console.log(i+" style height "+document.getElementById("list0").style.height+" in px");
	firstlist.showlist();
}