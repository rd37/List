

function initialize(){
	//alert("init");
	var listmgr = new listmanager();
	var listfcty = new listfactory();
	
	var firstlist = listfcty.createlist(258,"verticle");
	listmgr.addlist(firstlist);
	
	for(var i=0;i<15;i++){
		var divelem = listfcty.createdivelement(firstlist);
	
		try{
			var msgdiv=document.createTextNode("entry "+i);
			//msgdiv.innerHTML="entry "+i;
			if(i%9==0)
				divelem.htmldiv.innerHTML=getentrytype1();
			if(i%9==1)
				divelem.htmldiv.innerHTML=getentrytype2();
			if(i%9==2)
				divelem.htmldiv.innerHTML=getentrytype3();
			if(i%9==3)
				divelem.htmldiv.innerHTML=getentrytype4(i);
			if(i%9==4)
				divelem.htmldiv.innerHTML=getentrytype5(i);
			if(i%9==5)
				divelem.htmldiv.innerHTML=getentrytype6(i);
			if(i%9==6)
				divelem.htmldiv.innerHTML=getentrytype7(i);
			if(i%9==7)
				divelem.htmldiv.innerHTML=getentrytype8(i);
			if(i%9==8)
				divelem.htmldiv.innerHTML=getentrytype9(i);
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
	document.getElementById("list0").appendChild(firstlist.sliderhtmldivelement);
	//console.log(i+" style height "+document.getElementById("list0").style.height+" in px");
	firstlist.showlist();
}
function getentrytype9(index){
	//console.log("retrun movie");
	var html="<embed wmode='transparent' width='120px' height='50px' src='movies/skatersceen.mp4' autostart='true' /><font size='1'>we rule!</font>";
	return html;
}
function getentrytype8(){
	var html="<table><tr>";
	html+="<td><font size='4'><a href='http://www.skates.com/Rollerblade-Parts-s/246780.htm'><font size='1'>yes, ron has rollerblades!they are for sale and he is near you now!</font></a></font></td>";
	html+="<td><img src='images/ronsskates.jpg' width='100px' height='50px'/></td>";
	html+="</tr><tr><td> <table><tr><td><a href='http://www.facebook.com/people/Ron-Desmarais/601411080'><img alt='rons facebook page' width='25px' height='25px' src='images/facebookicon.jpg' /></a></td><td><a href='http://yakit.ca'><img alt='rons present location'  width='25px' height='25px' src='images/mapimg.jpg' /></a></td></tr></table> </td>";
	html+="</tr></html>";
	return html;
}
function getentrytype7(index){
	//console.log("retrun movie");
	var html="<embed wmode='transparent' width='120px' height='50px' src='movies/hackershardcopy.mp4' autostart='true' /><font size='1'>no hard copy</font>";
	return html;
}
function getentrytype4(index){
	//console.log("retrun movie");
	var html="crayola books<embed wmode='transparent' width='110px' height='60px' src='movies/hackers.mp4' autostart='true' />";
	return html;
}
function getentrytype5(index){
	var html="<table><tr>";
	html+="<tr><td><font size='2'>"+index+":get esso gas station attendant to scan this from your mobile phone</font></td></tr>";
	html+="<tr><td><img width='100px' height='50px' src='http://crazy-tattoo-designs.com/bar_code_tattoos.png'/></td></tr>";
	html+="</tr></html>";
	return html;
}
function getentrytype6(index){
	//console.log("retrun movie");
	var html=index+":<embed wmode='transparent'  width='80px' height='60px' src='movies/helloyakit.mp4' autostart='true' /> very nice!";
	return html;
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