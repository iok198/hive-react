import ReactDOM from 'react-dom';

function postRequestForReact(url,bodyJSON,callback){

var xhttp = new XMLHttpRequest(); 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      console.log(text)
      if(typeof callback == "function"){
      callback(text)}
    }
  }
  
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(bodyJSON));

}

module.exports = postRequestForReact;