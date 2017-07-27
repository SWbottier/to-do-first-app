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
      console.log('client frontEndCode')
      console.log(toDoItem);
      const listItems = ("<li id=" + toDoObj._id + ">" + toDoObj.name + "</li>" + "<form action=\"delete-todo/" + toDoObj._id + "\""  + "method= \"post\" + id=\"" + toDoObj._id + "\"  >" +
      "<button class=\"remove\" type=\"submit\" data-id=\"" + toDoObj._id + "\" id=\"remove\">Remove</button>" +
      "<button class=\"editBtn\" type=\"button\" data-id=\"" + toDoObj._id + "\" id=\"edit\">Edit </button>" +
      "</form>");
      $('.to-do-display').append(listItems)
      var input = document.getElementById("addBox");
      input.value = " ";
    });           //done function }} Closed

  })//addBtn }} Closed

      $(".remove").click(function(event){
        event.preventDefault();
        const delTaskId = (this.dataset.id)
        // console.log(delTaskId)
        console.log("Remove button connected to Server!")

          $.post('/delete-todo/'+delTaskId , function(data){
          console.log(data)

          var toRemove = document.getElementById(data);
          toRemove.remove();
          console.log(data+'removed')

        });
        });



        // const removeId = this.dataset.id

        // $.post( "/delete-todo", function( data ) {
        //   alert( "Data Loaded: " + data );
        // console.log("done deleting ajax");
        //   });



});           //document.ready }} Closed
