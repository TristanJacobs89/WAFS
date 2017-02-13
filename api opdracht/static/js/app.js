/* Created by Tristan Jacobs on 13-02-17.
   Using AJA - Src: http://krampstudio.com/aja.js/
*/

(function(){
"use strict";


    var searchBox = document.getElementById('search'),
        submit = document.getElementById('submit');

        submit.addEventListener("click", function () {
            event.preventDefault();
            getSearchResults();
        });
        
        function getSearchResults () {

            var userQuery = searchBox.value.split(' '),
                urlForAPI = 'http://api.giphy.com/v1/gifs/search?q=' + userQuery + '&api_key=dc6zaTOxFJmzC';

            aja()
                // url =
                .url(urlForAPI)
                .on('success', function(obj){
                    console.log(obj);
                    //obj is a javascript object returned from Gyphy API

                    var html;

                    //map the objects received with AJA and for each object,
                    // set the <img src attribute to the 'embed_url' property of the object it loops over

                    obj.data.map(function(element){
                        html += "<img src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                    })

                    // put the value of 'html' into the selected div
                    document.getElementById('images').innerHTML = html;

                })
                .go();
        };
// end of IIFE
}());