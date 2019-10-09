var url = "https://waybill-server.herokuapp.com/invoices";
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
    });

    $("#go").click(function(){
        getItem(getFilters());
    });

    $("#searchItem").change(function(){
        if ($("#searchItem option:selected").val() == "Create date" ||
            $("#searchItem option:selected").val() == "Sypple date"){
                $("#fullSearch").hide();
                $("#dateSearch").next().show();
        } else{
            $("#fullSearch").show();
            $("#dateSearch").next().hide();
        }
    })

    $("#dateSearch").flatpickr({
        enableTime: false,
        aformat: "d.m.Y",
        altFormat: "d.m.Y",
        altInput: true,
        defaultDate: "today"
    });
    $("#dateSearch").next().hide();
})

function getFilters(){
    var filter = {};
    switch ($("#searchItem option:selected").val()){
        case "all":
            filter.q = $("#fullSearch").val();
            break;
        case "Create date":
            filter.date_created =  (new Date($("#dateSearch").val())).getTime();
            break;
        case "Sypply date":
            filter.date_supply =  (new Date($("#dateSearch").val())).getTime();
            break; 
        case "Number":
            filter.number = $("#fullSearch").val();
            break;     
        case "Comment":
            filter.comment = $("#fullSearch").val();
            break;    
        default:
            break;
    }
    if ($("#orderDirection option:selected").attr("name") !== "nothing") {
        filter._sort = $("#orderItem option:selected").attr("name");
        filter._order = $("#orderDirection option:selected").attr("name");
    }
    return filter;
}

function getItem(filter){
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
                    <td>'+ new Date(element.date_created).toLocaleDateString() +'</td>\
                    <td>'+ element.number +'</td>\
                    <td>'+ new Date(element.date_supply).toLocaleDateString() +'</td>\
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