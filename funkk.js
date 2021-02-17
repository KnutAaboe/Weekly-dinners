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
            alert("You have to create a dinner element before putting in items")
        }
        
    }
})


function createDinner(){
    var dinner = document.getElementById("input").value
    var node = document.createElement("ul")
    node.classList.add("t2");
    node.setAttribute("id", "dinner");
    var content = document.createTextNode(dinner)
    node.appendChild(content)
    var element = document.getElementById("tt1")
    element.appendChild(node)

}

function createItem(){

    var item = document.getElementById("input").value
    var amount = document.getElementById("count").value

    if (amount >= 1) {
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

        var node = document.createTextNode(item + " " + amount)
        
        var ul = document.getElementById("dinner")
        li.appendChild(node)
        li.appendChild(buttonMinus)
        li.appendChild(buttonPlus)
        li.appendChild(buttonRemove)
        ul.appendChild(li)


    } else {
        alert("You can't add a negative number of items")
    }


//Better solution lol, bug when make a new one that was removed

function addUnit() {
    amount++;
    document.getElementById(item).innerHTML = item + " " + amount;
        
        var ul = document.getElementById("dinner")
        li.appendChild(buttonMinus)
        li.appendChild(buttonPlus)
        li.appendChild(buttonRemove)
}

function removeUnit() {
    if (amount <=1) { // || this == buttonremove etC?=
        // document.getElementById(item).innerHTML = null;
        li.remove();
    } else {
        amount--;

        document.getElementById(item).innerHTML = item + " " + amount;
        
        var ul = document.getElementById("dinner")
        li.appendChild(buttonMinus)
        li.appendChild(buttonPlus)
        li.appendChild(buttonRemove)
    }
}
   
}

// function addUnit() {
//     console.log("horse");
// }

// function removeUnit() {
//     console.log("fish");
// }


}

