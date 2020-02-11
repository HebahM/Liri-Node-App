
require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs");

var command = process.argv[2]
var userInput = "";

// Commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

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
        if (!userInput) {
            song = "the sign"
        }
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





function runBands() {
    // console.log("Band: " + band)
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                // console.log(response.data)
                for (var i = 0; i < response.data.length; i++) {
                    console.log("-----------------------------------------------------------------------")
                    console.log("Lineup: " + response.data[i].lineup)
                    console.log("Venue: " + response.data[i].venue.name)
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country)
                    var concertDateTime = response.data[i].datetime;
                    var moment = require('moment');
                    var convertedDate = moment(concertDateTime).format('L');
                    console.log("Date: " + convertedDate)
                    console.log("-----------------------------------------------------------------------")
                    var text = "\nLineup: " + response.data[i].lineup + "\nVenue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.region +
                        ", " + response.data[i].venue.country + "\nDate: " + convertedDate + "\n-------------------------------------------------------------------";

                    fs.appendFile("log.txt", text, function (error) {
                        if (error) {
                            console.log(error)
                        }
                        // else {
                        //     console.log("Content Added")
                        // }
                    })
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
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("------------------------------------------------------------")
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name)
            console.log("Song: " + data.tracks.items[i].name)
            console.log("Link: " + data.tracks.items[i].external_urls.spotify)
            console.log("Album: " + data.tracks.items[i].album.name)
            console.log("------------------------------------------------------------")
            var text="\nArtist: " + data.tracks.items[i].album.artists[0].name+"\nSong: " + data.tracks.items[i].name+"\nLink: " + 
            data.tracks.items[i].external_urls.spotify+"\nAlbum: " + data.tracks.items[i].album.name+"\n-------------------------------------------------------------------";
            fs.appendFile("log.txt", text, function (error) {
                if (error) {
                    console.log(error)
                }
                // else {
                //     console.log("Content Added")
                // }
            })
        }
    });
}
function runOmdb() {
    // console.log("Movie: " + movie)
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
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
            text="\nTitle: " + response.data.Title+"\nYear: " + response.data.Year+"\nIMDb Rating: " + response.data.Ratings[0].Value+"\nRotten Tomatoes Rating: " + 
            response.data.Ratings[1].Value+"\nCountry: " + response.data.Country+"\nLanguage: " + response.data.Language+"\nPlot: " + response.data.Plot+
            "\nActors: " + response.data.Actors+"\n-------------------------------------------------------------------";
            fs.appendFile("log.txt", text, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        })

}
function runRandom() {
    // console.log("Do what it says");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);      
        var dataArr = data.split(",");
        // console.log(dataArr);
        command = dataArr[0];
        song = dataArr[1];
        runSpotify();
    });
}


// TO DO:
// take video of app running. 
// BONUS