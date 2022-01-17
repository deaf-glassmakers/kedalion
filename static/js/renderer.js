// this is the file that will act as the main renderer process. Honestly some of this stuff doesnt make sense. till then hold on



var old_editor = ace.edit("old_editor");
old_editor.setTheme("ace/theme/monokai");
old_editor.session.setMode("ace/mode/javascript");



var new_editor = ace.edit("new_editor");
new_editor.setTheme("ace/theme/monokai");
new_editor.session.setMode("ace/mode/javascript");

new_editor.addEventListener('click', () => {
  console.log('clicked')
    window.api.send("test", "testdataaaaaa")
})
console.log('test')

