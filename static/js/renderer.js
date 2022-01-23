// this is the file that will act as the  renderer process. Honestly some of this stuff doesnt make sense. till then hold on

var Range = ace.require('ace/range').Range;

var old_editor = ace.edit("old_editor");
old_editor.setTheme("ace/theme/monokai");
old_editor.session.setMode("ace/mode/javascript");



var new_editor = ace.edit("new_editor");
new_editor.setTheme("ace/theme/monokai");
new_editor.session.setMode("ace/mode/javascript");


function parseDiff(previous_lists, instance){
  // this is the reduce function callback. essentially we will return two lists and their diffs, the old one and new one
  // the previous lists is a dictionary that has both the lists
  original_list = previous_lists.original_list
  updated_list = previous_lists.updated_list
  column_count = previous_lists.column_count
  row_count = previous_lists.row_count
  original_count = previous_lists.column_count
  updated_count = previous_lists.column_count
  value = instance.value;
  count = instance.count;
  new_instance = {original_list: original_list, updated_list: updated_list, column_count: column_count, row_count: row_count, original_count: original_count, updated_count: updated_count}
  if (instance.added == undefined){
    new_instance.original_list.push(value)
    new_instance.original_count += count
    new_editor.session.addMarker(new Range(1,1,1,count), "green", "text")
  }
  if ( instance.removed == undefined){
    new_instance.updated_list.push(value)
    new_instance.updated_count += count
    old_editor.session.addMarker(new Range(1,1,1,count), "red", "text")
  }
  return new_instance
}

function findDiff(){
  // to do handle every change event and update the diff as necessary
  old_text = old_editor.getSession().getValue();
  new_text = new_editor.getSession().getValue();
  let old_ll = old_editor.getSession().doc.getAllLines();
  let new_ll = new_editor.getSession().doc.getAllLines();

  //diff_list = window.diff.diffChars(old_text, new_text)
  diff_list = window.diff.diffSentences(old_text, new_text)
  console.log(diff_list)
  let { original_list, updated_list } = diff_list.reduce(parseDiff, {original_list: [], updated_list: [], original_count:0, updated_count:0, column_count: 0, row_count: 0});

}

new_editor.on("change", findDiff)
