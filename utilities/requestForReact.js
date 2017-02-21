import ReactDOM from 'react-dom';

function requestForReact(url,renderArgs){

var xhttp = new XMLHttpRequest(); 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parsed = JSON.parse(this.responseText);
      var arr = parsed.map((user) => user);
      ReactDOM.render.apply(ReactDOM,renderArgs(arr));
    }
  }
  
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

}

module.exports = requestForReact;