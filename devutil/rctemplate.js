module.exports = (componentName,surroundingTag) => {
	var templateString = "import React from 'react'\nimport ReactDOM from 'react-dom'\n\nclass " + componentName + " extends React.Component {\n  constructor(props){\n    super(props)\n  }\n  render(){\n    return (<" + surroundingTag +"></" + surroundingTag + ">)\n  }\n}\n\nmodule.exports = " + componentName
	return templateString
}