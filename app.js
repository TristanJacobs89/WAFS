// Door Tristan Jacobs

// Met wat hulp van the one and only Dave Bitter
// Object Oriented, bitches!
// #justlikejava

// =============================================

// Engage nazi-mode
"use strict";

(function() {
    console.log("IIFE werkt!");


    // Main app initializer
    var app = {

        // Routes initializer
        init: function () {
            routes.init();
        }
    };

    var routes = {
        init:  function () {
            // Als de hash verandert, voer de 'toggle' functie van het object 'sections' uit
            window.onhashchange =  function () {
                sections.toggle();
            }
        }
    };

    var sections = {
        toggle: function () {
            // Haal even alle secties op en ram ze in een variabel
            var sectionList = document.querySelectorAll('section');

            // Voor elke sectie, voor de functie uit
            sectionList.forEach(function (section) {

                // Als de hash gelijk is aan de section ID, haal dan de class 'hide' weg
                if (location.hash === "#" + section.id) {
                    section.classList.remove("hide");

                // Als de hash niet gelijk is aan de section Id, voeg de class 'hide' toe
                } else {
                    section.classList.add("hide");

                }
            });
        }
    };

    // Gooi de app maar aan
    app.init();

})();
