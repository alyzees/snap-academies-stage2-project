

// ******************** INSTRUCTIONS **********************
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


// ********************* OLD CODE NOT USED ***************************

  // Create Date objects to sort numerically.

  // function DateObj(dateStr){
  //   // get month, day, and year by splicing string
  //   // senator.startdate and senator.enddate parameter are in "YYYY-MM-DD" format
  //   this.year = parseInt(dateStr.slice(0,4)); // first four characters
  //   this.month = parseInt(dateStr.slice(5,7)); // middle two characters
  //   this.day = parseInt(dateStr.slice(8)); // last two characters
  //   this.getYear = function (){
  //     return this.year;
  //   }
  //   this.getMonth = function(){
  //     return this.month;
  //   }
  //   this.getEngMonth = function(){
  //     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  //     let monthIndx = this.month - 1; // 0 based indexing
  //     return months[monthIndx];
  //   }
  //   this.getDay = function(){
  //     return this.day;
  //   }
  //   this.getDate = function(){
  //      return `${dateObj.getMonth()}/${dateObj.getDay()}/${dateObj.getYear()}`;
  //   }
  //   this.getEngDate = function(){
  //     return `${dateObj.getEngMonth()} ${dateObj.getDay()}, ${dateObj.getYear()}`;
  //  }
  // }

  // let dateObj = new DateObj("2021-01-03");

  // Fetch JSON data

  // async function getData(){ // The getData() function is async because using the await keyword with
  //                           // the fetch function to resolve the returned promise requires that the top level
  //                           // module (outer function) be an async type that returs a promise

  //   // fetch(url) called ==> returns a promise, resolves into a response ==> response.json() called to extract
  //   // json data ==> if response state is unsuccessful, an error will be thrown

  //   try{ 
  //     // await fetch(url) (asynchronous function), returns promise in fulfilled or rejected state
  //     const reponse = await fetch("./us_senators.json");
  //     // await response.json(), returns a promise state is fulfilled (json data successfuly extracted) or rejected
  //     const data = await response.json(); 
  //     console.log(data) // ==> problem, this needs to be accessed outside of the getData() function, and because we used 
  //                       // await, the getData() function had to be of type returns a promise rather than a custom value
  //   }
  //   catch(error){
  //     console.log("Error in resolving data request or obtaining json formatting. Error: " + error)
  //   }
    
  // }



// ********************* START OF CODE *************************
// Load JavaScript after all elements in the Document Object Model have 
// loaded, this prevents refercing non-existing elements and getting null values.

