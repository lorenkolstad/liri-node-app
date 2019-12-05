// liri-bot-homework
// Making a liri-bot with node for homework.

// Creating a constiable for each package
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
let keys = require("./keys.js");


// Requiring dotenv to hide our keys and keep them secret. 
require("dotenv").config();

// Argument inputs. Ex. [2]'spotify-this-song' and [3]'song name'
const nodeArgs1 = process.argv[2].toLowerCase();
const nodeArgs2 = process.argv.slice(3).join(" ");

// Concert function
const concert = function() {
    if(argvTwo) {
        bands(argvTwo)
    } else {
        bands("Kingdom of Giants")
    }
}

function bands(concerts) {

    axios.get("https://rest.bandsintown.com/artists/" + concerts + "/events?app_id=" +keys.bandsInTown.key)
    .then(function (response) {

        console.log("Artist: " + concerts)
        for (i = 0; i <3; i++) {
            console.log("Venue: " + response.data[i].venue.name)
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country)
            console.log("Date: " + moment (response.data[i].datetime).format('MMM Do YYY, h:mm:ss a'))

            console.log(__________________________________________);     
        }
    }).catch(function (error) {
        console.log(error);
    })
}


// Spotify api function
const songs = function() {

    if (nodeArgs2) {
        spotify(nodeArgs2)
    } else {
        spotify("Cash Out Kingdom of Giants")
    }
}

function spotify(artists) {
    // The Spotify Key.
    const spotify = new Spotify(keys.spotify); 

    // Creating a search function for user input
    spotify.search({ type: 'track', query: artists, limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        // console.log(data);
        // console.log(data.tracks);

        // Creating a for loop to loop through and display the information
        for (let i=0; i <= 5; i++) {
            console.log("Songs: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("URL: " + data.tracks.items[i].preview_url);

            let artistNames = [];

            // Since artists is an object within another object, creating a for loop to obtain artist name values from artists object.
            for (let x=0; x < data.tracks.items[i].artists.length; x++) {
                artistNames.push(data.tracks.items[i].artists[x].name)
            }

            console.log("Artists: " + artistNames.join(", "))

            console.log(__________________________________________); 
        }
    });

};

    // Creating a variable to hold the movie name input.
    const movies = function () {

    if(nodeArgs2) {
        movieSearch(nodeArgs2)
    } else {
        movieSearch("Step Brothers")
    }

    function movieSearch(movie) {


        // Creating a variable for the axios call.
        const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&" + keys.omdbURLkey.key;

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        // Creating an axios call to pull information from OMDB.
        axios.get(queryUrl).then(
        function(response) {
            // console.log("Release Year: " + response.data.Year);
            console.log(response);
            console.log("Title: " + response.data.Title)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            console.log("Year: " + response.data.Year)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log(__________________________________________);

        })
        .catch(function(error) {
            console.log(error);
        });
        
    };

    // run doWhat function for switch/case
const doWhat = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
    
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
    
        // split contents to build array
       let splitContents = data.split(",");
    
       let doWhatSongs = splitContents[1]
       let doWhatMovies = splitContents[3]
       let args2 = splitContents[5]
    
        spotify(doWhatSongs)
        movieSearch(doWhatMovies)
        concert(args2)
    });
    }


    // // Loop through all the words in the node argument
    // // And do a little for-loop magic to handle the inclusion of "+"s
    // for (let j = 2; j < nodeArgs2.length; j++) {

    //     if (j > 2 && j < nodeArgs2.length) {
    //         movie = movie + "+" + nodeArgs2[j];
    //     } else {
    //         movie += nodeArgs2[j];

    //     }
    // }

    // }




// Callback for the Spotify API
switch(nodeArgs1) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        songs();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doWhat();
        break;
    default:
        console.log("I'm not sure what you're requesting.")
};
};
