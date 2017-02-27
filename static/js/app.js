// Door Tristan Jacobs

// With some help of the one and only Dave Bitter
// Object Oriented, bitches!
// #justlikejava

// Libraries used:
// - Aja.js
// - Routie.js
// - jQuery.js
// - Transparency.js


// Nice To Haves:
// ----------------

// Option to select GIFs or stickers
// Find a better way to display gifs in detail view
// Fix responsive issues

// =============================================

(function() {
    // Engage strict mode
    "use strict";

    // Var declarations for routing
    var startElement = document.getElementById('start'),
        gifsElement = document.getElementById('gifs');

    // Routing
    routie({
        'start': function() {
            startElement.classList.remove("hide");
            gifsElement.classList.add("hide");

        },
        'gifs': function() {
            gifsElement.classList.remove("hide");
            startElement.classList.add("hide");
        }
    });

    // Var declarations for click events
    var     _searchBox      = document.getElementById('search'),
            _submit         = document.getElementById('submit'),
            _loading        = document.getElementById('loading');

    // search clickhandler, executes main data retrieval function
    _submit.addEventListener("click", function(ev) {
        ev.preventDefault();
        getSearchResults();
    });

    function getSearchResults() {

        var _urlForAPI = 'https://api.giphy.com/v1/gifs/search?q=' + _searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=25';

        // Show loading icon
        _loading.classList.remove('hide');

        aja()
            .url(_urlForAPI)

            // obj is a javascript object returned from Giphy API
            .on('success', function(obj){
                var _html = '';

                // remove loading icon
                _loading.classList.add('hide');

                // display search results header
                document.getElementById('search-result').innerHTML = 'Search results for ' + '"' + _searchBox.value + '"';


                // map the objects received with AJA and for each object, map the <img src attribute
                // to the 'embed_url' property of the object it loops over
                obj.data.map(function(element){
                    _html += "<img class='resultgif' src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                });

                // put the values of '_html' into the selected div to show them on the page
                document.getElementById('images').innerHTML = _html;

                var _gifs = document.querySelectorAll('.resultgif');

               // GIF clickhandler
                _gifs.forEach(function(el){
                    el.addEventListener('click', function () {

                        // get the modal
                        var modal                   = document.getElementById('modal'),
                            modalContent            = document.getElementById('modal-content'),
                            selectedGifContainer    = document.getElementById('selectedGif'),
                            body                    = document.querySelector('body');

                        // add gif to modal
                        selectedGifContainer.appendChild(this);

                        // when the user clicks on the button, open the modal
                        modal.style.display             = 'flex';
                        modal.style.justifyContent      = 'center';
                        modal.style.alignItems          = 'center';
                        body.classList.add('hide-overflow');

                        // when the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = 'none';
                                body.classList.remove('hide-overflow');
                                selectedGifContainer.removeChild(el);
                            }
                        };
                    });
                });
            })
            .go();
    }
})();

