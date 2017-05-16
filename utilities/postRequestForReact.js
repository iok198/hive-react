import ReactDOM from 'react-dom';

function postRequestForReact(url,renderArgs,callback){

var xhttp = new XMLHttpRequest(); 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parsed = JSON.parse(this.responseText);
      var arr = parsed.map((user) => user);
      ReactDOM.render.apply(ReactDOM,renderArgs(arr));
      if(typeof callback == "function"){
      callback(arr)}
    }
  }
  
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("fname=hola");

}

module.exports = postRequestForReact;