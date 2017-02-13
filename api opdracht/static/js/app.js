/* Created by Tristan Jacobs on 13-02-17.
   Using AJA - Src: http://krampstudio.com/aja.js/
   & Giphy API

   =============================================

   IDEAS:
   - Add option to choose between stickers or gifs
   - Share
   - Use multiple sources
   - Previous search (with cookies)
*/



(function(){
"use strict";


    var _searchBox = document.getElementById('search'),
        _submit = document.getElementById('submit'),
        _loading = document.getElementById('loading');

        // clickhandler, executes main data retrieval function

        _submit.addEventListener("click", function () {
            event.preventDefault();
            getSearchResults();
        });
        
        function getSearchResults () {

            var _urlForAPI = 'http://api.giphy.com/v1/stickers/search?q=' + _searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=100';

            // Show loading icon
            _loading.classList.remove('hidden');

            aja()
                // url =
                .url(_urlForAPI)

                //obj is a javascript object returned from Giphy API
                .on('success', function(obj){
                    console.log(obj);

                    // remove loading icon
                    _loading.classList.add('hidden');

                    // display search results
                    document.getElementById('search-result').innerHTML = 'Search results for ' + '"' + _searchBox.value + '"';

                    var _html = '';

                    //map the objects received with AJA and for each object,
                    // set the <img src attribute to the 'embed_url' property of the object it loops over

                    obj.data.map(function(element){
                        _html += "<img src='https://i.giphy.com/" + element.id + ".gif" + "'>";
                    })

                    // put the value of '_html' into the selected div
                    document.getElementById('images').innerHTML = _html;

                })
                .go();
        };
// end of IIFE
}());