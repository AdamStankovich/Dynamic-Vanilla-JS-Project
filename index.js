
// init global order array
var orderArray;

// grab the stored array string from memory
var storedArray = localStorage.getItem('orderArray')

// check if an order is saved in local storage
if (storedArray != null) {
    // convert JSON string to orderArray
    orderArray = JSON.parse(storedArray);
}
// if an order isnt saved, use the default array order
else {
    orderArray = [0,1,2,3,4,5,6,7]
}

// check if orderarray isnt full, (not all images were clicked)
if (orderArray.length < 8) {
    // recreate default array
    var store = [0,1,2,3,4,5,6,7];
    // check if previously clicked images (orderArray) contains anything from
    // the default array (store)
    for (i = 0; i < orderArray.length; i++) {
        for (k = 0; k < 8; k++) {
            if (orderArray[i] == store[k]) {
                // remove duplicates from store array
                store.splice(k, 1);
            }
        }
    }
    // concatinate what's left of store array to orderArray. 
    // ( fill in the rest of the images that weren't clicked )
    orderArray = orderArray.concat(store);
}

// use slice to make a copy instead of a reference to orderArray
// ( orderArray gets reset to 0 later, so we need another to keep the previous order )
var tempOrder = orderArray.slice();

// map img src to dictionary
const dict = {
    0 : "img/0.png",
    1 : "img/1.png",
    2 : "img/2.png",
    3 : "img/3.png",
    4 : "img/4.png",
    5 : "img/5.png",
    6 : "img/6.png",
    7 : "img/7.png",
}

// render dom with current order array
for (var i = 0; i < 8; i++) {
    document.getElementById(i).src=dict[orderArray[i]];
}

// clear order array for new input
orderArray.length = 0

// dictionary to measure clicks per object
var count = {
    0 : 0,
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0,
    5 : 0,
    6 : 0,
    7 : 0,
};

// print default clicks to screen, which are 0
for (const [key, value] of Object.entries(count)) {
    //write key/value pairs to html (0 - 0)
    document.getElementById("clicks").innerHTML += "image" + key + " - ";
    document.getElementById("clicks").innerHTML += value + "<br>";
};

function clickHandler(clicked_id) {

    // clear html of previous run
    document.getElementById("clicks").innerHTML = "";
    // add clicks to count dictionary
    count[tempOrder[clicked_id]] = count[tempOrder[clicked_id]] + 1;
    // loop thru count dictionary to see how many clicks per key
    for (const [key, value] of Object.entries(count)) {
        //write key/value pairs to html
        document.getElementById("clicks").innerHTML += "image" + key + " - ";
        document.getElementById("clicks").innerHTML += value + "<br>";
    }

    // check if orderArray contains the clicked image already
    if (!orderArray.includes(tempOrder[clicked_id])) {
        // push new clicks to array
        orderArray.push(tempOrder[clicked_id]);
        // convert array to string and store in memory for refresh
        localStorage.setItem('orderArray', JSON.stringify(orderArray));
    }
    else {
        return
    }
};