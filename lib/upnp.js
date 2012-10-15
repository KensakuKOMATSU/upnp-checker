var UPnP;

(function(){ 
  /**
   * utilities
   *
   */
  var socket = chrome.experimental.socket || chrome.socket;


  /**
   * You can find API documentaion for raw socket api in 
   * http://code.google.com/chrome/extensions/trunk/experimental.socket.html
   *
   */

  // SSDP definitions
  var M_SEARCH_REQUEST_ = [
    "M-SEARCH * HTTP/1.1",
    "MX: 3",
    "HOST: {{mip}}:{{port}}",
    "MAN: \"ssdp:discover\"",
    "ST: {{st}}",
    "",
    ""
  ],
  CR = "\r\n"

  var M_SEARCH_REQUEST = M_SEARCH_REQUEST_.join(CR);


  // UPnP classes
  UPnP = function(){
    this.sid = null;
    this.MIP_ = "239.255.255.250";
    this.PORT_ = 1900;
    this.req = M_SEARCH_REQUEST.replace("{{mip}}", this.MIP_).replace("{{port}}", this.PORT_)

    var self = this;
    socket.create('udp', {}, function(socketInfo) {
      self.sid = socketInfo.socketId;
      socket.bind(self.sid, "0.0.0.0", 0, function(res) {
        if(res !== 0) {
          throw('cannot bind socket');
        }
        self.onready();
      });
    });
  }

  // interface to onready
  UPnP.prototype.onready = function() {
  }

  // do M-SEARCH
  UPnP.prototype.search = function(st /* search type */, callback /* function */) {
    if(!!this.sid === false) {
      throw('socket id is not allocated');
    }

    var ssdp = this.req.replace("{{st}}", st);
    console.log(ssdp);
    var buffer = Util.t2ab(ssdp);
    var closure_ = function(e){
      if(e.bytesWritten < 0) {
        throw("an Error occured while sending M-SEARCH : "+e.bytesWritten);
      }
      console.log("=== SENT UPnP M-SEARCH ===");
      console.dir(e);

      if(typeof(callback) === "function")
        callback();
    }

    // send M-SEARCH twice times
    for(var i = 0; i < 2; i++) {
      socket.sendTo(this.sid, buffer, this.MIP_, this.PORT_, function(e) {
        closure_(e);
      });
    }
  }

  // listen response to M-SEARCH
  UPnP.prototype.listen = function(callback) {
    if(!!this.sid === false) {
      throw('socket id is not allocated');
    }

    var self = this;
    var closure_ = function(recv){
      console.log("=== RECV UPnP packet from "+recv.address+"===");
      console.log(recv);
      recv.data = Util.ab2t(recv.data);
      if(typeof(callback) === "function") {
        callback(recv);
      }
      self.listen(callback);
    }

    socket.recvFrom(this.sid, function(recv) {
      closure_(recv);
    });
  }
  // destroy socket
  UPnP.prototype.destroy = function() {
    socket.destroy(this.sid);
    this.sid = null;
  }
}());
