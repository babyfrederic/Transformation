(fonction ($) {

Drupal.behaviors.textarea = {
  attach: fonction (contexte, paramètres) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      fonction startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacité', 0,25) ;
        $(document).mousemove(performDrag).mouseup(endDrag);
        renvoie faux ;
      }

      fonction performDrag(e) {
        textarea.height(Math.max (32, staticOffset + e.pageY) + 'px');
        renvoie faux ;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        zone de texte.css('opacité', 1);
      }
    });
  }
} ;

})(jQuery);