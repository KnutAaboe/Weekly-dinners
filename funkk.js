"use strict"

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}


function ready() {
    var input = document.getElementById("send");
input.addEventListener("click", function() {
    if (document.getElementById('option').value == 'dinner') {
        createDinner();

    } else {
        var check = document.getElementById("tt1")
        if (check.hasChildNodes() == true) {

            //FIND DINNER
            // var list = document.getElementsByTagName("ul") 
            // for (i = 0, i < list.length; i++;) {


            // }
            createItem();

        } else {
            alert("You have to create a dinner element before putting in items")
        }
        
    }
})


function createDinner(){
    var dinner = document.getElementById("input").value
    var node = document.createElement("ul")
    node.classList.add("t2");
    node.setAttribute("id", "dinner");
    // node.setAttribute("onclick", "getDinner()")
    var content = document.createTextNode(dinner)
    node.appendChild(content)
    var element = document.getElementById("tt1")
    element.appendChild(node)

    // element.addEventListener(click, )

}

function createItem(){
    var item = document.getElementById("input").value
    var amount = document.getElementById("count").value
    if (amount >= 1) {
        var li = document.createElement("li")
        var node = document.createTextNode(item + " " + amount)
        var ul = document.getElementById("dinner")
        li.appendChild(node)
        ul.appendChild(li)


    } else {
        alert("You can't add a negative number of items")
    }



   
}


}

