$(document).ready(function(){
  $(".editBtn").click(function(){
    const taskId = this.dataset.id
    const taskElementId = "#" + taskId;
    const taskEditFormId = "#edit-form-" + taskId;
    // Display Input Form for item
    $(taskElementId).hide();
    $(taskEditFormId).show();
    console.log('yeah man!!')
  });
});
