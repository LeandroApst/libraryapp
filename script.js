var row = $('<tr>');


document.addEventListener('DOMContentLoaded', function() {
  rows = $('table tbody tr')
  var elemsModal = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elemsModal);
  var elemsSelect = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elemsSelect);
  var instance = M.Modal.getInstance(elemsSelect);
  });

  // Para filtrar a Lista
  $(document).ready(function() {  
  // Handle the name search input
  $('#surch').on('input', function() {
    let value = $(this).val().toLowerCase();
    rows.hide();
    rows.filter(function() {
      return $(this).text().toLowerCase().indexOf(value) > -1;
    }).show();
  });
  });

    // Add book in firebase
    $('#addBookForm').submit(function(event){
      event.preventDefault();      
      let id = $('#modal1 #id').val();  
      let name = $('#modal1 #name').val();
      let author = $('#modal1 #author').val();
      let category = $('#modal1 #category').val();
      let corridor = $('#modal1 #corridor').val();
      let shelf = $('#modal1 #shelf').val();
      let availability = $('#modal1 #availability').val();      
      database.ref('library/' + id).set({
        id: id,    
        name: name,
        author: author,
        category: category,
        corridor: corridor,
        shelf: shelf,
        availability: availability
    
      });
      $('#modal1').modal('close');
      $('#addBookForm')[0].reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Livro Salvo ',
        showConfirmButton: false,
        timer: 2500
      })
    });

    function checkDatabase(key){
      database.ref('library/' + key).on('value', function(snapshot){
        if(snapshot.exists()){
          $("#warning").show()
          $("#btn-save").prop("disabled",true);
        }else{
          $("#warning").hide()
          $("#btn-save").prop("disabled",false);
        }
      })
      
      }

  // Read from Firebase and populate table		
  database.ref('library').on('value', function(snapshot){
    let bookList = snapshot.val();
    let booksId = []           
    let table = $('#bookTable tbody');
    table.empty();
    
    $.each(bookList, function(index, book){
      booksId.push(book.id)
      row = $('<tr>');
      row.append($('<td>').text(book.id));
      row.append($('<td>').text(book.name));
      row.append($('<td>').text(book.author));
      row.append($('<td>').text(book.category));
      row.append($('<td>').text(book.corridor));
      row.append($('<td>').text(book.shelf));
      row.append($('<td>').text(book.availability));
      row.append($('<td>').html('<a href="#" onclick="openModal('+book.id+')"><i class="material-icons">edit</i></a>'));
      row.append($('<td>').html('<a href="#" onclick="confirmRevomeItem('+book.id+')"><i class="material-icons">remove_circle</i></a>'));
      table.append(row);
    });
    rows = $('table tbody tr')
   
  });
    	
   // remove book
   function confirmRevomeItem(id){    
    Swal.fire({
      title: 'Remover esse livro?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remover!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem("0" +id)
        Swal.fire(
          'Removido!',
          'O livro foi removido',
          'success'
        )
      }
    })
   }

   function removeItem(id){
		database.ref('library/' + id).remove()
		}

// edit book
function openModal(id){
  let elem = document.querySelector('.modal');
  

  if(id){
  let edit = M.Modal.getInstance(elem);
  let data = {}
  database.ref('library/' + "0"+id).on('value', function(snapshot){
  data = snapshot.val()  
  })
  $("#warning").hide()
  $("#btn-save").prop("disabled",false);
  $("#id").val(data.id)
  $("#id").attr('disabled','true')
  $("#id").removeAttr('onfocusout')  
  $("#name").val(data.name)
  $("#author").val(data.author)
  $("#category").val(data.category)  
  $("#corridor").val(data.corridor)
  $("#shelf").val(data.shelf)
  $("#availability").val(data.availability)
  document.querySelectorAll("#modal1 label").forEach(function(e){
    e.classList.add("active")
  })
  

  var elemsSelect = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elemsSelect); 

  edit.open()
  }
  else{
    let create = M.Modal.getInstance(elem);
    document.querySelector('form').reset()
    $("#warning").hide()
    $("#btn-save").prop("disabled",false);
    $("#id").attr('onfocusout','checkDatabase(this.value)')
    $("#id").removeAttr('disabled')     
    create.open()
  }  
}

function reset(){  
  
}





