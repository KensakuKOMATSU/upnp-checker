var Util = {};

(function(){
	// translate text string to Arrayed buffer
	//
	function t2ab_(str /* String */) {
	  var buffer = new ArrayBuffer(str.length);
	  var view = new DataView(buffer);
	  for(var i = 0, l = str.length; i < l; i++) {
	    view.setInt8(i, str.charAt(i).charCodeAt());
	  }
	  return buffer;
	}

	// translate Arrayed buffer to text string
	//
	function ab2t_(buffer /* ArrayBuffer */) {
	  var arr = new Int8Array(buffer);
	  var str = "";
	  for(var i = 0, l = arr.length; i < l; i++) {
	    str += String.fromCharCode.call(this, arr[i]);
	  }
	  console.log(str);
	  return str;
	}

	Util.t2ab = t2ab_;
	Util.ab2t = ab2t_;

}());