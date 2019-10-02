var url = "https://waybill-server.herokuapp.com/invoices",
    filter = {};
$(document).ready(function(){
    getItem();

    $("#tableItems").click(function(event){
        var elem = event.target;
        if (elem.getAttribute("attr-type") === "edit") {
            window.location.href = "edit_page.html?id=" + elem.getAttribute("attr-id");
        } else if (elem.getAttribute("attr-type") === "delete") {
            deleteItem(elem.getAttribute("attr-id"));
        }
    });

    $("#addNew").click(function(){
        window.location.href = "edit_page.html";
    })
})

function getItem(){
    $("#tableItems").empty();
    $.ajax({
        type: "GET",
        url: url,        
        data: filter,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
            response.forEach(function(element){
                var newRowContent = '<tr id="row-'+element.id+'">\
                    <th scope="row">'+ element.id+'</th>\
                    <td>'+ element.date_created +'</td>\
                    <td>'+ element.number +'</td>\
                    <td>'+ element.date_supply +'</td>\
                    <td>'+ element.comment +'</td>\
                    <td>\
                        <button attr-id="'+ element.id +'" attr-type="edit" class="btn btn-primary">Edit</button>\
                        <button attr-id="'+ element.id +'" attr-type="delete" class="btn btn-danger">Delete</button>\
                    </td></tr>'
            $("#tableItems").append(newRowContent); 
            })
        }
    });
}

function deleteItem(id) {
    $.ajax({
        type: "DELETE",
        url: url + "/" + id,      
        dataType: 'json',
        success: function(response){
            console.log("элемент удален", response);
            $("#row-"+id).remove();
        }
    });
}