// Door Tristan Jacobs
// With some help of the one and only Dave Bitter

// Object Oriented, bitches!
// #justlikejava

// Libraries used:
// - Aja.js
// - Routie.js
// - Transparency.js

// TO DO:

// - Alles in objecten met methods in plaats van floating functions.
// - Gebruik de patterns van het vak, zie Slack.
// - Diagram moet meer USER FLOW tonen; welke gebruikers interacties triggeren welke functionaliteiten?
// - User Feedback: Wat gebeurt er als de data niet geladen kan worden? Ofs als de zoekterm niet herkend wordt?
// - Deployen
// =============================================

(function () {
    "use strict";

    var init = function () {

        // UTILITIES
        // =============================================
        var UTILS = {
            $: function (id) {
                return document.querySelector(id);
            },
            $$: function (el) {
                return document.querySelectorAll(id);
            }
        };

        var DOM_ELEMENTS = {
            $results_area: UTILS.$("#results")
        };

        // FORM OBJECT
        // =============================================
        var FORM = {
            $self:              UTILS.$('#search-form'),
            $search_input:      UTILS.$('#search-input'),
            $gif_selector:      UTILS.$('#gif-selector'),
            $sticker_selector:  UTILS.$('#sticker-selector'),
            $submit_button:     UTILS.$('#submit'),
            $spinner:           UTILS.$('#spinner'),

            // Method for getting the query type (stickers or gifs)
            getQueryType: function () {

                // Set the query type to "gifs" if gifs checkbox is selected
                if (FORM.$gif_selector.checked) {
                    var queryType = "gifs";
                    console.log('User selected GIFS');
                    return queryType;

                    // Set the query type to "stickers" if stickers checkbox is selected
                } else if (form.$sticker_selector.checked) {
                    var queryType = "stickers";
                    console.log('User selected STICKERS');
                    return queryType;
                }
            },

            // Method for getting the user's query
            getSearchQuery: function () {
                var query = FORM.$search_input.value;
                return query;
            },

            // Method for submitting form
            submit: function (form) {
                FORM.$self.addEventListener('submit', function(e) {

                    // Prevent page from reloading on submit
                    e.preventDefault();

                    // Get the url parameters
                    var query_type  = FORM.getQueryType(),
                        query       = FORM.getSearchQuery(),
                        urlForApi   = api_config.URL + query_type + "/search?q=" + query + "&api_key=" + api_config.KEY;

                    // Get date from the API
                    doApiCall(urlForApi);
                });
            },

            // Renders images into HTML
            showData: function (data) {
              data.data.map(function(item) {
                var img_link = item.images.fixed_height.mp4;
                DOM_ELEMENTS.$results_area.innerHTML +=
                 '<video autoplay="autoplay" loop="loop">' +
                   '<source src="' + img_link + '" type="video/mp4" />' +
                 '</video>'
              });
            }
        };

        // ROUTING
        // =============================================
        routie({
            'start': function () {
                console.log('Start page loaded.');

            },
            'detail/?:id': function () {
                console.log('Detail page loaded.');
            }
        });

        // API REQUESTS
        // =============================================
        function doApiCall (url) {

            // Show spinner and hide submit button
            FORM.$spinner.classList.remove('hidden');
            FORM.$submit_button.classList.add('hidden');

            // Set a 1 second delay on the API call for perceived performance
            setTimeout(function (){
              var request = new XMLHttpRequest ();
              request.open('GET', url, true);
              request.onload = function () {
                  if (request.status >= 200 && request.status < 400) {
                      var data = JSON.parse(request.responseText);
                      FORM.showData(data);
                      // Hide spinner and show submit button again
                      FORM.$spinner.classList.add('hidden');
                      FORM.$submit_button.classList.remove('hidden');
                      console.log(data);

                  } else {
                      console.log("Error!");
                  }
              };
              request.onerror = function (err) {
                  console.log('Error making connection: ' + err);
              };
              request.send();

            }, 1000)
        };

        // Initialize form submit functionality
        FORM.submit();
    };
    // Initialize app
    init();
})();