document.addEventListener("DOMContentLoaded", () => {

  // ************************* FETCH DATA *****************************

  /* ***** HOW FETCHING JSON DATA WORKS ******
  {START SEQUENCE} 
  (1) fetch request to url ==>
  (2) returns promise (pending, fulfilled) ==>
  (3) .then() handles promise and resolves the promise into a response ==>
  (4) resopnse is analyzed for errors, if response is failed an Error instance is thrown ==>
  (5) error is caught and displayed by .catch() method 
  {END SEQUENCE 1}
  (6) otherwise, response.json() is returned, which is a promise-type method as well ==>
  (7) in an external function, getJasonData() is called ==>
  (8) the response.json() return value is handled as a promise by another .then() method ==>
  (9) .then() resolves the promise into a response that is the data in JSON format ==>
  (10) data is manipulated internally depending on use case 
  {END SEQUENCE 2}
  **************/

  // IMPORTANT NOTE: In this project, we used the Fetch API built into Javascript to retrieve and process the JSON data within
  // the promise-type method .then(), which resolves the promise returned by Fetch into actual data. This means that
  // JSON data isn't stored in a single array, it is extracted and then discarded within every processing function 
  // containing the fetch().then().catch(). It is not persistently stored, so it cannot be repeatedly accessed. Ideally
  // we would have filtering/sorting functions that simply creates a reduced array copy of the JSON data based on certain
  // conditions (e.g. Full array of JSON objects ==> Array of JSON objects with party parameter value of "Democrat").

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

  // Due to the nature of the fetch API, the JSON data can't be stored in a single variable unless explicitly defined in JavaScript.
  // We resolve each returned promise separately to extract the JSON data and handle it according to the function's purpose.


  // ********************* DATE HELPER FUNCTIONS *************************

  // Opted to use functions to get and format date infromation from each senator obejct rather than creating a parallel
  // array of date objects to be sorted in ascending order. This is because of lack of data persistence, and the face that 
  // it's not practical to create new Date() objects array anytime a date sorting function is called. 

  // JSON data uses YYYY-MM-DD format
  function getDay(dateStr){
    return parseInt(dateStr.slice(8))
  }

  function getMonth(dateStr){
    return parseInt(dateStr.slice(5, 7))
  }

  function getYear(dateStr){
    return parseInt(dateStr.slice(0, 4));
  }

  function getEngMonth(dateStr){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let monthIndx = getMonth(dateStr)- 1; // 0 based indexing
    return months[monthIndx];
  }

  function getFormattedDate(dateStr){
    return `${getEngMonth(dateStr)} ${getDay(dateStr)}, ${getYear(dateStr)}`;
  }


  // **************************** STATE HELPER FUNCTIONS ********************************

  // This is a JSON object literal. This is a JavaScript object structured in JSON format, and therefore they key-value pairs
  // can be accessed with this same script. This is a small enough set to be written out as an object letter, for larger datasets
  // like the Senators dataset require fetching or importing the JSON data.
  const statesObj = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  } // Credits: https://gist.github.com/mshafrir/2646763

  function getState(abbrev){ // capitalized abbreviation (e.g. CA ==> California)
    return statesObj[abbrev];
  }

  // console.log(getState("WY"));

  // *************** CREATE AND DISPLAY CARDS *************

  // TECHNIQUE 1: Use JavaScript to access the HTML Document Object Model and create new elements. Each element is a JS object with
  // certain properties and methods, such as classList and attribute. This option keeps a JavaScript variable copy of the HTML card
  // elements.
  function createCard(senator){
    let senatorName = `${senator.person.firstname} ${senator.person.lastname}`;
    let senatorRank = `${senator.senator_rank_label} Senator`;
    let senatorBirthday = `Born on ${getFormattedDate(senator.person.birthday)}`;
    let senatorParty = senator.party;
    let senatorState = `${getState(senator.state)} (${senator.state})`;
    let senatorTimeInOffice = `In office ${getFormattedDate(senator.startdate)} through ${getFormattedDate(senator.enddate)}`;
    let senatorWebLink = senator.website;

    let card = document.createElement("div");
    card.classList.add("card");
    if (senatorParty == "Republican"){
      card.classList.add("rep");
    }
    else if (senatorParty == "Democrat"){
      card.classList.add("dem");
    }
    else{card.classList.add("ind");}

    let title = document.createElement("h2");
    title.innerHTML = senatorName;

    let party = document.createElement("h3");
    party.innerHTML = senatorParty;

    let rank = document.createElement("h3");
    rank.innerHTML = senatorRank;

    let state = document.createElement("p");
    state.innerHTML = senatorState;
    state.classList.add("state");
    
    let office = document.createElement("p");
    office.innerHTML = senatorTimeInOffice;
    office.classList.add("office");

    let birthday = document.createElement("p");
    birthday.innerHTML = senatorBirthday;
    birthday.classList.add("birthday");

    let websiteBtn = document.createElement("a");
    websiteBtn.setAttribute("href", senatorWebLink);
    websiteBtn.setAttribute("target", "_blank");
    websiteBtn.classList.add("btn");
    websiteBtn.innerHTML = "Website"
    
    // Append all components to card div
    card.appendChild(title);
    card.appendChild(party);
    card.appendChild(rank);
    card.appendChild(state);
    card.appendChild(office);
    card.appendChild(birthday);
    card.appendChild(websiteBtn)

    return card;
  }

  // TECHNIQUE 2: Using template literals to write out the HTML that we intend to render using the parameter values of each 
  // senator object. We can still access these elements later by id, class, or tag for event handling, so long as these labels 
  // are specified in the HTML string literal.
  function createCardElement(senator){

    let senatorName = `${senator.person.firstname} ${senator.person.lastname}`;
    let senatorRank = senator.senator_rank_label;
    let senatorBirthday = getFormattedDate(senator.person.birthday);
    let senatorParty = senator.party;
    let senatorState = `${getState(senator.state)} (${senator.state})`;
    let senatorTimeInOffice = `${getFormattedDate(senator.startdate)} - ${getFormattedDate(senator.enddate)}`;
    let senatorWebLink = senator.website;
    let senatorFinLink = `https://www.opensecrets.org/members-of-congress/summary?cid=${senator.person.osid}`; // append Open Secrets ID to the end of this API url 
                                                                                                               // to retrieve the financial tracking page of each senator

    let card = document.createElement("div"); // create card div
    card.classList.add("card");
    if (senatorParty == "Republican"){
      card.classList.add("rep");
    }
    else if (senatorParty == "Democrat"){
      card.classList.add("dem");
    }
    else{card.classList.add("ind");}


    card.innerHTML = 
       `<h2>${senatorName}</h2>
        <p class="party">${senatorParty}<p>
        <p class="state">${senatorRank} Senator of ${senatorState}</p>
        <p class="office"> In office ${senatorTimeInOffice}</p>
        <p class="birthday">Born on ${senatorBirthday}</p>
        <div class="btn-group">
          <a href="${senatorFinLink}" target="_blank" class="btn">Track Finances</a>
          <a href="${senatorWebLink}" target="_blank" class="btn">Official Website</a>
        </div>
        `;

    return card;
  }

  function createCardList(senatorList){
    let container = document.getElementById("card-container"); // access card container

    for(let i = 0; i < senatorList.length; i++){

      // Technique 1
      // let card = createCard(senatorList[i]); //create card 

      //Technique 2
      let card = createCardElement(senatorList[i]);

      container.appendChild(card); // append card to container
    }
  }

  function clearCardList(){
    let container = document.getElementById("card-container"); 

    while (container.children.length > 0){
      let card = container.firstChild;
      container.removeChild(card); // Remove all child elements 
    }
  }

  // *** Default, all cards are shown, entire data array is passed through the createCardList() function ***
  function showAllCards(){
    // .then() method passes forward data, which is the JSON data extracted from the previous Fetch request with response.json()
    // a custom callback function will be made to manipulate the JSON data 
    getJsonData().then(data => {

      senatorsArr = data.objects; // grabbing array of objects, array length = 100, one for each U.S Senator
      console.log(`Json data: ${data}`)

      console.log(`There are ${senatorsArr.length} senators in Congress.`)
      createCardList(senatorsArr); // pass an array with all 100 objects to the createCardList function to display all members of the Senators 
      
  })
  }

  /* *********** FILTERING AND SORTING FUNCTIONS ************ */

  let partySort = document.getElementById("party-sort-dropdown");
  let dateSort = document.getElementById("date-sort-dropdown");
  let alphaSort = document.getElementById("date-sort-dropdown");

  function resetFilterValuesExcept(elementId){
    let sortDropdowns = document.getElementsByClassName("sort-dropdown");
    
    for(let i = 0; i < sortDropdowns.length; i++){
      // For now, we are only doing one filter or sorting algorithm at a time, no compound filters.
      // Other sorting and filter options must be reset upon another one being chosen.
      if(sortDropdowns[i].id != elementId){
        sortDropdowns[i].value = "no-sort"; // change value of select tag to it's default no-sort value, which makes the 
                                            // corresponding "None" option tag appear as selected
      }
    }
  }
  

  // ***** SORT BY POLITICAL PARTY *****

  function showByParty(partyName){
    getJsonData().then(data => {
      senatorsArr = data.objects;
      senatorsPartyArr = [];

      // If the object party property has a value of a specific party ("Republican", "Democrat"), it will
      // be added to a new sorted array holding senator objects from just that party.
      for(let i = 0; i < senatorsArr.length; i++){
        
        if (senatorsArr[i].party == partyName){ 
          senatorsPartyArr.push(senatorsArr[i]);
        }
      }

      console.log(`There are ${senatorsPartyArr.length} ${partyName} senators in Congress.`);

      createCardList(senatorsPartyArr); // Create list of cards from the shortened array of senator objects sorted by party.
    })
  }

  // "onchange" event is compatible with "select" elemtn, event is thrown when the value of an html 
  // element is changed, such as by a select dropdown that takes on the value of the "option" child elements
  partySort.addEventListener("change", (event) => {

    clearCardList(); // clear the card list to reset the container space, 
                    // cards will be displayed by party only
    resetFilterValuesExcept(event.target.id); // reset the other filters and sorters, except for currently selected filter


    // get the element that threw the event and it's selected value 
    // note "onclick" is not compatible with "option" elements, so "change" event had to be used
    let party = event.target.value; 

    if(party != "no-sort"){
      showByParty(party); // use value of option tags to call 
    }
    else{
      showAllCards(); // "no-sort" value selected, resets to default
    }
  })


  // **** SORT BY DATE **** 

  // date parameters will be the "YYYY-MM-DD" format of the JSON data
  function compareDates(date1, date2){

    // earlier date is less than the most recent date
    
    if(getYear(date1) < getYear(date2)){ //compare years
    
      return -1; // date1 has an earlier year, so it's "less than" date2
    }
    else if(getYear(date1) > getYear(date2)){ //compare years
    
      return 1; // date1 has a later year, so it's "greater than" date2
    }
    // if neither of the above are true, the years are the same, so now we compare months
    else if (getMonth(date1) < getMonth(date2)){ // compare months
      return -1; // during the same year, date1 has an earlier month, so it's "less than" date2
    }
    else if (getMonth(date1) > getMonth(date2)){ // compare months
      return 1; // during the same year, date1 has a later month, so it's "greater than" date2
    }
    // if neither of the above are true, the year and month are the same, so now we compare days
    else if(getDay(date1) < getDay(date2)){
      return -1; // during the same year and month, date1 has an earlier date, so it's "less than" date2
    }
    else if(getDay(date1) > getDay(date2)){
      return 1; // during the same year and month, date1 has a later date, so it's "greater than" date2
    }
    // if nothing above is true, the year, month, and day are the
    // same, so the dates are equal
    else{
      return 0; 
    }
  }

  console.log(compareDates("2000-01-12", "1992-12-22")); // 1
  console.log(compareDates("1890-09-06", "1890-10-21")); // -1
  console.log(compareDates("1999-09-09", "1999-09-09")); // 0
  console.log(compareDates("1952-08-05", "1952-08-03")); // 1

  // ***********  BUBBLE SORT (SWAP SORT) ALGORITHM ***********
  // Credits: https://www.programiz.com/dsa/bubble-sort 

  /* ********** TRACE AN EXAMPLE ***********
  let arr = [-2, 19, -5, 90, 34, 23, -91]

  STEP 1: offset from end is 0, so we iterate through all unsorted elements
  (we only count up to one minus the length since each iteration uses the current and next element)
  
    pos 0: compare pos 0 and pos 1 ==> -2 < 19 ==> don't swap
    pos 1: compare pos 1 and pos 2 ==> 19 > -5 ==> swap ==> 
      arr = [-2, -5, 19, 90, 34, 23, -91]
    pos 2: compare pos 2 and 3 ==> 23 < 90 ==> don't swap
    pos 3: compare pos 3 and pos 4 ==> 90 > 34 ==> swap ==>
      arr = [-2, -5, 19, 34, 90, 23, -91] 
    pos 4: compare pos 4 and pos 5 ==> 90 > 23 ==> swap ==>
      arr = [-2, -5, 19, 34, 23, 90, -91] (NOTE: Here, the elements before 90 are still out of order, but that's okay! The purpose is
                                          swapping through each position in order to get the largest element and carry it over to the end.)
    pos 5: compare pos 5 and pos 6 ==> 90 > -91 ==> swap ==>
      arr = [-2, -5, 19, 34, 23, -91, 90]

  END OF STEP 1: Now the largest element, 90, is at the end in it's rightful place, we know because
  it was the last element we were able to swap to the right before the array ended. Now we can move 
  to STEP 2 and find the largest element AMONG THE UNSORTED PORTION of the array, i.e. up to the sorted 
  elements at the end (i.e. offset increases by 1).
  
  STEP 2: offset from end is now 1, we iterate through all unsorted elements up to the last sorted element 
  ...
  END OF STEP 2: The largest element among the unsorted is 34 and has been moved up to the offest ==>
    arr = [-2, -5, 19, 23, -91, 34, 90]

  STEP 3: offset from end is now 2, we iterate through all unsorted elements up to the last two sorted element 
  ...
  END OF STEP 2: The largest element among the unsorted is 23 and has been moved up to the offset ==>
    arr = [-2, -5, 19, -91, 23, 34, 90]

  STEP 4: offset from end is now 3, we iterate through all unsorted elements up to the last three sorted element 
  ...
  END OF STEP 4: The largest element among the unsorted is 19 and has been moved up to the offset ==>
    arr = [-2, -5, -91, 19, 23, 34, 90]

  STEP 5: offset from end is now 4, we iterate through all unsorted elements up to the last four sorted element 
  ...
  END OF STEP 5: The largest element among the unsorted is -2 and has been moved up to the offset ==>
    arr = [-5, -91, -2, 19, 23, 34, 90]

  STEP 6: offset from end is now 5, we iterate through all unsorted elements up to the last five sorted element 
  ...
  END OF STEP 6: The largest element among the unsorted is -5 and has been moved up to the offset ==>
    arr = [-91, -5, -2, 19, 23, 34, 90]

  STEP 7: length of arr = 7, and the offset is only incremented up to arr.length - 1, so now that offset is 6, function breaks
  ARRAY IS SORTED!!! [-91, -5, -2, 19, 23, 34, 90]
  */

 
  /*  // ******** ALGORITHM PSUEDOCODE ************
  // since every iteration sorts the greatest element
  for (all offsets from 0 to the length of the array - 1){

    for(all elements from 0 to the offset point){ // repeat and look at next two adjacent elements
      if(current element > next element){
        swap position of current and next element
      }
      else{
        move on to next element  
      }
    } // continues until the greatest unsorted element is placed at the end
  }
  */

  // NOTE: Bubble sort can be inefficient for extremely 

  function showInAscendingBirthdays(){ //earliest to most recent birthdays, oldest to youngest

    getJsonData().then((data) => {
      senatorsArr = data.objects; // get senators in a single array of objects

      // offset from the end 
      for(let endOffset = 0; endOffset < senatorsArr.length - 1; endOffset++){

        let currentYoungestSenator; // each step will move the oldest senator to the end 

        //  iterate through all elements up to the offset point ==> for each offest iteration, one element will be in it's rightful sorted place at the end
        for(let pos = 0; pos < senatorsArr.length - endOffset - 1; pos++){ // note we COUNT up to length - 1 because we are comparing adjacent elements

          // temporary variables holding adjacent objects
          let currentSenator = senatorsArr[pos]; // senator object in current position
          let nextSenator = senatorsArr[pos + 1]; // senator object in next position

          // compare dates
          if(compareDates(currentSenator.person.birthday, nextSenator.person.birthday) == 1){ // current senator date occurs later than next senator date, so it should be swapped to the next positio
            
            senatorsArr[pos] = nextSenator; // place lesser date in current position
            senatorsArr[pos + 1] = currentSenator; // place the saved greater date in next position

            currentYoungestSenator = currentSenator; // TRACKING
          }
          else{ // TRACKING
            currentYoungestSenator = nextSenator; // next senator has either a great or equal to date than the first
          }

        }
        console.log(`Senator ${currentYoungestSenator.person.name} w/ b-day ${currentYoungestSenator.person.birthday} has the latest b-day, is youngest, and was moved to the end!`);  
      }
      createCardList(senatorsArr); // show by sorted list 
    })
  }

  function showInDescendingBirthdays(){ //most recent to earliest birthdays, youngest to oldest

    getJsonData().then((data) => {
      senatorsArr = data.objects; // get senators in a single array of objects
      // offset from the end 
      for(let endOffset = 0; endOffset < senatorsArr.length - 1; endOffset++){
        for(let pos = 0; pos < senatorsArr.length - endOffset - 1; pos++){ 
          // temporary variables holding adjacent objects
          let currentSenator = senatorsArr[pos]; // senator object in current position
          let nextSenator = senatorsArr[pos + 1]; // senator object in next position
          // compare dates
          if(compareDates(currentSenator.person.birthday, nextSenator.person.birthday) == -1){ // current senator has an earlier birthday than the next senator, positions are swapepd
            // swap positions
            senatorsArr[pos] = nextSenator; 
            senatorsArr[pos + 1] = currentSenator; 
          }
        }        
      }
      createCardList(senatorsArr); // show by sorted list 
    })

  }

  dateSort.addEventListener("change", (event) => {

    clearCardList(); // clear the cards in the container space from previous filters
    resetFilterValuesExcept(event.target.id); // reset the other filters and sorters, except for currently selected filter

    let order = event.target.value;

    if(order == "ascending"){
      showInAscendingBirthdays();
    }
    else if(order == "descending"){
      showInDescendingBirthdays();
    }
    else{
      showAllCards(); // no-sort option selected, reset to all cards
    }

  });

  showAllCards(); // Begin by showing all cards.
  

})



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
