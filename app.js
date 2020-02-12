// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");

// Added movieHistory **1
var movieHistory = document.querySelector("#movieHistoryCard");

// Added myMOvies object **2
var myMovies = {
    
};

//  localstorage
if(localStorage.getItem("myMovies")) {
    myMovies = JSON.parse(localStorage.getItem("myMovies"));
    updateMovieHistory();
}


// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}

function updateMovieHistory(movie) {

    var myTable= `
    <h5 class="card-title">Movie History</h5>
    <table id="movieHistoryTable">
        <tr>
            <th style='width: 400px;'>Title</th>
            <th style='width: 400px; text-align: right;'>Watched</th>
        </tr>
        ${  // map method here
            Object.keys(myMovies).map(function (key) {
                return `<tr><td>${key}</td><td style='text-align: right;'>${myMovies[key]}</td></tr>`           
                }).join("")
                // The map method here takes each item in the array myMovies and returns an array modified
                // with the following function. In this case, each object in myMovies creates a table row,
                // where one cell is created for the object key and another for the object value. 
        }
    </table>
    `;
    movieHistory.innerHTML = myTable;
}

function keyExists(value, obj) {
    obj = Object.keys(obj); 
    for (var i = 0; i < obj.length; i++) {
      if (value.toLowerCase() === obj[i].toLowerCase()) { return obj[i]; }
    }
    return false;
  }

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;

    var keyFound = keyExists(userTypedText, myMovies);

    if(!keyFound) {
        // Step 2: Create an empty <li></li>
        var li = document.createElement("li"); // <li></li>

        // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
        var textToInsert = document.createTextNode(userTypedText);

        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        li.appendChild(textToInsert);

        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        myMovieList.appendChild(li);
    }

    // Insert movie into Object

    if(keyFound) {
        myMovies[keyFound] = myMovies[keyFound] + 1 || 1;
        localStorage.setItem("myMovies", JSON.stringify(myMovies));
    } else {
        myMovies[userTypedText] = myMovies[userTypedText] + 1 || 1;
        localStorage.setItem("myMovies", JSON.stringify(myMovies));
    }
    
    // Step 6: Call the clearInput function to clear the input field
    clearInput();

    // **3 Add to myMovies Object: watched zero times
    updateMovieHistory(userTypedText);
}
