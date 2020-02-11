# Liri-Node-App

LIRI (Language Interpretation and Recognition Interface) is a node app that pulls information from multiple APIs based on user input.

There are various commands that will each run the user's parameters through a specific API:
* 'concert-this' will run the band/artist that follows through the Bands In Town API and provide venue information and dates.
    * sample command: "node liri concert-this guns n roses"
    
* 'spotify-this-song' will run the song through the Spotify API and provide the artist and album info, as well as a url for a preview of the song.
    * sample command: "node liri spotify-this-song careless whisper"
    
* 'movie-this' will run a movie title through the omdb API and provide movie stats.
    * sample command: "node liri movie-this the matrix"
    
* 'do-what-it-says' is a surprise -- for when you're not sure what to search for.
    * sample command: "node liri do-what-it-says"

Click here for a preview of the app:
[Demo Part 1](Demo/Part1.mov)
[Demo Part 2](Demo/Part2.mov)

