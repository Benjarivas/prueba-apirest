let urlRest = 'http://localhost:8000/api/editoriales';

$(document).ready(function(){
    
    getEditoriales();
    
    $("#newEditorial").on("click", function(e){
        $("#newForm").toggle();
    });

    /*$("#ocultarEditorial").on("click", function(e){
        $("#updateForm").toggle();
    });*/
    
    function getEditoriales(){
        $('#tutorialsBody').html('');
        $.ajax({
            url: urlRest,
            method: 'get',
            dataType: 'json',
            data: {
                test: 'test data'
            },
            success: function(data) {
                $(data).each(function(i, tutorial){
                    $('#tutorialsBody').append($("<tr>")
                                            .append($("<td>").append(tutorial.codigo_editorial))
                                            .append($("<td>").append(tutorial.nombre_editorial))
                                            .append($("<td>").append(tutorial.contacto))
                                            .append($("<td>").append(tutorial.telefono))                                            
                                            .append($("<td>").append(`
                                                <i class="fas fa-edit editEdi" data-edidxd="`+tutorial.codigo_editorial+`"></i> 
                                                <i class="fas fa-trash deleteEdi" data-edidxd="`+tutorial.codigo_editorial+`"></i>
                                            `)));
                    });
                loadButtons();
                }
        });
    }
    
    function getEditorial(id){
        $.ajax({
            url: urlRest+'/'+ id,
            method: 'get',
            dataType: 'json',
            success: function(data) {
                $($("#updateForm")[0].editID).val(data.codigo_editorial);
                $($("#updateForm")[0].updateNombre).val(data.nombre_editorial);
                $($("#updateForm")[0].updateContacto).val(data.contacto);
                $($("#updateForm")[0].updateTelefono).val(data.telefono);                
                $("#updateForm").show();
            }
        });
    }
    
    $("#submitEditorial").on("click", function(e) {
       let data = {
           codigo_editorial: $($("#newForm")[0].codigoxd).val(),
           nombre_editorial: $($("#newForm")[0].nombrexd).val(),
           contacto: $($("#newForm")[0].contactoxd).val(),
           telefono: $($("#newForm")[0].telefonoxd).val()
       } 
       
        postEditorial(data);
        $("#newForm").trigger("reset");
        $("#newForm").toggle();
        e.preventDefault();
       
    });
    
    
    function postEditorial(data) {
        $.ajax({
            url: urlRest,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(data) {
                console.log(data);
                getEditoriales();
            }
        });
    }
    
    function loadButtons() {
        $(".editEdi").click(function(e){
            getEditorial($($(this)[0]).data("edidxd"));
            e.preventDefault();
        });
        
        $(".deleteEdi").click(function(e){
            deleteEditorial($($(this)[0]).data("edidxd"));
            e.preventDefault();
        })
    }
    
    function putEditorial(id, data){
        $.ajax({
            url: urlRest+'/'+ id,
            method: 'PUT',
            dataType: 'json',
            data: data,
            success: function(data) {
                console.log(data);
                getEditoriales();
            }
        });
    }
    
    $("#updateEditorial").on("click", function(e) {
       let data = {
           //codigo_editorial: $($("#updateForm")[0].updateCodigo).val(),
           nombre_editorial: $($("#updateForm")[0].updateNombre).val(),
           contacto: $($("#updateForm")[0].updateContacto).val(),
           telefono: $($("#updateForm")[0].updateTelefono).val()
       } 
       
        putEditorial($($("#updateForm")[0].editID).val(), data);
        $("#updateForm").trigger("reset");
        $("#updateForm").toggle();
        e.preventDefault();
       
    });
    

    
    function deleteEditorial(id){
        $.ajax({
            url: urlRest+'/'+ id,
            method: 'DELETE',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                getEditoriales();
            }
        });
    }
    
});
  
