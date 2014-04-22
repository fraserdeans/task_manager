$(document).ready(function(){
  
  $("[data-input='task-complete']").click(function(){
    var taskId = $(this).parents("[data-task]").data('task');
    var isChecked = $(this).is(":checked");
    $.ajax("/tasks/"+taskId, { 
      type: "PUT", 
      data: { 
        complete: isChecked 
      } 
    });
  })


  

})