
// this is the file that will act as the  renderer process. Honestly some of this stuff doesnt make sense. till then hold on

var Range = ace.require('ace/range').Range;

var old_editor = ace.edit("old_editor");
old_editor.setTheme("ace/theme/tomorrow_night");
old_editor.session.setMode("ace/mode/plain_text");



var new_editor = ace.edit("new_editor");
new_editor.setTheme("ace/theme/tomorrow_night");
new_editor.session.setMode("ace/mode/plain_text");



function findDiff(){
  old_text = old_editor.getSession().getValue();
  new_text = new_editor.getSession().getValue();
  let old_ll = old_editor.getSession().doc.getAllLines();
  let new_ll = new_editor.getSession().doc.getAllLines();
  console.log("oooooh")
  parseSentences(old_ll, new_ll)

}

new_editor.on("change", findDiff)
old_editor.on("change", findDiff)
