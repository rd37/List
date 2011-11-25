

function initialize(){
	//alert("init");
	var listmgr = new listmanager();
	var listfcty = new listfactory();
	
	var firstlist = listfcty.createlist(258,"verticle");
	listmgr.addlist(firstlist);
	
	for(var i=0;i<25;i++){
		var divelem = listfcty.createdivelement(firstlist);
	
		try{
			var msgdiv=document.createTextNode("entry "+i);
			//msgdiv.innerHTML="entry "+i;
			if(i%3==0)
				divelem.htmldiv.innerHTML=getentrytype1();
			if(i%3==1)
				divelem.htmldiv.innerHTML=getentrytype2();
			if(i%3==2)
				divelem.htmldiv.innerHTML=getentrytype3();
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
	//console.log(i+" style height "+document.getElementById("list0").style.height+" in px");
	firstlist.showlist();
}

function getentrytype1(){
	var html="<table><tr>";
	html+="<td><img src='images/robot_sm.jpg' width='20px' height='20px'/></td>";
	html+="<td>you should still say hello</td>";
	html+="</tr></html>";
	return html;
}
function getentrytype3(){
	var html="<table><tr>";
	html+="<td><table border='1'><tr><td> <table><tr><td>who</td><td>dare</td></tr></table> </td></tr><tr><td>don't tread</td></tr></table></td>";
	html+="<td><a href='http://yakit.ca'><font size='2'>yakit client</font></a></td>";
	html+="<td><img src='images/yakit.jpg' width='35px' height='35px'/></td>";
	html+="</tr></html>";
	return html;
}
function getentrytype2(){
	var html="<table><tr>";
	html+="<td><font size='4'><a href='http://en.wikipedia.org/wiki/Hello!_Lady_Lynn'>hello lady</a></font></td>";
	html+="<td><img src='images/yakitlady.png' width='100px' height='50px'/></td>";
	html+="</tr></html>";
	return html;
}