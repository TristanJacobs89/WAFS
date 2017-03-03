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

// Find a better way to display gifs in detail view
// Fix responsive issues

// =============================================

(function() {
    // Engage strict mode
    "use strict";

    // Because jQuery is life
    function $(id) {
        return document.querySelector(id);
    }
    function $$(id) {
        return document.querySelectorAll(id);
    }

    // Object literals
    var element = {
        start                   : $('#start'),
        gifs                    : $('#gifs'),
        body                    : $('body'),
        searchResult            : $('#search-result'),
        images                  : $('#images'),
        detailView              : $('#detail-view'),
        backButton              : $('#back-btn')
    }

    var detailPage = {
        imgName                 : $('.imgName'),
        imgURL                  : $('.imgUrl'),
        imgUploader             : $('.imgUploader'),
        imgUploadDate           : $('.imgUploadDate')
    }

    var formElements = {
        searchform              : $('#searchform'),
        searchBox               : $('#search'),
        submit                  : $('#submit'),
        loading                 : $('#loading'),
        gifSelector             : $('#gifSelector'),
        stickerSelector         : $('#stickersSelector'),
        selectedFilter          : function () {
            if (this.gifSelector.checked) {
                return this.gifSelector.value;
            } else if (this.stickerSelector.checked) {
                return this.stickerSelector.value;
            }
        }
    }

    // var modal = {
    //     self                    : $('#modal'),
    //     modalContent            : $('#modal-content'),
    //     selectedGifContainer    : $('#selectedGif'),
    //     detailViewContainer     : $('#imgDetailView')
    // };

    // Routing
    routie(
        {
        'start': function() {
            element.start.classList.remove("hide");
            element.gifs.classList.add("hide");

        },
        'gifs': function() {
            element.gifs.classList.remove("hide");
            element.start.classList.add("hide");
        }
        }
    );

    element.backButton.addEventListener('click', function () {
        element.detailView.classList.add('hide');
        element.images.classList.remove('hide');
    })

    // search clickhandler, executes main data retrieval function
    formElements.searchform.addEventListener("submit", function(ev) {
        ev.preventDefault();
        getSearchResults(formElements.selectedFilter());
    });

    function getSearchResults(filter) {
        // Variable URL that gets sent to Giphy with Aja()
        var _urlForAPI = 'https://api.giphy.com/v1/' + filter + '/search?q=' + formElements.searchBox.value + '&api_key=dc6zaTOxFJmzC&limit=25';

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

                console.log(obj);

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

                        element.images.classList.add('hide');
                        element.detailView.classList.remove('hide');


                        console.log(obj.data);



                        // add gif to modal and make it a bit bigger
                        // modal.selectedGifContainer.appendChild(this);
                        // this.style.transform = 'scale(2)';

                        // // when the user clicks on the button, open the modal
                        // modal.self.style.display             = 'flex';
                        // modal.self.style.justifyContent      = 'center';
                        // modal.self.style.alignItems          = 'center';
                        // element.body.classList.add('hide-overflow');
                        //
                        // // when the user clicks anywhere outside of the modal, close it
                        // window.onclick = function(event) {
                        //     if (event.target == modal.self) {
                        //         modal.self.style.display = 'none';
                        //         element.body.classList.remove('hide-overflow');
                        //         modal.selectedGifContainer.removeChild(el);
                        //     }
                        // };
                    });
                });
            })
            .go();
    }
})();

