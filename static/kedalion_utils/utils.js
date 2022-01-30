
// parses a given diff list and adds marks at the required locations
let parseLine = (previous_lists, instance) => {
  original_list = previous_lists.original_list
  updated_list = previous_lists.updated_list
  old_count = previous_lists.old_count
  new_count = previous_lists.new_count
  value = instance.value;
  count = instance.count;
  new_instance = {original_list: original_list, updated_list: updated_list, old_count:old_count, new_count:new_count }
  if (instance.added == undefined){
    new_instance.original_list.push(value)
    new_instance.new_count += count
    new_editor.session.addMarker(new Range(1,1,1,count), "red", "text")
  }
  if ( instance.removed == undefined){
    new_instance.updated_list.push(value)
    new_instance.old_count += count
    old_editor.session.addMarker(new Range(1,1,1,count), "green", "text")
  }
  return new_instance

}

// given two lists wil generate the necessary difflist and calls the parse line function for each line
let parseLists = (old_list, new_list) => {
  let largn = Math.max(old_list.length, new_list.length)
  for (let i=0; i<largn; i++){
    let old_val = (i < old_list.length) ? old_list[i] : ""
    let new_val = (i < new_list.length) ? new_list[i] : ""
    let diff_list = window.diff.diffChars(old_val, new_val)
    let previous_lists = {old_count:0, new_count:0 }
    diff_list.forEach((instance) => {
      old_count = previous_lists.old_count
      new_count = previous_lists.new_count
      value = instance.value;
      count = instance.count;
      if (instance.added == undefined && instance.removed == undefined){
        old_editor.session.addMarker(new Range(i,old_count,i,old_count+count), "similar", "text")
        new_editor.session.addMarker(new Range(i,new_count,i,new_count+count), "similar", "text")
        previous_lists.old_count += count
        previous_lists.new_count += count
      }
      else if (instance.added == undefined){
        old_editor.session.addMarker(new Range(i,old_count,i,old_count+count), "red", "text")
        previous_lists.old_count += count
      }
      else if ( instance.removed == undefined){
        new_editor.session.addMarker(new Range(i,new_count,i,new_count+count), "green", "text")
        previous_lists.new_count += count
      }
    })
  }
}



// naiive json to python dictionary assuming that the format is already in structured json
let convertToPythonDictionary = (value) => {
  value = value.replace(/true/g, "True")
  value = value.replace(/false/g, "False")
  return value
}

// naiive conversion from pydict to json
let convertToJson = (value) => {
  value = value.replace(/True/g, "true")
  value = value.replace(/False/g, "false")
  value = value.replace(/\'/g, "\"")
  value = value.replace(/false/g, "False")
  return value
}
