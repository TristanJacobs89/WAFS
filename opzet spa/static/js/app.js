// Door Tristan Jacobs

// Met wat hulp van the one and only Dave Bitter
// Object Oriented, bitches!
// #justlikejava

// =============================================

(function() {
    // Engage strict mode
    "use strict";

    console.log("IIFE werkt!");

    // Var declarations
    var _searchBox = document.getElementById('search'),
        _submit = document.getElementById('submit'),
        _loading = document.getElementById('loading');

    // search clickhandler, executes main data retrieval function
    _submit.addEventListener("click", function () {
        event.preventDefault();
        getSearchResults();
    });

    // Main app initializer
    var _app = {

        // Routes initializer
        init: function () {
            _routes.init();
        }
    };

    var _routes = {
        init:  function () {

            // On hashchange, execute 'toggle' function from '_sections'
            window.onhashchange =  function () {
                _sections.toggle();
            }
        }
    };

    var _sections = {
        toggle: function () {
            // Get sections and put them into an array
            var _sectionList = document.querySelectorAll('section');

            // For each section, execute function
            _sectionList.forEach(function (_section) {

                // If the hash is equal to the section ID, remove class 'hide'
                if (location.hash === "#" + _section.id) {
                    _section.classList.remove("hide");

                    // If the hash is not equal to the section ID, add class 'hide'
                } else {
                    _section.classList.add("hide");

                }
            });
        }
    };

    function getSearchResults () {

        var _urlForAPI = 'http://api.giphy.com/v1/gifs/search?q=' + _searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=100';

        // Show loading icon
        _loading.classList.remove('hide');

        aja()
        // url =
            .url(_urlForAPI)

            // obj is a javascript object returned from Giphy API
            .on('success', function(obj){
                console.log(obj);

                // remove loading icon
                _loading.classList.add('hide');

                // display search results header
                document.getElementById('search-result').innerHTML = 'Search results for ' + '"' + _searchBox.value + '"';

                var _html = '';

                // map the objects received with AJA and for each object,
                // set the <img src attribute to the 'embed_url' property of the object it loops over
                obj.data.map(function(element){
                    _html += "<img src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                })

                // put the value of '_html' into the selected div to show them on the page
                document.getElementById('images').innerHTML = _html;

            })
            .go();
    };

    // Gooi de app maar aan
    _app.init();



})();
