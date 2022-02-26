var init = function() {
  var box = document.querySelector('#theArt').children[0],
      showPanelButtons = document.querySelectorAll('#show-buttons input'),
      panelClassName = 'show-front',

      onButtonClick = function( event ){
        box.removeClassName( panelClassName );
        panelClassName = event.target.className;
        box.addClassName( panelClassName );
      };

  for (var i=0, len = showPanelButtons.length; i < len; i++) {
    showPanelButtons[i].addEventListener( 'click', onButtonClick, false);
  }
    
};
  
window.addEventListener( 'DOMContentLoaded', init, false);