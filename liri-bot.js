// liri-bot-homework
// Making a liri-bot with node for homework.

// Creating a constiable for each package
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
let keys = require("./keys.js");


// Requiring dotenv to hide our keys and keep them secret. 
require("dotenv").config();

// Argument inputs. Ex. [2]'spotify-this-song' and [3]'song name'
const nodeArgs1 = process.argv[2];
const nodeArgs2 = process.argv.slice(3).join(" ");

// Spotify api function
const songs = function() {

    const spotify = new Spotify(keys.spotify); 
  
    // Creating a search function for user input
    spotify.search({ type: 'track', query: nodeArgs2 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        // console.log(data);
        // console.log(data.tracks);

        // Creating a for loop to loop through and display the information
        for (let i=0; i < data.tracks.items.length; i++) {
            console.log("Songs: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("URL: " + data.tracks.items[i].preview_url);

            let artistNames = [];

            // Since artists is an object within another object, creating a for loop to obtain artist name values from artists object.
            for (let x=0; x < data.tracks.items[i].artists.length; x++) {
                artistNames.push(data.tracks.items[i].artists[x].name)
            }

            console.log("Artists: " + artistNames.join(", "))
        }
    });

};

// Creating a variable to hold the movie name input.
const movie = function () {

    // Then run a request with axios to the OMDB API with the movie specified
    const queryUrl = "http://www.omdbapi.com/?t=" + nodeArgs2 + keys.omdbURL;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {
        // console.log("Release Year: " + response.data.Year);
        console.log(response);
    })
    .catch(function(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
    });


    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (let j = 2; j < nodeArgs2.length; j++) {

        if (j > 2 && j < nodeArgs2.length) {
            movie = movie + "+" + nodeArgs2[j];
        } else {
            movie += nodeArgs2[j];

        }
    }

}




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

