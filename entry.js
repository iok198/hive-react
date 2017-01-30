import React from 'react';
import ReactDOM from 'react-dom';
var HelloMessage = require('./HelloMessage.js');


ReactDOM.render(
    <HelloMessage name="HumbleJ" />,
    document.getElementById('content')
    );