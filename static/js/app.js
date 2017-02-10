// Door Tristan Jacobs

// Met wat hulp van the one and only Dave Bitter
// Object Oriented, bitches!
// #justlikejava

// =============================================

(function() {
    // Engage strict mode
    "use strict";

    console.log("IIFE werkt!");


    // Main app initializer
    var _app = {

        // Routes initializer
        init: function () {
            _routes.init();
        }
    };

    var _routes = {
        init:  function () {
            // Als de hash verandert, voer de 'toggle' functie van het object 'sections' uit
            window.onhashchange =  function () {
                _sections.toggle();
            }
        }
    };

    var _sections = {
        toggle: function () {
            // Haal even alle secties op en ram ze in een variabel
            var _sectionList = document.querySelectorAll('section');

            // Voor elke sectie, voor de functie uit
            _sectionList.forEach(function (_section) {

                // Als de hash gelijk is aan de section ID, haal dan de class 'hide' weg
                if (location.hash === "#" + _section.id) {
                    _section.classList.remove("hide");

                // Als de hash niet gelijk is aan de section Id, voeg de class 'hide' toe
                } else {
                    _section.classList.add("hide");

                }
            });
        }
    };

    // Gooi de app maar aan
    _app.init();

})();
