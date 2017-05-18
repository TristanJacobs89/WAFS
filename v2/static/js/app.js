// By Tristan Jacobs

// TO DO:

// - Diagram moet meer USER FLOW tonen; welke gebruikers interacties triggeren welke functionaliteiten?
// - Deployen
// =============================================

(function() {
    "use strict";

/* API CONFIG
======================================================================= */

    var api_config = {
      KEY: "dc6zaTOxFJmzC",
      URL: "http://api.giphy.com/v1/"
    };

/* UTILITIES
========================================================================= */

    var utils = {
        $: function(id) {
            return document.getElementById(id);
        }
    };

/* DOM ELEMENTS
========================================================================= */

    var elements = {
        sections: {
            $details:           utils.$("details"),
            $img_container:     utils.$('img-container'),
            $img_source:        utils.$('img-source'),
            $img_post_date:     utils.$('img-posted-on'),
            $start:             utils.$('start'),
            $result_area:       utils.$('results')
        },

        errors: {
            $nothingFound:      utils.$('error_nothing_found'),
            $noData:            utils.$('error_no_data')
        },

        form: {
            $self:              utils.$('search-form'),
            $search_input:      utils.$('search-input'),
            $gif_selector:      utils.$('gif-selector'),
            $sticker_selector:  utils.$('sticker-selector'),
            $submit_button:     utils.$('submit'),
            $spinner:           utils.$('spinner')
        },

        toggleSpinner: function () {
            elements.form.$spinner.classList.toggle('hidden');
        },

        showStartPage: function () {
            elements.sections.$start.classList.remove("hidden");
            elements.sections.$details.classList.add("hidden");
        },

        showDetailsPage: function () {
            elements.sections.$start.classList.add("hidden");
            elements.sections.$details.classList.remove("hidden");
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
                    elements.showStartPage();

                },
                // Details route
                'details/:id': function() {
                    elements.showDetailsPage();
                    app.getDetailsAndRender();
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
                var query_type  = app.getQueryType(),
                    query       = app.getSearchQuery(),
                    urlForApi   = api_config.URL + query_type + "/search?q=" + query + "&api_key=" + api_config.KEY;

                // Get data from the API
                app.doApiCall(urlForApi);
            });
        },

        /* Data retrieved by api call
        ===================== */

        data: {},

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

                // empty the data object
                app.data = {};

                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        // Use reduce to filter out only the needed information from the returned data
                        var response = JSON.parse(request.responseText).data.reduce(
                          function(accumulator, currentValue) {
                            accumulator.push({
                              id:       currentValue.id,
                              image:    currentValue.images.preview_webp,
                            });

                            // Populate app.data with values for the gif-info page
                            app.data[currentValue.id] = {
                              bigImg:   currentValue.images.downsized_large.url,
                              postDate: currentValue.import_datetime,
                              source:   currentValue.source_post_url
                            };

                            return accumulator;

                          // Sort the data by their ID's
                        }, []).sort(function(a, b) {
                          return a.id - b.id;
                        });

                        // Check if the response object has data
                        if (response.length == 0) {

                          console.log('No data..');
                          elements.toggleSpinner();

                          // Show error message on page if there is no data found
                          elements.errors.$nothingFound.classList.remove('hidden');

                        } else {

                          elements.errors.$nothingFound.classList.add('hidden');
                          console.log('Data found!');
                          elements.toggleSpinner();

                          // Call the render data function to show images
                          app.renderData(response);
                        }
                    } else {
                        // Show error when the request fails
                        console.log("Error: " + request.statusText);
                        elements.errors.$noData.classList.toggle('hidden');
                    }
                };
                request.send();
            }, 1000)
        },

        /* Get the query type (stickers or gifs)
        ===================== */

        getQueryType: function() {

          var queryType;

            // Set the query type to "gifs" if gifs checkbox is selected
            if (elements.form.$gif_selector.checked) {
                queryType = "gifs";
                console.log('User selected GIFS');
                return queryType;

                // Set the query type to "stickers" if stickers checkbox is selected
            } else if (elements.form.$sticker_selector.checked) {
                queryType = "stickers";
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

                var img_link  = item.image.url;
                var item_id   = item.id;

                window.scroll(0, 300);
                elements.sections.$result_area.innerHTML +=
                '<a class="animated fadeIn" href="#details/' + item_id + '">' +
                    '<img src="' + img_link + '"/>' +
                '</a>';
            });
        },

        /* Get details of selected image
        ===================== */

        getDetailsAndRender: function() {
            var hashRoute = location.hash;
            var id        = hashRoute.slice(9);
            var gifObj    = app.data[id];

            // get data for the gif-element from app.data object
            var bigImg    = gifObj.bigImg;
            var postDate  = gifObj.postDate;
            var source    = gifObj.source;

            elements.sections.$img_container.innerHTML  = '<img class="detail-img" src="' + bigImg + '">';
            elements.sections.$img_source.innerHTML     = '<a href="'+ source + '" target="_blank">' + source + '</a>';
            elements.sections.$img_post_date.innerHTML  = postDate;

        }
    };
    app.init();
})();
