require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var spotifyThisSong = function (songName) {

    if (songName === "") {
        songName = "The Sign Ace of Base";
    }

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {

                console.log("-------------------------------------------------------");
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Title: " + response.tracks.items[0].name);
                console.log("Album Name: " + response.tracks.items[0].album.name);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("-------------------------------------------------------");

        })

        .catch(function (err) {
            console.log(err);

        });

}

var concertThis = function (bandName) {

    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("-------------------------------------------------");
            console.log("Venue/Event Name: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("State/Region: " + response.data[0].venue.region);
            console.log("Country: " + response.data[0].venue.country);
            console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
            console.log("-------------------------------------------------");

        })

        .catch(function (err) {
            console.log(err);

        })

}

var movieThis = function (movieName) {

    if (movieName === "") {
        movieName = "Mr. Nobody";
    }

    axios.get('http://omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&apikey=trilogy')
        .then(function (response) {

            console.log("------------------------------------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("MPAA Rating: " + response.data.Rated);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Production Country: " + response.data.Country);
            console.log("Language of Movie: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
            console.log("------------------------------------");

        })

        .catch(function (error) {
            console.log(error);

        });

}

var doWhatItSays = function () {

    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            return console.log(err);
        }
        data = data.split(",");
        userCommand = data[0];
        userChoice = data[1];
        runCommand(userCommand, userChoice);
        console.log(data);

    })

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