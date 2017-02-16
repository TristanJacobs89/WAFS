// Door Tristan Jacobs

// With some help of the one and only Dave Bitter
// Object Oriented, bitches!
// #justlikejava

// Libraries used:
// - Aja.js
// - Routie.js
// - jQuery.js
// - Transparency.js


// TO DO:
// - Use Transparency.js to generate HTML templates
// - filter() and reduce() search results


// IDEAS:
// Find a better way to toggle in routing
// Option to select GIFs or stickers
//
// =============================================

(function() {
    // Engage strict mode
    "use strict";

    console.log("IIFE werkt!");

    // Routing

    routie({
        'start': function() {
            document.getElementById('start').classList.remove("hide");
            document.getElementById('gif').classList.add("hide");
            console.log('Start is toggled');
        },
        'gif': function() {
            document.getElementById('gif').classList.remove("hide");
            document.getElementById('start').classList.add("hide");
            console.log('Gifs is toggled');
        }
    });

    // Var declarations for click events
    var _searchBox = document.getElementById('search'),
        _submit = document.getElementById('submit'),
        _loading = document.getElementById('loading');

    // search clickhandler, executes main data retrieval function
    _submit.addEventListener("click", function () {
        event.preventDefault();
        getSearchResults();
    });

    function getSearchResults () {

        var _urlForAPI = 'http://api.giphy.com/v1/gifs/search?q=' + _searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=25';

        // Show loading icon
        _loading.classList.remove('hide');

        aja()
        // url =
            .url(_urlForAPI)

            // obj is a javascript object returned from Giphy API
            .on('success', function(obj){

                var _html = '';

                // remove loading icon
                _loading.classList.add('hide');

                // display search results header
                document.getElementById('search-result').innerHTML = 'Search results for ' + '"' + _searchBox.value + '"';

                /*
                    map the objects received with AJA and for each object, set the <img src attribute
                    to the 'embed_url' property of the object it loops over
                */

                obj.data.map(function(element){
                    _html += "<img class='gif' src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                });


                // put the values of '_html' into the selected div to show them on the page
                document.getElementById('images').innerHTML = _html;

                var _gifs = document.querySelectorAll('.gif');

               // GIF clickhandler
                _gifs.forEach(function(el){
                    console.log(el);
                    el.addEventListener('click', function () {

                        // Get the modal
                        var modal = document.getElementById('modal'),
                            overlay = document.getElementById('overlay'),
                            body = document.querySelector('body');


                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];

                        // When the user clicks on the button, open the modal
                        modal.style.display = 'block';
                        overlay.classList.remove('hide');
                        body.classList.add('hide-overflow')

                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                            modal.style.display = 'none'
                            overlay.classList.add('hide');
                            body.classList.remove('hide-overflow')
                        }

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = 'none';
                                overlay.classList.add('hide');
                                body.classList.remove('hide-overflow')
                            }
                        }
                    });
                });
            })
            .go();
    }
})();

