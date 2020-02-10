
require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);


// console.log("hello")

// Commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var axios = require("axios");

// spotify.search("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10")
//     .then(function (response) {
//         console.log(response)
//     })

// TEST
// console.log("Keys below...hopefully")
// console.log(spotify)

// spotify.search({ type: 'track', query: 'Everlong' }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

//     console.log(JSON.stringify(data.tracks, null, 2));
// });


// console.log("-----------------------------------------------")
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//     function (response) {
//         console.log(response.data);
//     })

// console.log("-----------------------------------------------")

// bands in town url
var artist = "rage against the machine"
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios.get("https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp")
    .then(
        function (response) {
            console.log(response.data)
        }
    )


