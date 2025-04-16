

/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */


async function getData(){ // The getData() function is async because using the await keyword with
                          // the fetch function to resolve the returned promise requires that the top level
                          // module (outer function) be an async type that returs a promise

  // fetch(url) called ==> returns a promise, resolves into a response ==> response.json() called to extract
  // json data ==> if response state is unsuccessful, an error will be thrown

  try{ 
    // await fetch(url) (asynchronous function), returns promise in fulfilled or rejected state
    const reponse = await fetch("./us_senators.json");
    // await response.json(), returns a promise state is fulfilled (json data successfuly extracted) or rejected
    const data = await response.json(); 
    console.log(data) // ==> problem, this needs to be accessed outside of the getData() function, and because we used 
                      // await, the getData() function had to be of type returns a promise rather than a custom value
  }
  catch(error){
    console.log("Error in resolving data request or obtaining json formatting. Error: " + error)
  }
  
}



// *************** FETCH DATA ******************

// {START SEQUENCE} fetch request to url ==>
  // returns promise (pending, fulfilled) ==>
  // .then() handles promise and resolves the promise into a response ==>
  // resopnse is analyzed for errors, if response is failed an Error instance is thrown ==>
  // error is caught and displayed by .catch() method {END SEQUENCE 1}
  // otherwise, response.json() is returned, which is a promise-type method as well ==>
  // in an external function, getJasonData() is called ==>
  // the response.json() return value is handled as a promise by another .then() method ==>
  // .then() resolves the promise into a response that is the data in json format ==>
  // data is manipulated internally depending on use case {END SEQUENCE 2}


const url = "./us_senators.json";

function getJsonData(){
 return fetch(url).then(response => {
  if(!response.ok){ // A Response instance has the boolean property value ok, that returns true if 
                   // HTTP status code issuccessful (bettween 200 and 299)
    throw new Error(`Response status code ${response.status}`); // If promise resolves into a failed response, we return an 
                                                              // Error instance with a specific message to be caught down the chain
  } // error thrown ==> caught in catch method and handling code is executed
  console.log(`Successful fetch!`)
  return response.json() // returning response.json() which itself is a method that returns a promise that resolves 
                        // into a response ==> must be handled by an other .then() method externally, where we would access 
                        // the data for different purposes (formatting, filtering, sorting, etc.)           
 }).catch(error => {console.log(`Fetching data failed ==> ${error}`)}) // Error instance is caught and message is displayed
}

// Due to the nature of the fetch API, the Json data can't be stored in a single variable unless explicitly defined in JavaScript.
// We resolve each returned promise separately to extract the Json data and handle it according to the function's purpose.

// *************** CREATE AND DISPLAY CARDS *************

function showAllCards(){
  // .then() method passes forward data, which is the json data extracted from the previous Fetch request with response.json()
  // a custom callback function will be made to manipulate the json data 
  getJsonData().then(data => {

    senatorsArr = data.objects; // grabbing array of objects, array length = 100, one for each U.S Senator
    console.log(`Json data: ${data}`)

    console.log(`There are ${senatorsArr.length} senators in Congress.`)
    createCardList(senatorsArr); // pass an array with all 100 objects to the createCardList function to display all members of the Senators  
})
}

function showByParty(partyName){
  getJsonData().then(data => {
    senatorsArr = data.objects;
    senatorsRepArr = [];

    // If the object party property has a value of a specific party ("Republican", "Democrat"), it will
    // be added to a new sorted array holding senator objects from just that party.
    for(let i = 0; i < senatorsArr.length; i++){
      
      if (senatorsArr[i].party == partyName){ 
        senatorsRepArr.push(senatorsArr[i]);
      }
    }

    console.log(`There are ${senatorsRepArr.length} ${partyName} senators in Congress.`)

    createCardList(senatorsRepArr); // Create list of cards from the shortened array of senator objects sorted by party.
  })
}


function createCardList(senatorList){
  let container = document.getElementById("card-container"); // access card container
    for(let i = 0; i < senatorList.length; i++){

      let card = createCard(senatorList[i])
      container.appendChild(card); // append card to container
    }
}

function createCard(senator){
  let senatorName = `${senator.person.firstname} ${senator.person.lastname}`;
  let senatorParty = senator.party;
  let senatorState = senator.state;
  let senatorTimeInOffice = `${senator.startdate} - ${senator.enddate}`;
  let senatorWebLink = senator.website;

  let card = document.createElement("div");
  card.classList.add("card");
  if (senatorParty == "Republican"){
    card.classList.add("rep");
  }
  else if (senatorParty == "Democrat"){
    card.classList.add("dem");
  }
  else{card.classList.add("other");}

  let title = document.createElement("h2");
  title.innerHTML = senatorName;

  let party = document.createElement("h3");
  party.innerHTML = senatorParty;

  let state = document.createElement("p");
  state.innerHTML = senatorState;
  state.classList.add("state");
  
  let office = document.createElement("p");
  office.innerHTML = senatorTimeInOffice;
  office.classList.add("office");

  let websiteBtn = document.createElement("a");
  websiteBtn.setAttribute("href", senatorWebLink);
  websiteBtn.setAttribute("target", "_blank");
  websiteBtn.classList.add("btn");
  websiteBtn.innerHTML = "Website"

  
  // Append all components to card div
  card.appendChild(title);
  card.appendChild(party);
  card.appendChild(state);
  card.appendChild(office);
  card.appendChild(websiteBtn)

  return card;
}

showByParty("Republican");
// showByParty("Democrat");
// showByParty("Independent");



// ************** STARTER CODE *****************


// const FRESH_PRINCE_URL =
//   "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
// const CURB_POSTER_URL =
//   "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL =
//   "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// // This is an array of strings (TV show titles)
// let titles = [
//   "Fresh Prince of Bel Air",
//   "Curb Your Enthusiasm",
//   "East Los High",
// ];

// // Your final submission should have much more data than this, and
// // you should use more than just an array of strings to store it all.

// // This function adds cards the page to display the data in the array
// function showCards() {
//   const cardContainer = document.gsetElementById("card-container");
//   cardContainer.innerHTML = "";
//   const templateCard = document.querySelector(".card");

//   for (let i = 0; i < titles.length; i++) {
//     let title = titles[i];

//     // This part of the code doesn't scale very well! After you add your
//     // own data, you'll need to do something totally different here.
//     let imageURL = "";
//     if (i == 0) {
//       imageURL = FRESH_PRINCE_URL;
//     } else if (i == 1) {
//       imageURL = CURB_POSTER_URL;
//     } else if (i == 2) {
//       imageURL = EAST_LOS_HIGH_POSTER_URL;
//     }

//     const nextCard = templateCard.cloneNode(true); // Copy the template card
//     editCardContent(nextCard, title, imageURL); // Edit title and image
//     cardContainer.appendChild(nextCard); // Add new card to the container
//   }
// }

// function editCardContent(card, newTitle, newImageURL) {
//   card.style.display = "block";

//   const cardHeader = card.querySelector("h2");
//   cardHeader.textContent = newTitle;

//   const cardImage = card.querySelector("img");
//   cardImage.src = newImageURL;
//   cardImage.alt = newTitle + " Poster";

//   // You can use console.log to help you debug!
//   // View the output by right clicking on your website,
//   // select "Inspect", then click on the "Console" tab
//   console.log("new card:", newTitle, "- html: ", card);
// }

// // This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);

// function quoteAlert() {
//   console.log("Button Clicked!");
//   alert(
//     "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
//   );
// }

// function removeLastCard() {
//   titles.pop(); // Remove last item in titles array
//   showCards(); // Call showCards again to refresh
// }
