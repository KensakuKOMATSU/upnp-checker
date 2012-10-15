var upnp = new UPnP();
upnp.onready = function(){
	upnp.listen(function(e){console.dir(e);})

	console.log("type upnp.search(\"ssdp:all\"); or something (parameter is ST), you'll find UPnP devices.")
}