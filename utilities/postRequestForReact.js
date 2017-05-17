import ReactDOM from 'react-dom';

function postRequestForReact(url,callback){

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
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send({fname:'hallllloooo'});

}

module.exports = postRequestForReact;