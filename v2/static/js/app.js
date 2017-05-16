// Door Tristan Jacobs
// With some help of the one and only Dave Bitter

// Object Oriented, bitches!
// #justlikejava

// Libraries used:
// - Aja.js
// - Routie.js
// - Transparency.js

// TO DO:

// X Alles in objecten met methods in plaats van floating functions.
// X Gebruik de patterns van het vak, zie Slack.
// - Diagram moet meer USER FLOW tonen; welke gebruikers interacties triggeren welke functionaliteiten?
// - User Feedback: Wat gebeurt er als de data niet geladen kan worden? Ofs als de zoekterm niet herkend wordt?
// - Deployen
// - Filter functionaliteit inbouwen (.filter(), .map(), .reduce() .sort() moeten er in ieder geval inzitten, of het nut heeft of niet)
//
// =============================================

(function() {
    "use strict";

/* UTILITIES
========================================================================= */

    var utils = {
        $: function(id) {
            return document.querySelector(id);
        },
        $$: function(el) {
            return document.querySelectorAll(id);
        }
    };

/* DOM ELEMENTS
========================================================================= */

    var elements = {
        sections: {
            $details:           utils.$("#details"),
            $img_container:     utils.$('#img-container'),
            $start:             utils.$('#start'),
            $result_area:       utils.$('#results'),
            $error:             utils.$('#error')
        },

        form: {
            $self:              utils.$('#search-form'),
            $search_input:      utils.$('#search-input'),
            $gif_selector:      utils.$('#gif-selector'),
            $sticker_selector:  utils.$('#sticker-selector'),
            $submit_button:     utils.$('#submit'),
            $spinner:           utils.$('#spinner')
        },

        toggleSpinner: function() {
            elements.form.$spinner.classList.toggle('hidden');
            elements.form.$submit_button.classList.toggle('hidden');
        }
    };

/* ROUTES
========================================================================= */

    var routes = {
        init: function() {
            routie({

                // Set default route to #start
                '': function() {
                    location.hash = '#start';
                },
                // Start route
                'start': function() {
                    elements.sections.$start.classList.remove("hidden");
                    elements.sections.$details.classList.add("hidden");

                },
                // Details route
                'details/:id': function() {
                    elements.sections.$start.classList.add("hidden");
                    elements.sections.$details.classList.remove("hidden");
                    app.getDetails();
                }
            });
        }
    };

/* MAIN APP
========================================================================= */
    var app = {

        /* Initializer
        ===================== */

        init: function() {
            routes.init();

            elements.form.$self.addEventListener('submit', function(e) {
                // Prevent page from reloading on submit
                e.preventDefault();

                // Get the url parameters
                var query_type = app.getQueryType(),
                    query = app.getSearchQuery(),
                    urlForApi = api_config.URL + query_type + "/search?q=" + query + "&api_key=" + api_config.KEY;

                // Get date from the API
                app.doApiCall(urlForApi);
            });
        },

        /* Call to API
        ===================== */

        doApiCall: function(url) {

            // Empty the result area
            elements.sections.$result_area.innerHTML = '';
            // Toggle the loading spinner
            elements.toggleSpinner();

            // Set a 1 second delay on the API call for perceived performance
            setTimeout(function() {
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        var response = JSON.parse(request.responseText).data.reduce(
                          function(accumulator, currentValue) {
                            accumulator.push({
                              id: currentValue.id,
                              image: currentValue.images.fixed_height
                            });
                            
                            return accumulator;
                          }, []);

                        console.log(response);

                        if (response.length == 0) {

                          console.log('No data..');
                          elements.toggleSpinner();

                          // Show error message on page if there is no data
                          elements.sections.$error.classList.remove('hidden');

                        } else {
                          elements.sections.$error.classList.add('hidden');
                          console.log('Data found!');
                          // Turn off the loading spinner
                          elements.toggleSpinner();
                          app.renderData(response);

                        }
                    } else {
                        console.log("Error!");
                    }
                };
                request.onerror = function(err) {
                    console.log('Error making connection: ' + err);
                };
                request.send();
            }, 1000)
        },

        /* Get the query type (stickers or gifs)
        ===================== */

        getQueryType: function() {

            // Set the query type to "gifs" if gifs checkbox is selected
            if (elements.form.$gif_selector.checked) {
                var queryType = "gifs";
                console.log('User selected GIFS');
                return queryType;

                // Set the query type to "stickers" if stickers checkbox is selected
            } else if (elements.form.$sticker_selector.checked) {
                var queryType = "stickers";
                console.log('User selected STICKERS');
                return queryType;
            }
        },

        /* Get the search query
        ===================== */

        getSearchQuery: function() {
            var query = elements.form.$search_input.value;
            return query;
        },

        /* Render data on page
        ===================== */

        renderData: function(results) {
            results.map(function(item) {
                var img_link = item.image.mp4;
                var item_id = item.id;
                window.scroll(0, 300);
                elements.sections.$result_area.innerHTML += '<a href="#details/' + item_id + '">' + '<video autoplay="autoplay" loop="loop">' + '<source src="' + img_link + '" type="video/mp4" />' + '</video></a>';
            });
        },

        /* Get details of selected image
        ===================== */

        getDetails: function() {
            var hashRoute = location.hash;
            var id = hashRoute.slice(9);
            var url = api_config.URL + "gifs/" + id + "?api_key=" + api_config.KEY;

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    app.renderDetails(data);
                } else {
                    console.log("Error!");
                }
            };
            request.send();

        },

        /* Render details of selected image in details section
        ===================== */

        renderDetails: function(object) {

            var bigImg = object.data.images.downsized_medium.url;
            var detailsPage = elements.sections.$img_container;
            detailsPage.innerHTML = '<img src="' + bigImg + '">'
        }
    };
    app.init();
})();
