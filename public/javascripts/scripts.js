
$(document).ready(function(){$(".alert").addClass("in").fadeOut(4500);

  /* swap open/close side menu icons */
  $('[data-toggle=collapse]').click(function(){
    // toggle icon
  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
  });
});

// Load values in task dialog
$('#Task').on('show.bs.modal', function (e) {
  document.getElementById('modalId').value = e.relatedTarget.dataset.id;
  document.getElementById('modalRev').value = e.relatedTarget.dataset.rev;
  document.getElementById('modalTask').value = e.relatedTarget.dataset.task;
  document.getElementById('modalDescription').value = e.relatedTarget.dataset.description;
  document.getElementById('modalDeadlinedate').value = e.relatedTarget.dataset.deadlinedate;
  document.getElementById('modalDeadlinetime').value = e.relatedTarget.dataset.deadlinetime;
  document.getElementById('modalUser').value = e.relatedTarget.dataset.user;
  document.getElementById('modalUser').textContent = e.relatedTarget.dataset.user;
  document.getElementById('modalProject').value = e.relatedTarget.dataset.project;
  document.getElementById('modalProject').textContent = e.relatedTarget.dataset.project;
  document.getElementById('modalUnit').value = e.relatedTarget.dataset.unit;
  document.getElementById('modalUnit').textContent = e.relatedTarget.dataset.unit;
  document.getElementById('modalEstimated').value = e.relatedTarget.dataset.estimated;
  document.getElementById('modalSpent').value = e.relatedTarget.dataset.spent;
  document.getElementById('modalPriority').value = e.relatedTarget.dataset.priority;
  document.getElementById('modalStatus').value = e.relatedTarget.dataset.status;
  document.getElementById('modalStatus').textContent = e.relatedTarget.dataset.status;
  document.getElementById('modalCreated').value = e.relatedTarget.dataset.created;
  document.getElementById('modalCreator').value = e.relatedTarget.dataset.creator;
})
