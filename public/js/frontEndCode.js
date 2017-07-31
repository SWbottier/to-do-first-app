$(document).ready(function(){                         //document.ready opening{{
  $(".editBtn").click(function(){
    const taskId = this.dataset.id
    const taskElementId = "#" + taskId;
    const taskEditFormId = "#edit-form-" + taskId;
    // Display Input Form for item
    $(taskElementId).hide();
    $(taskEditFormId).show();
  });

  $('#add-to-do').submit(function(event){                     // addBtn{{ opening
    event.preventDefault();
    $.ajax({                                                // Ajax {{ opening
      method: "POST",
      url: "/add-todo",
      data: { toDo:$( "#addBox" ).val()}
    })                            // Ajax }} Closed
    .done(function( toDoItemHtml ) {                    //done function {{ opening
      // const toDoObj = JSON.parse(toDoItemHtml);
      console.log(toDoItemHtml + ' has been Added to Browser!')

      // const appended_items = ("<div class=\"to-do-" + toDoObj._id + "\">" +
      //   "<li id=" + toDoObj._id + ">"
      // + toDoObj.name + "</li>" + "<form action=\"delete-todo/" + toDoObj._id
      // + "\""  + "method= \"post\"  id=\"" + toDoObj._id + "\"  >"
      // +"<button class=\"remove " +toDoObj._id+" \" type=\"button\" id=\"remove\"   data-id=\"" + toDoObj._id + "\" >Remove</button>"
      // +"<button class=\"editBtn " +toDoObj._id+" \" type=\"button\" data-id=\"" + toDoObj._id + "\" id=\"edit\">Edit </button>"
      // +"</form> </div>");

      $('.to-do-display').append(toDoItemHtml)
      var input = document.getElementById("addBox");
      input.value = " ";
    });

  })//addBtn }} Closed

      $(document).on('click',".remove", function(event){
        event.preventDefault();
        const delTaskId = (this.dataset.id)
          $.post('/delete-todo/'+delTaskId , function(data){
            const toRemoveClass = ".to-do-" + data;
            $(toRemoveClass).remove();
            console.log(data + ' ITEM removed!')
        });       //post function Closed
      });       // click function Closed



});           //document.ready }} Closed
