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
	this.createlist=function(visible,view,orientation){
		var listret =  new list(visible,view,orientation);
		addlistmouseevents(listret);
		addshowlist(listret);
		return listret;
	};
	this.createdivelement=function(listdiv){
		return new divelement(listdiv);//see div element function
	};
}

function addshowlist(listret){
	listret.showlist=function(){
		if(listret.updated==true){
			listret.calculatedivelementpixellocations();
			listret.updated=false;
		}
		var currlistheight=0;
		var currlistwidth=0;
		
		//listret.updateslider();
		for(var i=0;i<listret.count;i++){
			if(listret.orientation=="verticle"){
				var nextdivelementpixelstart=listret.divelements[i].listpixellocation;
				
				//console.log("elem:"+i+" strtpx:"+nextdivelementpixelstart+" liststrtpx:"+listret.startpixelindex+" yoffset:"+listret.yoffset);
				if(nextdivelementpixelstart>=(listret.startpixelindex+listret.yoffset) && ( (nextdivelementpixelstart+listret.divelements[i].listelemheight)<= ( (listret.startpixelindex+listret.yoffset)+listret.visiblepixels))){
					listret.divelements[i].htmldiv.style.filter="alpha(opacity="+1.0+")";
					listret.divelements[i].htmldiv.style.opacity=""+1.0;
					listret.divelements[i].htmldiv.style.visibility="visible";
					listret.divelements[i].htmldiv.style.display="block";
					listret.divelements[i].htmldiv.style.top=(nextdivelementpixelstart-(listret.startpixelindex+listret.yoffset))+"px";
				}else{
					if((listret.startpixelindex+listret.yoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemheight) && (listret.startpixelindex+listret.yoffset)>nextdivelementpixelstart){
						listret.divelements[i].htmldiv.style.filter="alpha(opacity="+0.5+")";
						listret.divelements[i].htmldiv.style.opacity=""+0.5;
						listret.divelements[i].htmldiv.style.visibility="visible";
						listret.divelements[i].htmldiv.style.display="block";
						listret.divelements[i].htmldiv.style.top=(0)+"px";
						//listret.divelements[i].htmldiv.style.height="10px";
					}else if((listret.visiblepixels+listret.startpixelindex+listret.yoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemheight) && (listret.visiblepixels+listret.startpixelindex+listret.yoffset)>nextdivelementpixelstart){
						listret.divelements[i].htmldiv.style.filter="alpha(opacity="+0.5+")";
						listret.divelements[i].htmldiv.style.opacity=""+0.5;
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
			}else{ // this is for horizontal lists
				var nextdivelementpixelstart=listret.divelements[i].listpixellocationwidth;
				//console.log("elem:"+i+" strtpx:"+nextdivelementpixelstart+" liststrtpx:"+listret.startpixelindex+" yoffset:"+listret.yoffset);
				if(nextdivelementpixelstart>=(listret.startpixelindex+listret.xoffset) && ( (nextdivelementpixelstart+listret.divelements[i].listelemwidth)<= ( (listret.startpixelindex+listret.xoffset)+listret.visiblepixels))){
					//console.log("show item "+i);
					
					listret.divelements[i].htmldiv.style.filter="alpha(opacity="+1.0+")";
					listret.divelements[i].htmldiv.style.opacity=""+1.0;
					listret.divelements[i].htmldiv.style.visibility="visible";
					listret.divelements[i].htmldiv.style.display="block";
					listret.divelements[i].htmldiv.style.left=(nextdivelementpixelstart-(listret.startpixelindex+listret.xoffset))+"px";
				}else{
					if((listret.startpixelindex+listret.xoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemwidth) && (listret.startpixelindex+listret.xoffset)>nextdivelementpixelstart){
						//if(listret.divelements[i].htmldiv.type=="list"){
						//	listret.divelements[i].htmldiv.list.showlist();
						//}
						listret.divelements[i].htmldiv.style.filter="alpha(opacity="+0.5+")";
						listret.divelements[i].htmldiv.style.opacity=""+0.5;
						listret.divelements[i].htmldiv.style.visibility="visible";
						listret.divelements[i].htmldiv.style.display="block";
						listret.divelements[i].htmldiv.style.left=(0)+"px";
						//listret.divelements[i].htmldiv.style.height="10px";
					}else if((listret.visiblepixels+listret.startpixelindex+listret.xoffset)<(nextdivelementpixelstart+listret.divelements[i].listelemwidth) && (listret.visiblepixels+listret.startpixelindex+listret.xoffset)>nextdivelementpixelstart){
						//if(listret.divelements[i].htmldiv.type=="list"){
						//	listret.divelements[i].htmldiv.list.showlist();
						//}
						listret.divelements[i].htmldiv.style.filter="alpha(opacity="+0.5+")";
						listret.divelements[i].htmldiv.style.opacity=""+0.5;
						listret.divelements[i].htmldiv.style.zIndex=997;
						listret.divelements[i-1].htmldiv.style.zIndex=998;
						listret.divelements[i].htmldiv.style.visibility="visible";
						listret.divelements[i].htmldiv.style.display="block";
						listret.divelements[i].htmldiv.style.left=(listret.visiblepixels-listret.divelements[i].listelemwidth)+"px";
					}else{
						listret.divelements[i].htmldiv.style.visibility="hidden";
						listret.divelements[i].htmldiv.style.display="none";
					}
				}
			}
		}
		listret.updateslider();
	};
}
/*
 * call new on this object to create  div element for a list
 * create a new div element div element could be put into a 
 * verticle list or horizontal list or both or many lists.
 */
function divelement(listdiv){
	this.htmldiv=document.createElement("div");
	this.id=getlistid();
	this.htmldiv.setAttribute("id",this.id);
	this.htmldiv.style.position="absolute";
	this.htmldiv.style.border="1px solid #000000";
	this.htmldiv.style.background="#4c5462";
	this.htmldiv.style.visibility="hidden";
	this.htmldiv.style.display="none";
	
	if(listdiv.orientation=="verticle"){
		this.htmldiv.style.width=listdiv.viewpixels+"px";
	}else{
		this.htmldiv.style.height=listdiv.viewpixels+"px";
	}
	this.htmldiv.style.filter="alpha(opacity="+1.0+")";
	this.htmldiv.style.opacity=""+1.0;
	this.htmldiv.onclick=function(){listdiv.clickoccurred(this.id);};
}

//add mouse events to the list for list and the slider
function addlistmouseevents(firstlist){
	firstlist.roothtmldivelement.onmousemove=function(event){
		if(firstlist.orientation=="verticle"){
			if(firstlist.state==1){
				firstlist.xoffset=firstlist.xdown-event.pageX;
				firstlist.yoffset=firstlist.ydown-event.pageY;
				var total=firstlist.startpixelindex+firstlist.yoffset;
				if(total<0)
					firstlist.yoffset=-firstlist.startpixelindex;
				if(total>(firstlist.totalheight-firstlist.visiblepixels)){
					firstlist.yoffset=(firstlist.totalheight-(firstlist.visiblepixels+firstlist.startpixelindex));
				}
				firstlist.showlist();
			}
		}else{
			if(firstlist.state==1){
				firstlist.xoffset=firstlist.xdown-event.pageX;
				firstlist.yoffset=firstlist.ydown-event.pageY;
				var total=firstlist.startpixelindex+firstlist.xoffset;
				if(total<0)
					firstlist.xoffset=-firstlist.startpixelindex;
				if(total>(firstlist.totalwidth-firstlist.visiblepixels)){
					firstlist.xoffset=(firstlist.totalwidth-(firstlist.visiblepixels+firstlist.startpixelindex));
				}
				firstlist.showlist();
			}
		}
	};
	firstlist.roothtmldivelement.onmousedown=function(event){
		if(firstlist.orientation=="verticle"){
			firstlist.state=1;
			firstlist.xdown=event.pageX;
			firstlist.ydown=event.pageY;
		}else{
			firstlist.state=1;
			firstlist.xdown=event.pageX;
			firstlist.ydown=event.pageY;
		}
	};
	firstlist.clickoccurred=function(divid){
		//console.log("div item was click from "+divid);
	};
	firstlist.roothtmldivelement.onmouseup=function(event){
		if(firstlist.orientation=="verticle"){
			firstlist.state=0;
			firstlist.xdown=0;
			firstlist.ydown=0;
			firstlist.startpixelindex+=firstlist.yoffset;
			firstlist.yoffset=0;
		}else{
			firstlist.state=0;
			firstlist.xdown=0;
			firstlist.ydown=0;
			firstlist.startpixelindex+=firstlist.xoffset;
			firstlist.xoffset=0;
		}
	};
	
}
/*
 * This is the list object create and instance of it.
 */
function list(visible,view,orientation){
	this.visiblepixels=visible; //how many visible pixels there are
	this.viewpixels=view;
	this.count=0; //how many have been added
	this.startpixelindex=0; //your start pixel location
	this.state=0;
	this.xdown=0;
	this.ydown=0;
	this.xoffset=0;
	this.yoffset=0;
	this.width=0;
	this.updated=false;
	this.id=getlistid();
	this.orientation=orientation;
	this.roothtmldivelement=document.createElement("div");
	this.roothtmldivelement.setAttribute("id",this.id);
	this.roothtmldivelement.style.position="relative";
	
	if(orientation=="verticle"){
		this.roothtmldivelement.style.height=visible+"px";
		this.roothtmldivelement.style.width=view+"px";
	}else{
		this.roothtmldivelement.style.height=view+"px";
		this.roothtmldivelement.style.width=visible+"px";
	}
	this.sliderhtmldivelement=document.createElement("div");
	this.sliderhtmldivelement.setAttribute("id","slider_"+this.id);
	this.sliderhtmldivelement.style.position="relative";
	this.sliderhtmldivelement.style.zIndex=999;
	
	this.maindivelement=document.createElement("div");
	this.maindivelement.style.position="relative";
	this.maindivelement.style.visibility="visible";
	this.maindivelement.style.display="inline-block";
	this.maindivelement.style.cssFloat = 'left';
	this.maindivelement.appendChild(this.roothtmldivelement);
	this.maindivelement.appendChild(this.sliderhtmldivelement);
	//this.maindivelement.type="list";
	//this.maindivelement.list=this;
	
	this.divelements = new Array();
	
	this.updateslider=function(){
		if(this.orientation=="verticle"){
			/*
			 * set div width static 20 pixels
			 * set div height = ratio of pixel widow over total div height total
			 * set div position to position of start window compared to div height total
			 */
			this.sliderhtmldivelement.style.background="#dddddd";
			this.sliderhtmldivelement.style.border="1px solid #000000";
			this.sliderhtmldivelement.style.width="10px";
			var height = this.visiblepixels*(this.visiblepixels/this.totalheight);
			if(height>this.visiblepixels)
				height=this.visiblepixels;
			this.sliderhtmldivelement.style.height=height+"px";
			this.sliderhtmldivelement.style.visibility="visible";
			var top=this.visiblepixels*((this.startpixelindex+this.yoffset)/this.totalheight)-this.visiblepixels;
			this.sliderhtmldivelement.style.top=top+"px";
			this.sliderhtmldivelement.style.left=(this.viewpixels-10)+"px";
		}else{
			/*
			 * set div height static 20 pixels
			 * set div width = ratio of pixel widow over total div width total
			 * set div position to position of start window compared to div height total
			 */
			this.sliderhtmldivelement.style.background="#dddddd";
			this.sliderhtmldivelement.style.border="1px solid #000000";
			this.sliderhtmldivelement.style.height="10px";
			//figure out height ratio
			var width = this.visiblepixels*(this.visiblepixels/this.totalwidth);
			if(width>this.visiblepixels)
				width=this.visiblepixels;
			this.sliderhtmldivelement.style.width=width+"px";
			this.sliderhtmldivelement.style.visibility="visible";
			var left=this.visiblepixels*((this.startpixelindex+this.xoffset)/this.totalwidth);
			
			this.sliderhtmldivelement.style.top="-10px";
			this.sliderhtmldivelement.style.left=left+"px";
		}
	};
	this.calculatedivelementpixellocations=function(){
		if(this.orientation=="verticle"){
			var totalheight=0;
			for(var i=0;i<this.divelements.length;i++){
				this.divelements[i].htmldiv.style.display="block";
				this.divelements[i].listpixellocation=totalheight;
				this.divelements[i].listelemheight=this.divelements[i].htmldiv.offsetHeight;
				totalheight+=this.divelements[i].htmldiv.offsetHeight-1;
				this.width=this.divelements[i].htmldiv.style.width;
				this.divelements[i].htmldiv.style.display="none";
				
			}
			this.totalheight=totalheight;
		}else{
			var totalwidth=0;
			for(var i=0;i<this.divelements.length;i++){
				this.divelements[i].htmldiv.style.display="block";
				this.divelements[i].listpixellocationwidth=totalwidth;
				this.divelements[i].listelemwidth=this.divelements[i].htmldiv.offsetWidth;
				totalwidth+=this.divelements[i].htmldiv.offsetWidth-1;
				this.height=this.divelements[i].htmldiv.style.height;
				this.divelements[i].htmldiv.style.display="none";
			}
			this.totalwidth=totalwidth;
		}
	};
	//these next two should be the same weather it is verticle or horizontal
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
