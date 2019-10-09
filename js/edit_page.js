var url = "https://waybill-server.herokuapp.com/invoices",
id;

$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('id')) {
        id = urlParams.get('id');
        getData(id);

        $("#btnAction").click(function(){
            update();
        });
    } else {
        $("#date_created").flatpickr({
            enableTime: false,
            dateFormat: "d.m.Y",
            defaultDate: "today"
        });
    
        $("#date_supply").flatpickr({
            enableTime: false,
            dateFormat: "d.m.Y",
            defaultDate: "today"
        });

        $("#btnAction").click(function(){
            if ($("#number").val() !== "")
                add();
            else 
                alert("Fill required fields!");
        });
    }

    $("#number").on('keydown', function(e){
        if(e.key.length == 1 && e.key.match(/[^0-9]/)){
          return false;
        };
    })
});

function add(){
    $("#btnAction").attr("disabled","disabled");
    $.ajax({
        type: "POST",
        url: url,        
        data: JSON.stringify({
            "number" : +$("#number").val(),
            "direction" : uuidv1(),
            "date_created" : (new Date($("#date_created").val())).getTime(),
            "date_supply" : (new Date($("#date_supply").val())).getTime(),
            "comment" : $("#comment").val(),
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
            window.location.href = "index.html";    
        },
        error:  function(response){
           console.log(response);
           $("#btnAction").removeAttr("disabled");
        }
    });
}

function update(){
    $("#btnAction").attr("disabled","disabled");
    $.ajax({
        type: "PUT",
        url: url + "/" + id,        
        data: JSON.stringify({
            "number" : +$("#number").val(),
            "date_created" : (new Date($("#date_created").val())).getTime(),
            "date_supply" : (new Date($("#date_supply").val())).getTime(),
            "comment" : $("#comment").val(),
            "direction": $("#direction").val()
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
            window.location.href = "index.html";    
        },
        error:  function(response){
           console.log(response);
           $("#btnAction").removeAttr("disabled");
        }
    });
}

function getData(id){
    $.ajax({
        type: "GET",
        url: url + "/" + id,        
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
            $("#number").val(response.number);
            $("#date_created").flatpickr({
                enableTime: false,
                aformat: "d.m.Y",
                altFormat: "d.m.Y",
                altInput: true,
                defaultDate: response.date_created
            });
            $("#date_supply").flatpickr({
                enableTime: false,
                aformat: "d.m.Y",
                altFormat: "d.m.Y",
                altInput: true,
                defaultDate: response.date_supply
            });
            $("#comment").val(response.comment);
            $("#direction").val(response.direction)
        },
        error:  function(response){
           console.log(response);
        }
    });
}