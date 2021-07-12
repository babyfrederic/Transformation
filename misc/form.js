(fonction ($) {

/**
 * Récupère le résumé du premier élément.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && rappel) ? $.trim(callback(this[0])) : '';
} ;

/**
 * Définit le résumé pour tous les éléments appariés.
 *
 * @param rappel
 * Soit une fonction qui sera appelée à chaque fois que le résumé est
 * récupéré ou une chaîne (qui est renvoyée à chaque fois).
 */
$.fn.drupalSetSummary = fonction (rappel) {
  var self = ceci;

  // Pour faciliter les choses, le rappel doit toujours être une fonction. Si c'est
  // non, nous l'enveloppons dans une fonction anonyme qui renvoie simplement la valeur.
  if (type de rappel != 'fonction') {
    var val = rappel ;
    callback = function () { return val; } ;
  }

  retourne ça
    .data('summaryCallback', rappel)
    // Pour éviter les événements en double, les gestionnaires sont d'abord supprimés, puis
    // (ré-)ajouté.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // Le gestionnaire réel summaryUpdated ne se déclenche pas lorsque le rappel est
    // changé, nous devons donc le faire manuellement.
    .trigger('summaryUpdated');
} ;

/**
 * Envoie un événement 'formUpdated' chaque fois qu'un élément de formulaire est modifié.
 */
Drupal.behaviors.formUpdated = {
  attacher : fonction (contexte) {
    // Ces événements sont dans un espace de noms afin que nous puissions les supprimer plus tard.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(contexte)
      // Puisque le contexte pourrait être un élément d'entrée lui-même, il est rajouté à
      // l'objet jQuery et filtré à nouveau.
      .find(':input').andSelf().filter(':input')
      // Pour éviter les événements en double, les gestionnaires sont d'abord supprimés, puis
      // (ré-)ajouté.
      .unbind(événements).bind(événements, fonction () {
        $(this).trigger('formUpdated');
      });
  }
} ;

/**
 * Préremplir les champs du formulaire avec les informations du cookie visiteur.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: fonction (contexte, paramètres) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['nom', 'mail', 'page d'accueil'], fonction () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
} ;

})(jQuery);