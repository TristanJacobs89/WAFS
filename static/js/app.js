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

    // Object literals
    var element = {
        start                   : document.getElementById('start'),
        gifs                    : document.getElementById('gifs'),
        body                    : document.querySelector('body'),
        searchResult            : document.getElementById('search-result'),
        images                  : document.getElementById('images')
    };

    var formElements = {
        searchBox               : document.getElementById('search'),
        submit                  : document.getElementById('submit'),
        loading                 : document.getElementById('loading')
    };

    var modal = {
        self                    : document.getElementById('modal'),
        modalContent            : document.getElementById('modal-content'),
        selectedGifContainer    : document.getElementById('selectedGif')
    };

    // Routing
    routie({
        'start': function() {
            element.start.classList.remove("hide");
            element.gifs.classList.add("hide");

        },
        'gifs': function() {
            element.gifs.classList.remove("hide");
            element.start.classList.add("hide");
        }
    });

    // search clickhandler, executes main data retrieval function
    formElements.submit.addEventListener("click", function(ev) {
        ev.preventDefault();
        getSearchResults();
    });

    function getSearchResults() {

        var _urlForAPI = 'https://api.giphy.com/v1/gifs/search?q=' + formElements.searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=25';

        // Show loading icon
        formElements.loading.classList.remove('hide');

        aja()
            .url(_urlForAPI)

            // 'x' means any number (404, 400, etc. will match)
            .on('40x', function(response){
                element.searchResult.innerHTML = "Uh oh.. something went wrong here..";
            })

            // obj is a javascript object returned from Giphy API
            .on('success', function(obj){
                var _html = '';

                // remove loading icon
                formElements.loading.classList.add('hide');

                // display search results header
                element.searchResult.innerHTML = 'Search results for ' + '"' + formElements.searchBox.value + '"';

                // map the objects received with AJA and for each object, map the <img src attribute
                // to the 'embed_url' property of the object it loops over
                obj.data.map(function(element){
                    _html += "<img class='resultgif' src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                });

                // put the values of '_html' into the selected div to show them on the page
                element.images.innerHTML = _html;

                var _gifs = document.querySelectorAll('.resultgif');

               // GIF clickhandler
                _gifs.forEach(function(el){
                    el.addEventListener('click', function () {

                        // add gif to modal
                        modal.selectedGifContainer.appendChild(this);

                        // when the user clicks on the button, open the modal
                        modal.self.style.display             = 'flex';
                        modal.self.style.justifyContent      = 'center';
                        modal.self.style.alignItems          = 'center';
                        element.body.classList.add('hide-overflow');

                        // when the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal.self) {
                                modal.self.style.display = 'none';
                                element.body.classList.remove('hide-overflow');
                                modal.selectedGifContainer.removeChild(el);
                            }
                        };
                    });
                });
            })
            .go();
    }
})();

