
require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2]
var userInput = "";

for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
      userInput = userInput + "+" + process.argv[i];
    } else {
      userInput += process.argv[i];  
    }
  }

// console.log(userInput)

switch (command) {
    case "concert-this":
        var band = userInput;
        runBands();
        break;
    case "spotify-this-song": 
        var song = userInput;
        runSpotify();
        break;
    case "movie-this": 
        var movie = userInput;
        if (!userInput) {
            movie = "Mr. Nobody"
        }
        runOmdb();
        break;
    case "do-what-it-says":
        runRandom();
        break;
}

// console.log("hello")

// Commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says



function runBands() {
    // console.log("Band: " + band)
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
    .then(
        function (response) {
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                console.log("-----------------------------------------------------------------------")
                console.log("Venue: " + response.data[i].venue.name)
                console.log("Location: " + response.data[i].venue.city + ", "+ response.data[i].venue.region + ", " +response.data[i].venue.country)
                console.log("Venue: " + response.data[i].datetime)
                console.log("-----------------------------------------------------------------------")
            }
            // if (response.data === null){
            //     console.log("No upcoming shows")
            // }
        }
    )
}



function runSpotify() {
    // console.log("Song: " + song)
    spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(JSON.stringify(data, null, 2));
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
    console.log("Song: " + data.tracks.items[0].name)
    console.log("Link: " + data.tracks.items[0].external_urls.spotify)
    console.log("Album: " + data.tracks.items[0].album.name)
    console.log("------------------------------------------------------------")
});
}
function runOmdb() {
    // console.log("Movie: " + movie)
    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response.data);
            console.log("------------------------------------------------------------")
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMDb Rating: " + response.data.Ratings[0].Value)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            console.log("------------------------------------------------------------")
        })

}
function runRandom() {
    console.log("Do what it says")
}




// spotify.search("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10")
//     .then(function (response) {
//         console.log(response)
//     })

// TEST
// console.log("Keys below...hopefully")
// console.log(spotify)


// console.log("-----------------------------------------------")


// console.log("-----------------------------------------------")

// bands in town url
// var artist = "rage against the machine"
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"




// TO DO:
// add for loop for Spotify.
// add function for random.txt.
// moment.js for concert date. 
// take video of app running. 
// BONUS