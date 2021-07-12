/**
 * Pour les versions jQuery inférieures à 3.4.0, cela remplace le jQuery.extend
 * fonction avec celle de jQuery 3.4.0, légèrement modifiée (documentée
 * ci-dessous) pour être compatible avec les anciennes versions et navigateurs de jQuery.
 *
 * Cela fournit le correctif de vulnérabilité de pollution Object.prototype à Drupal
 * installations exécutant d'anciennes versions de jQuery, y compris les versions livrées
 * avec Drupal core et https://www.drupal.org/project/jquery_update.
 *
 * @voir https://github.com/jquery/jquery/pull/4333
 */

(fonction (jQuery) {

// Ne remplace pas jQuery.extend() si la version jQuery est déjà >=3.4.0.
var versionParts = jQuery.fn.jquery.split('.');
var majorVersion = parseInt(versionParts[0]);
var minorVersion = parseInt(versionParts[1]);
var patchVersion = parseInt(versionParts[2]);
var isPreReleaseVersion = (patchVersion.toString() !== versionParts[2]);
si (
  (Version majeure > 3) ||
  (version majeure === 3 && version mineure > 4) ||
  (majorVersion === 3 && minorVersion === 4 && patchVersion > 0) ||
  (majorVersion === 3 && minorVersion === 4 && patchVersion === 0 && !isPreReleaseVersion)
) {
  revenir;
}

/**
 * Ceci est presque textuellement copié à partir de jQuery 3.4.0.
 *
 * Seuls deux changements mineurs ont été apportés :
 * - L'appel à isFunction() est changé en jQuery.isFunction().
 * - Les deux appels à Array.isArray() sont changés en jQuery.isArray().
 *
 * Les deux changements ci-dessus assurent la compatibilité avec toutes les anciennes versions de jQuery
 * (1.4.4 - 3.3.1) et versions antérieures du navigateur (par exemple, IE8).
 */
jQuery.extend = jQuery.fn.extend = function() {
  options var, nom, src, copie, copyIsArray, clone,
    cible = arguments[ 0 ] || {},
    je = 1,
    longueur = arguments.longueur,
    profond = faux ;

  // Gérer une situation de copie profonde
  if ( type de cible === "booléen" ) {
    profond = cible ;

    // Ignore le booléen et la cible
    cible = arguments[ i ] || {} ;
    je++ ;
  }

  // Gère la casse lorsque la cible est une chaîne ou quelque chose (possible en copie profonde)
  if ( type de cible !== "objet" && !jQuery.isFunction( cible ) ) {
    cible = {} ;
  }

  // Étend jQuery lui-même si un seul argument est passé
  si ( je === longueur ) {
    cible = ceci ;
    je--;
  }

  pour ( ; i < longueur ; i++ ) {

    // Ne traite que les valeurs non nulles/non définies
    if ( ( options = arguments[ i ] ) != null ) {

      // Étendre l'objet de base
      pour (nom dans les options) {
        copier = options[ nom ];

        // Empêcher la pollution de l'objet.prototype
        // Empêche la boucle sans fin
        if ( nom === "__proto__" || cible === copie ) {
          Continuez;
        }

        // Recurse si nous fusionnons des objets simples ou des tableaux
        if ( profond && copie && ( jQuery.isPlainObject( copie ) ||
          ( copyIsArray = jQuery.isArray ( copie ) ) ) ) {
          src = cible[ nom ];

          // Assurez-vous que le type de la valeur source est correct
          if ( copyIsArray && !jQuery.isArray( src ) ) {
            cloner = [];
          } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
            cloner = {};
          } autre {
            clone = src;
          }
          copyIsArray = false;

          // Ne jamais déplacer les objets originaux, les cloner
          cible[ nom ] = jQuery.extend( profond, clone, copie );

          // N'apporte pas de valeurs non définies
        } else if ( copier !== non défini ) {
          cible[ nom ] = copie;
        }
      }
    }
  }

  // Retourne l'objet modifié
  objectif de retour ;
} ;

})(jQuery);