var listids=0;

function getlistid(){
	return "list"+(++listids);	
}

/*
 * create an instance of this if going to manage more than one list
 */
function listmanager(){
	this.lists = new Array();
	this.addlist=function(list){
		this.lists.push(list);
	};
	this.removelist=function(list){
		this.lists.remove(list);
	};
}

/*
 * create an instance of this to create lists and the lists entries
 */
function listfactory(){
	this.createlist=function(visible,orientation){
		var listret =  new list(visible,orientation);
		addlistmouseevents(listret);
		addshowlist(listret);
		return listret;
	};
	this.createdivelement=function(listdiv){
		return new divelement(listdiv);
	};
}

function addshowlist(listret){
	listret.showlist=function(){
		//console.log("state "+this.state+" visible "+this.visiblepixels+" start pixel index "+this.startpixelindex);
		if(listret.updated==true){
			listret.calculatedivelementpixellocations();
			listret.updated=false;
			//console.log("update the element pixel locations");
		}
		var currlistheight=0;
		var currlistwidth=0;
		for(var i=0;i<listret.count;i++){
			var nextdivelementpixelstart=listret.divelements[i].listpixellocation;
			//console.log("elem:"+i+" strtpx:"+nextdivelementpixelstart+" liststrtpx:"+listret.startpixelindex+" yoffset:"+listret.yoffset);
			if(nextdivelementpixelstart>=(listret.startpixelindex+listret.yoffset) && ( (nextdivelementpixelstart+listret.divelements[i].listelemheight)<= ( (listret.startpixelindex+listret.yoffset)+listret.visiblepixels))){
				if(listret.orientation=="verticle"){
					//console.log("show div element "+i);
					listret.divelements[i].htmldiv.style.visibility="visible";
					listret.divelements[i].htmldiv.style.display="block";
					listret.divelements[i].htmldiv.style.top=(nextdivelementpixelstart-(listret.startpixelindex+listret.yoffset))+"px";
				}
			}else{
				if((listret.startpixelindex+listret.yoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemheight) && (listret.startpixelindex+listret.yoffset)>nextdivelementpixelstart){
					listret.divelements[i].htmldiv.style.visibility="visible";
					listret.divelements[i].htmldiv.style.display="block";
					listret.divelements[i].htmldiv.style.top=(0)+"px";
				}else if((listret.visiblepixels+listret.startpixelindex+listret.yoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemheight) && (listret.visiblepixels+listret.startpixelindex+listret.yoffset)>nextdivelementpixelstart){
					listret.divelements[i].htmldiv.style.zIndex=998;
					listret.divelements[i-1].htmldiv.style.zIndex=999;
					listret.divelements[i].htmldiv.style.visibility="visible";
					listret.divelements[i].htmldiv.style.display="block";
					listret.divelements[i].htmldiv.style.top=(listret.visiblepixels-listret.divelements[i].listelemheight)+"px";
				}else{
					listret.divelements[i].htmldiv.style.visibility="hidden";
					listret.divelements[i].htmldiv.style.display="none";
				}
			}
		}
	};
}

function divelement(listdiv){
	this.htmldiv=document.createElement("div");
	this.id=getlistid();
	this.htmldiv.setAttribute("id",this.id);
	//this.htmldiv.setAttribute("class","innerdivclass");
	this.htmldiv.style.position="absolute";
	this.htmldiv.style.border="1px solid #000000";
	this.htmldiv.style.background="#4c5462";
	this.htmldiv.style.visibility="hidden";
	this.htmldiv.style.display="none";
	this.htmldiv.style.width="200px";
	this.htmldiv.onclick=function(){listdiv.clickoccurred(this.id);};
}

function addlistmouseevents(firstlist){
	firstlist.roothtmldivelement.onmousemove=function(event){
		if(firstlist.state==1){
			//firstlist.xoffset=event.pageX-firstlist.xdown;
			//firstlist.yoffset=event.pageY-firstlist.ydown;
			firstlist.xoffset=firstlist.xdown-event.pageX;
			firstlist.yoffset=firstlist.ydown-event.pageY;
			var total=firstlist.startpixelindex+firstlist.yoffset;
			if(total<0)
				firstlist.yoffset=-firstlist.startpixelindex;
			if(total>(firstlist.totalheight-firstlist.visiblepixels)){
				firstlist.yoffset=(firstlist.totalheight-(firstlist.visiblepixels+firstlist.startpixelindex));
			}
			//console.log("yoff "+firstlist.yoffset+", STRTINDEX: "+firstlist.startpixelindex+":: total "+total);
			firstlist.showlist();
		}else{
			//console.log("list div mouse must be up "+firstlist.state);
		}
	};
	firstlist.roothtmldivelement.onmousedown=function(event){
		firstlist.state=1;
		firstlist.xdown=event.pageX;
		firstlist.ydown=event.pageY;
		//firstlist.calculatedivelementpixellocations();
		//console.log("mouse down start pixel index "+firstlist.startpixelindex+"x "+firstlist.xdown+" y "+firstlist.ydown);
	};
	firstlist.clickoccurred=function(divid){
		//console.log("div item was click from "+divid);
	};
	
	firstlist.roothtmldivelement.onmouseup=function(event){
		//console.log("mouse up last startpixel index "+firstlist.startpixelindex);
		firstlist.state=0;
		firstlist.xdown=0;
		firstlist.ydown=0;
		firstlist.startpixelindex+=firstlist.yoffset;
		
		//console.log("mouse up new startpixel index "+firstlist.startpixelindex+" offsety was "+firstlist.yoffset);
		firstlist.yoffset=0;
	};
	
}
function list(visible,orientation){
	this.visiblepixels=visible; //how many visible pixels there are
	this.count=0; //how many have been added
	this.startpixelindex=0; //your start pixel location
	this.state=0;
	this.xdown=0;
	this.ydown=0;
	this.xoffset=0;
	this.yoffset=0;
	this.updated=false;
	this.id=getlistid();
	this.orientation=orientation;
	this.roothtmldivelement=document.createElement("div");
	this.roothtmldivelement.setAttribute("id",this.id);
	this.roothtmldivelement.style.position="relative";
	this.divelements = new Array();
	
	this.calculatedivelementpixellocations=function(){
		var totalheight=0;
		for(var i=0;i<this.divelements.length;i++){
			this.divelements[i].htmldiv.style.display="block";
			//console.log("offset height total is  div item i "+i+" height is "+totalheight);
			this.divelements[i].listpixellocation=totalheight;
			this.divelements[i].listelemheight=this.divelements[i].htmldiv.offsetHeight;
			totalheight+=this.divelements[i].htmldiv.offsetHeight-1;
			this.divelements[i].htmldiv.style.display="none";
		}
		this.totalheight=totalheight;
	};
	this.adddivelement=function(divelement){
		this.divelements.push(divelement);
		this.count++;
		this.roothtmldivelement.appendChild(divelement.htmldiv);
		this.updated=true;
	};
	this.removedivelement=function(divelement){
		this.divelements.Delete(divlement);
		this.count--;
		this.roothtmldivelement.removeChild(divelement.htmldiv);
		this.updated=true;
	};

}
