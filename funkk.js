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


var clickedNode;
// document.getElementById("errorMessage").innerHTML = 'No dinner just items? No problem, just make a dinner named "other" or split into categories '
//<br>
//There can't be any words longer than 16 characters, try to break it up
//a good info start about what you can and cant do??

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
    document.getElementById("errorMessage").innerHTML = ""
    var dinner = document.getElementById("input").value
    var node = document.createElement("ul")
    var dive = document.getElementById("tt1")
    var list = dive.querySelectorAll("ul")

    if (dinner.length <= 16) {

        

    if (list.length >= 1) {

        for (var i = 0; i < list.length; i++) {
        if ((list[i].id.toLowerCase() == dinner.toLowerCase()) || dinner == "") {

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
} else {
    document.getElementById("errorMessage").innerHTML = "There can't be any words longer than 16 characters, try to break it up"

}
    
}

function createItem(){

    var item = document.getElementById("input").value
    var amount = document.getElementById("count").value

    if (amount >= 1) {

        if (clickedNode != undefined) { 

            if (clickedNode.hasChildNodes() == true) {
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
        }
        } else {
                document.getElementById("errorMessage").innerHTML = "Click on dinner";
            
        }

    } else {
        document.getElementById("errorMessage").innerHTML = "You can't add a negative number of items"
    }



}






function makeItem(item, amount){
    document.getElementById("errorMessage").innerHTML = "";
    var li = document.createElement("li")
    li.setAttribute("id", item);
    li.setAttribute("value", amount);


    var buttonPlus = document.createElement("button");
    buttonPlus.style.backgroundColor = "white"
    var plus = document.createTextNode("+");
    buttonPlus.appendChild(plus);
    buttonPlus.addEventListener("click", addUnit)
    
    
    var buttonMinus = document.createElement("button");
    buttonMinus.style.backgroundColor = "white"
    var minus = document.createTextNode("-");
    buttonMinus.appendChild(minus);
    buttonMinus.addEventListener("click", removeUnit)
    
    var buttonRemove = document.createElement("img");
    buttonRemove.setAttribute("src", "Images/trashcan.jpg")
    buttonRemove.setAttribute("id", "x");
    buttonRemove.addEventListener("click", removeUnit)

    var content = document.createTextNode(item + " " + amount)

    var list = document.querySelectorAll("ul")

    var content = document.createTextNode(item + " " + amount + " ")
    li.appendChild(content)
    updateItems(li, buttonMinus, buttonPlus, buttonRemove)
    clickedNode.appendChild(li)

    li.appendChild(content)
    updateItems(li, buttonMinus, buttonPlus, buttonRemove)
    clickedNode.appendChild(li)


    function addUnit() {
            var list = clickedNode.querySelectorAll("li");

        if (clickedNode.id === li.parentNode.id) {
    for (var i = 0; i < (list.length); i++){

            if (item == list[i].id){



                amount++;
                list[i].innerHTML = item + " " + amount + " ";
                updateItems(li, buttonMinus, buttonPlus, buttonRemove)
                break;
            } 

        }
            


        }

        
}

function removeUnit() {
    
    if (clickedNode.id === li.parentNode.id) {

        if (amount <=1 || this.id == "x") { 
        li.remove();
    } else {
        var list = clickedNode.querySelectorAll("li");
        for (var i = 0; i < (list.length); i++){

            if (item === list[i].id){
                amount--;
                list[i].innerHTML = item + " " + amount + " ";
                updateItems(li, buttonMinus, buttonPlus, buttonRemove)
                break;
            } 

        }
    }

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
    node.style.backgroundColor = "whitesmoke"

    
}
