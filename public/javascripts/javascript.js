$(document).ready(function(){
    var del = document.getElementById('delete')
    var edit = document.getElementById('edit')

    del.addEventListener('click', function () {
      fetch('delete', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
        })
      }).then(function (response) {
        window.location.reload()
      })
    });

    edit.addEventListener('click', function () {
      fetch('put', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ,
        })
      }).then(function (response) {
        window.location.reload()
      })
    })
})
