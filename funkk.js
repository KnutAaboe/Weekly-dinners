"use strict"

// if (window.performance) {
//   console.info("window.performance works fine on this browser");
// }
// console.info(performance.type);
// if (performance.type == performance.TYPE_RELOAD) {
//   alert("Are you sure you want to refresh page? You lose your cart when you do this")
// } else {
//   console.info( "This page is not reloaded");
// }


// $("#formname_form").submit(function(e) {
//     e.preventDefault();
// });


var clicked;
var clickedNode;

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
            createItem();

        } else {
            document.getElementById("errorMessage").innerHTML = "You have to create a dinner element before putting in items"
        }
        
    }
})

function createDinner(){

    var dinner = document.getElementById("input").value
    var node = document.createElement("ul")
    var list = document.querySelectorAll("ul")

    if (list.length >= 2) {

        for (var i = 1; i < list.length; i++) {
        if ((list[i].id.toLowerCase() == dinner.toLowerCase()) || dinner == "") { //A better solution 

            var result = confirm("You already have this dinner, click OK to add again")

            if (result) {
                break;
            } else {
                dinner = "";
                break;
            }
            
            
    
    }
}

    } 

    if (!(dinner == "")) {
    node.classList.add("t2");
    node.setAttribute("id", dinner); 
    var content = document.createTextNode(dinner)
    node.appendChild(content)
    var element = document.getElementById("tt1")
    element.appendChild(node)

    node.addEventListener("click", function() {

        clicked = dinner;
        clickedNode = node;

        myfunc(node)

    })

    var longPress = 1000;
    var start;

    //some kind of pop up when you have hold for enough time
    node.addEventListener("mousedown", function(e) {
        start = new Date().getTime();
    });

    node.addEventListener("mouseleave", function(e) {
        start = 0;
    });

    node.addEventListener("mouseup", function (e) {
        if (new Date().getTime() >= (start + longPress)) {
            var result = confirm("Click ok to delete dinner")
            if(result){
            node.remove();
            } 
        }

    })



    
    }
    
}

function createItem(){

    var item = document.getElementById("input").value
    var amount = document.getElementById("count").value

    // console.log(clicked.node)
    // var items = clicked.querySelectorAll("li");
    // console.log(items[0])
    // console.log(clicked + "    " + clickedNode)


    if (amount >= 1) {

        // var lilist = document.querySelectorAll("li")
        // var ullist = document.querySelectorAll("ul")
                // for (var i = 1; i < list.length; i++) {
                //     if (list[i].id == clicked) {
                //         var ul = document.getElementById(clicked)
                //     } else if (clicked == null){
                //         alert("Click the dinner you want to add items to")
                //     }
                // }

        if (clickedNode.hasChildNodes() == true) { //Check childnoes in clicked ul
             var items = clickedNode.querySelectorAll("li");

             for (var i = 0;  i < items.length; i++) {
                 var duplicate = false;

                if (item == items[i].id) { //if item is in this ul, there is a dup now
                    duplicate = true;
                    break;
                }
             }

             if (!(duplicate)) { //if there is no dup, then go ahead and insert item to list

                makeItem(item, amount);

               
                 
             } else { //Basicly remove dup and tell user not to do this again
                 document.getElementById("errorMessage").innerHTML = "That item already exist"
             }

        } else {
            makeItem(item, amount);
        }

    } else {
        document.getElementById("errorMessage").innerHTML = "You can't add a negative number of items"
    }



}






function makeItem(item, amount){
    var li = document.createElement("li")
    li.setAttribute("id", item);
    li.setAttribute("value", amount);


    var buttonPlus = document.createElement("button");
    var plus = document.createTextNode("+");
    buttonPlus.appendChild(plus);
    buttonPlus.addEventListener("click", addUnit)
    
    
    var buttonMinus = document.createElement("button");
    var minus = document.createTextNode("-");
    buttonMinus.appendChild(minus);
    buttonMinus.addEventListener("click", removeUnit)
    
    
    var buttonRemove = document.createElement("button");
    buttonRemove.style.backgroundColor = "red"
    var remove = document.createTextNode("X"); 
    buttonRemove.appendChild(remove);
    buttonRemove.addEventListener("click", removeUnit)

    var content = document.createTextNode(item + " " + amount)

    var list = document.querySelectorAll("ul")

    for (var i = 1; i < list.length; i++) {
        if (list[i].id == clicked) {
            var ul = document.getElementById(clicked)
        } else if (clicked == null){
            alert("Click the dinner you want to add items to")
        }
    }

    li.appendChild(content)
    updateItems(li, buttonMinus, buttonPlus, buttonRemove)
    clickedNode.appendChild(li)
    // ul.appendChild(li)


    function addUnit() {
    amount++;
    document.getElementById(item).innerHTML = item + " " + amount
    var ul = document.getElementById(clicked)
    updateItems(li, buttonMinus, buttonPlus, buttonRemove)
}

function removeUnit() {
    if (amount <=1 || this.textContent == "X") { 
        li.remove();
    } else {
        amount--;
        
        document.getElementById(item).innerHTML = item + " " + amount
        updateItems(li, buttonMinus, buttonPlus, buttonRemove)
    }
}

}

}

function updateItems(li, buttonMinus, buttonPlus, buttonRemove){
    li.appendChild(buttonMinus)
    li.appendChild(buttonPlus)
    li.appendChild(buttonRemove)
}

function myfunc(node){
    document.querySelectorAll("ul").forEach(item => item.style.backgroundColor = "transparent");
    node.style.backgroundColor = "pink"

    
}
