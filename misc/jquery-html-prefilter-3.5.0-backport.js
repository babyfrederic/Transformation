/**
 * Pour les versions jQuery inférieures à 3.5.0, cela remplace le jQuery.htmlPrefilter()
 * fonction avec un qui corrige ces vulnérabilités de sécurité tout en
 * conserver le comportement pré-3.5.0 là où il est sûr de le faire.
 * - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11022
 * - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11023
 *
 * De plus, pour les versions jQuery qui n'ont pas de jQuery.htmlPrefilter()
 * fonction (1.x avant 1.12 et 2.x avant 2.2), cela l'ajoute, et
 * étend les fonctions qui doivent l'appeler pour le faire.
 *
 * La version jQuery de Drupal core est 1.4.4, mais jQuery Update peut fournir une
 * version différente, donc cela couvre toutes les versions entre 1.4.4 et 3.4.1.
 * Les liens GitHub dans les commentaires du code ci-dessous renvoient au code jQuery 1.5, car
 * 1.4.4 n'est pas sur GitHub, mais le code référencé n'a pas changé de 1.4.4 à
 * 1.5.
 */

(fonction (jQuery) {

  // Certaines parties de ce backport diffèrent selon la version de jQuery.
  var versionParts = jQuery.fn.jquery.split('.');
  var majorVersion = parseInt(versionParts[0]);
  var minorVersion = parseInt(versionParts[1]);

  // Aucun backport n'est nécessaire si nous sommes déjà sur jQuery 3.5 ou supérieur.
  if ( (Version majeure > 3) || (Version majeure === 3 &&Version mineure >= 5) ) {
    revenir;
  }

  // Avant jQuery 3.5, jQuery convertissait les balises à fermeture automatique de style XHTML en
  // leur équivalent XML : par exemple, "<div />" à "<div></div>". C'est
  // problématique pour plusieurs raisons, notamment parce qu'il est vulnérable au XSS
  // attaque. Cependant, comme c'était le comportement de jQuery pendant de nombreuses années, de nombreux
  // Les modules Drupal et les plugins jQuery peuvent s'appuyer dessus. Par conséquent, nous
  // préserve ce comportement, mais pour un ensemble limité de balises uniquement, que nous pensons
  // pour ne pas être vulnérable. Il s'agit de l'ensemble de balises HTML qui satisfont à toutes les
  // conditions suivantes :
  // - Dans la liste des balises HTML de DOMPurify. Si une balise HTML n'est pas suffisamment sûre pour
  // apparaissent dans cette liste, alors nous ne voulons pas non plus nous en mêler ici.
  // @voir https://github.com/cure53/DOMPurify/blob/2.0.11/dist/purify.js#L128
  // - Un élément normal (pas un élément vide, modèle, texte ou étranger).
  // @voir https://html.spec.whatwg.org/multipage/syntax.html#elements-2
  // - Un élément qui est toujours défini par la spécification HTML actuelle
  // (ce n'est pas un élément obsolète), car nous ne voulons pas nous fier à la façon dont
  // les navigateurs analysent les éléments obsolètes.
  // @voir https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  // - Pas 'html', 'head' ou 'body', car cette extension pseudo-XHTML est
  // conçu pour des fragments, pas pour des documents entiers.
  // - Pas 'colgroup', car en raison d'une idiosyncrasie de l'original de jQuery
  // expression régulière, elle ne correspond pas sur colgroup, et nous ne voulons pas
  // introduire un changement de comportement pour cela.
  var selfClosingTagsToReplace = [
    'a', 'abbr', 'adresse', 'article', 'a part', 'audio', 'b', 'bdi', 'bdo',
    'blockquote', 'button', 'canvas', 'légende', 'cite', 'code', 'data',
    'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em',
    'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'header', 'hgroup', 'i', 'ins', 'kbd', 'label', 'legend',
    'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav', 'ol', 'optgroup',
    'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt',
    'ruby', 's', 'samp', 'section', 'select', 'small', 'source', 'span',
    'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th',
    'thead', 'time', 'tr', 'u', 'ul', 'var', 'video'
  ] ;

  // Définir des expressions régulières pour <TAG/> et <TAG ATTRIBUTES/>. Faire cela comme
  // deux expressions permettent de cibler plus facilement <a/> sans cibler également
  // chaque balise qui commence par "a".
  var xhtmlRegExpGroup = '(' + selfClosingTagsToReplace.join('|') + ')';
  var whitespace = '[\\x20\\t\\r\\n\\f]';
  var rxhtmlTagWithoutSpaceOrAttributes = new RegExp('<' + xhtmlRegExpGroup + '\\/>', 'gi');
  var rxhtmlTagWithSpaceAndMaybeAttributes = new RegExp('<' + xhtmlRegExpGroup + '(' + whitespace + '[^>]*)\\/>', 'gi');

  // jQuery 3.5 a également corrigé une vulnérabilité lorsque </select> apparaît dans
  // une <option> ou <optgroup>, mais il l'a fait dans le code local que nous ne pouvons pas
  // rétroporter directement. Au lieu de cela, nous filtrons de tels cas. Pour ce faire, nous devons
  // déterminer quand jQuery invoquerait autrement le code vulnérable, qu'il
  // utilise cette expression régulière pour déterminer. L'expression régulière a changé
  // pour la version 3.0.0 et à nouveau modifié pour la 3.4.0.
  // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L4958
  // @voir https://github.com/jquery/jquery/blob/3.0.0/dist/jquery.js#L4584
  // @voir https://github.com/jquery/jquery/blob/3.4.0/dist/jquery.js#L4712
  var rtagName;
  si (version majeure < 3) {
    rtagName = /<([\w:]+)/;
  }
  else if (minorVersion < 4) {
    rtagName = /<([az][^\/\0>\x20\t\r\n\f]+)/i;
  }
  autre {
    rtagName = /<([az][^\/\0>\x20\t\r\n\f]*)/i;
  }

  // L'expression régulière que jQuery utilise pour déterminer quelle fermeture automatique
  // balises à développer pour ouvrir et fermer les balises. Ceci est vulnérable, car il
  // correspond à tous les noms de balises à l'exception des quelques exclus. Nous n'utilisons que cela
  // expression pour déterminer la vulnérabilité. L'expression a changé pour
  // version 3, mais nous avons seulement besoin de vérifier la vulnérabilité dans les versions 1 et 2,
  // donc nous utilisons l'expression de ces versions.
  // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L4957
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;

  jQuery.extend({
    htmlPréfiltre : fonction (html) {
      // C'est ainsi que jQuery détermine la première balise dans le HTML.
      // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L5521
      var tag = ( rtagName.exec( html ) || [ "", "" ] )[ 1 ].toLowerCase();

      // Ce n'est pas du HTML valide pour <option> ou <optgroup> d'avoir <select> comme
      // soit un descendant, soit un frère, et les tentatives d'injection peuvent provoquer
      // XSS sur les versions jQuery antérieures à 3.5. Comme il s'agit d'un code HTML invalide et
      // attaque XSS possible, rejet de la chaîne entière.
      // @voir https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11023
      if ((tag === 'option' || tag === 'optgroup') && html.match(/<\/?select/i)) {
        html = '';
      }

      // Conserver les conversions de jQuery antérieures à 3.5 de pseudo-XHTML, mais uniquement pour
      // les balises de la liste `selfClosingTagsToReplace` définie ci-dessus.
      // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L5518
      // @voir https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11022
      html = html.replace(rxhtmlTagWithoutSpaceOrAttributes, "<$1></$1>");
      html = html.replace(rxhtmlTagWithSpaceAndMaybeAttributes, "<$1$2></$1>");

      // Avant jQuery 1.12 et 2.2, cette fonction est appelée (via le code plus tard
      // dans ce fichier) en plus, plutôt qu'à la place, de l'unsafe
      // expansion des balises à fermeture automatique (y compris celles qui ne figurent pas dans la liste ci-dessus).
      // Nous ne pouvons pas empêcher cette extension dangereuse de s'exécuter, donc à la place nous
      // vérifiez que cela n'affecte pas le DOM renvoyé par le
      // logique d'analyse du navigateur. Si cela l'affecte, alors il est vulnérable à
      // XSS, donc nous rejetons la chaîne entière.
      if ( (majorVersion === 1 && minorVersion < 12) || (majorVersion === 2 && minorVersion < 2) ) {
        var htmlRisky = html.replace(rxhtmlTag, "<$1></$2>");
        if (htmlRisque !== html) {
          // Même si htmlRisky et html sont des chaînes différentes, elles peuvent
          // représente la même structure HTML une fois analysée, auquel cas,
          // htmlRisky est réellement sûr. Nous pouvons demander au navigateur d'analyser les deux
          // pour le découvrir, mais le navigateur ne peut pas analyser les fragments de table (par exemple, un
          // au niveau racine "<td>"), nous devons donc les envelopper. Nous avons juste besoin de ça
          // technique pour fonctionner sur tous les navigateurs pris en charge ; nous n'avons pas besoin de
          // copie à partir de la version jQuery spécifique que nous utilisons.
          // @voir https://github.com/jquery/jquery/blob/3.5.1/dist/jquery.js#L4939
          var wrapMap = {
            thead : [ 1, "<table>", "</table>" ],
            col : [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr : [ 2, "<table><tbody>", "</tbody></table>" ],
            td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
          } ;
          wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
          wrapMap.th = wrapMap.td;

          // Fonction pour encapsuler du HTML dans quelque chose qu'un navigateur peut analyser.
          // @voir https://github.com/jquery/jquery/blob/3.5.1/dist/jquery.js#L5032
          var getWrappedHtml = fonction (html) {
            var wrap = wrapMap[tag];
            si (envelopper) {
              html = wrap[1] + html + wrap[2];
            }
            retour html;
          } ;

          // Fonction pour renvoyer le code HTML canonique après l'avoir analysé. Cette analyse
          // seul; il n'exécute pas de scripts.
          // @voir https://github.com/jquery/jquery-migrate/blob/3.3.0/src/jquery/manipulation.js#L5
          var getParsedHtml = fonction (html) {
            var doc = window.document.implementation.createHTMLDocument( "" );
            doc.body.innerHTML = html;
            retourner doc.body ? doc.body.innerHTML : '';
          } ;

          // Si le navigateur n'a pas pu analyser l'un ou l'autre avec succès, ou si
          // htmlRisky analyse différemment que html, alors html est vulnérable,
          // alors rejetez-le.
          var htmlParsed = getParsedHtml(getWrappedHtml(html));
          var htmlRiskyParsed = getParsedHtml(getWrappedHtml(htmlRisky));
          if (htmlRiskyParsed === '' || htmlParsed === '' || (htmlRiskyParsed !== htmlParsed)) {
            html = '';
          }
        }
      }

      retour html;
    }
  });

  // Avant jQuery 1.12 et 2.2, jQuery.clean(), jQuery.buildFragment() et
  // jQuery.fn.html() n'a pas appelé jQuery.htmlPrefilter(), nous l'ajoutons donc.
  if ( (majorVersion === 1 && minorVersion < 12) || (majorVersion === 2 && minorVersion < 2) ) {
    // Filtre le HTML entrant dans jQuery.fn.html().
    var fnOriginalHtml = jQuery.fn.html;
    jQuery.fn.extend({
      // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L5147
      html : fonction (valeur) {
        if (type de valeur === "chaîne") {
          valeur = jQuery.htmlPréfiltre(valeur);
        }
        // .html() peut être appelé en tant que setter (avec un argument) ou en tant que getter
        // (sans argument), alors invoquez fnOriginalHtml() de la même manière que
        // nous avons été invoqués.
        return fnOriginalHtml.apply(this, arguments.length ? [value] : []);
      }
    });

    // L'expression régulière que jQuery utilise pour déterminer si une chaîne est HTML.
    // Utilisé à la fois par clean() et buildFragment().
    // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L4960
    var rhtml = /<|&#?\w+;/;

    // Filtrer le HTML entrant dans :
    // - jQuery.clean() pour les versions antérieures à 1.9.
    // - jQuery.buildFragment() pour la version 1.9 et supérieure.
    //
    // Les constructions en boucle dans les deux fonctions peuvent être essentiellement
    // identiques, mais ils sont chacun exprimés ici de la manière la plus proche
    // correspond à leur expression d'origine dans jQuery, de sorte que nous filtrons tout
    // les éléments et uniquement les éléments que jQuery traitera comme des chaînes HTML.
    if (majorVersion === 1 && minorVersion < 9) {
      var originalClean = jQuery.clean;
      jQuery.extend({
        // @voir https://github.com/jquery/jquery/blob/1.5/jquery.js#L5493
        'clean' : fonction (éléments, contexte, fragment, scripts) {
          for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
            if ( typeof elem === "string" && rhtml.test( elem ) ) {
              elems[i] = elem = jQuery.htmlPrefilter(elem);
            }
          }
          return originalClean.call(this, elems, context, fragment, scripts);
        }
      });
    }
    autre {
      var originalBuildFragment = jQuery.buildFragment;
      jQuery.extend({
        // @voir https://github.com/jquery/jquery/blob/1.9.0/jquery.js#L6419
        'buildFragment' : fonction (éléments, contexte, scripts, sélection) {
          var l = éléments.longueur;
          pour ( var i = 0; i < l; i++ ) {
            var elem = elems[i];
            if (élément || élément === 0) {
              if ( jQuery.type( elem ) !== "objet" && rhtml.test( elem ) ) {
                elems[i] = elem = jQuery.htmlPrefilter(elem);
              }
            }
          }
          return originalBuildFragment.call(this, elems, context, scripts, selection);
        }
      });
    }
  }

})(jQuery);