// this is the file that will act as the  renderer process. Honestly some of this stuff doesnt make sense. till then hold on

var Range = ace.require('ace/range').Range;

var js_editor = ace.edit("old_editor");
js_editor.setTheme("ace/theme/monokai");
js_editor.session.setMode("ace/mode/javascript");



var python_editor = ace.edit("new_editor");
python_editor.setTheme("ace/theme/monokai");
python_editor.session.setMode("ace/mode/python");



function setValueToPythonDictionary(){
  var elem = document.activeElement;
  if (js_editor.isFocused()){
    old_text = js_editor.getSession().getValue();
    python_text = convertToPythonDictionary(old_text)
    python_editor.setValue(python_text)
  }
}

function setValueToJson(){
  var elem = document.activeElement;
  if (python_editor.isFocused()){
    old_text = python_editor.getSession().getValue();
    js_text = convertToJson(old_text)
    js_editor.setValue(js_text)
  }
}

js_editor.on("change", setValueToPythonDictionary)
python_editor.on("change", setValueToJson)
