require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var spotifyThisSong = function (songName) {
    if (songName === "") {
        songName = "What's My Age Again";
    }
    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log(response.tracks.items[i].artists[0].name);
                console.log(response.tracks.items[i].name);
                console.log(response.tracks.items[i].preview_url);
                console.log(response.tracks.items[i].album.name);
                console.log("---------------------");
            }
            
        })
        .catch(function (err) {
            console.log(err);
        });
}

var concertThis = function (bandName) {

}

var movieThis = function (movieName) {
    if (movieName === "") {
        movieName = "Mr. Nobody";
    }
    axios.get('http://omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&apikey=trilogy')
        .then(function (response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Rated);
            console.log(response.data.imdbRating);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            console.log(response.data.Ratings[1].Value);
            console.log("-----------------");
        })
        .catch(function (error) {
            console.log(error);
        });
}

var doWhatItSays = function () {

}

var runCommand = function (userCommand, userChoice) {
    switch (userCommand) {
        case "spotify-this-song":
            spotifyThisSong(userChoice);
            break;
        case "concert-this":
            concertThis(userChoice);
            break;
        case "movie-this":
            movieThis(userChoice);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI does not recognize that command!");
    }
}

var executeCommand = function (arg1, arg2) {
    runCommand(arg1, arg2);
}

executeCommand(process.argv[2], process.argv.slice(3).join(" "));