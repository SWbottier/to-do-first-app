$(document).ready(function(){                         //document.ready opening{{
  $(".editBtn").click(function(){
    const taskId = this.dataset.id
    const taskElementId = "#" + taskId;
    const taskEditFormId = "#edit-form-" + taskId;
    // Display Input Form for item
    $(taskElementId).hide();
    $(taskEditFormId).show();
  });

  $('#addBtn').click(function(event){                     // addBtn{{ opening
    event.preventDefault();
    $.ajax({                                                // Ajax {{ opening
      method: "POST",
      url: "/add-todo",
      data: { toDo:$( "#addBox" ).val()}
    })                            // Ajax }} Closed
    .done(function( toDoItem ) {                    //done function {{ opening
      const toDoObj = JSON.parse(toDoItem);
      console.log(toDoItem + ' has been Added to Browser!')


      const appended_items = ("<li id=" + toDoObj._id + ">"
      + toDoObj.name + "</li>" + "<form action=\"delete-todo/" + toDoObj._id
      + "\""  + "method= \"post\"  id=\"" + toDoObj._id + "\"  >"
      +"<button class=\"remove " +toDoObj._id+" \" type=\"button\" id=\"remove\"   data-id=\"" + toDoObj._id + "\" >Remove</button>"
      +"<button class=\"editBtn " +toDoObj._id+" \" type=\"button\" data-id=\"" + toDoObj._id + "\" id=\"edit\">Edit </button>"
      +"</form>");

      $('.to-do-display').append(appended_items)
      var input = document.getElementById("addBox");
      input.value = " ";
    });

  })//addBtn }} Closed

      $(document).on('click',".remove", function(event){
        event.preventDefault();
        const delTaskId = (this.dataset.id)
          $.post('/delete-todo/'+delTaskId , function(data){
              const toRemove = "." + data;
              const toRemoveID = "#" + data;
          $(toRemove).remove();
          $(toRemoveID).remove();
          console.log(data + ' ITEM removed!')
        });       //post function Closed
      });       // click function Closed



});           //document.ready }} Closed
