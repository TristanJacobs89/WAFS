// Door Tristan Jacobs
// With some help of the one and only Dave Bitter

// Object Oriented, bitches!
// #justlikejava

// Libraries used:
// - Aja.js
// - Routie.js
// - jQuery.js
// - Transparency.js

// TO DO:

// Refactoring:
// - Alles in objecten met methods in plaats van floating functions.
// - Gebruik de patterns van het vak, zie Slack.
// - Nu te veel eigen structuur (is niet erg, maar nog niet volgbaar via de diagrammen)
// - Diagram moet meer USER FLOW tonen; welke gebruikers interacties triggeren welke functionaliteiten?
// - User Feedback: Wat gebeurt er als de data niet geladen kan worden? Ofs als de zoekterm niet herkend wordt?

// =============================================

(function() {
    "use strict";

// UTILITIES
// =============================================
    var utils = {
      $:    function(id) {
        return document.querySelector(id);
      },
      $$:   function(el) {
        return document.querySelectorAll(id);
      }
    };

// DOM ELEMENTS
// =============================================
    var element = {

    };


// ROUTING
// =============================================
    routie(
        {
          'start': function() {


          },
          'gifs': function() {

          }
        });

})();
