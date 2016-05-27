/*******************************************************************************
 *
 *
 ******************************************************************************/

/*
 * An array of items with additional add() and remove() methods.
 */
topomap.NodeList = function () {

  this.add = function( item ) {
    this.push( item );
  };

  this.remove = function( item ) {
    var index;
    while( ( index = this.indexOf( item ) ) !== -1 ) {
      this.splice( index, 1 );
    }
  };

};

topomap.NodeList.prototype = Array.prototype;
