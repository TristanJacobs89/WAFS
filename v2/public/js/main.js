
// Refactoring:
// - Alles in objecten met methods in plaats van floating functions.
// - Gebruik de patterns van het vak, zie Slack.
// - Nu te veel eigen structuur (is niet erg, maar nog niet volgbaar via de diagrammen)
// - Diagram moet meer USER FLOW tonen; welke gebruikers interacties triggeren welke functionaliteiten?
// - User Feedback: Wat gebeurt er als de data niet geladen kan worden? Ofs als de zoekterm niet herkend wordt?


(function() {
  'use strict';

  var formElements = {
    $search_form:   document.getElementById('search-form'),
    $search_input:  document.getElementById('input-search-form'),

    SUBMIT: function() {
      formElements.$search_form.addEventListener('submit', function(e) {
        console.log('clicked');
      });
    }
  };

  formElements.SUBMIT();


}());
