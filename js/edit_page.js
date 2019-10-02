var url = "https://waybill-server.herokuapp.com/invoices";

$(document).ready(function(){
    $("#btnAction").click(function(){
        add();
    });
});

function add(){
    $.ajax({
        type: "POST",
        url: url,        
        data: JSON.stringify({
            "number" : +$("#number").val(),
            "date_created" : $("#date_created").val(),
            "date_supply" : $("#date_supply").val(),
            "comment" : $("#comment").val(),
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
            window.location.href = "index.html";    
        },
        error:  function(response){
           console.log(response);
        }
    });
}