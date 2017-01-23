/**
 * 01-23-2017
 * Asynchronously read files with promise flow control.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var Q = require( 'q' );
var fs = require( 'fs' );
var resolve = require( 'promise-resolve-path' );

var readFile = module.exports = function( aSrc, cContentType ){ // jshint ignore:line
    var deferred = Q.defer();
    var cSrcType = typeof aSrc;

    // Determines the content type of the files we are loading.
    cContentType = cContentType || 'utf-8';

    switch( true ) {
    case ( cSrcType === 'string' ):
        aSrc = [aSrc];
        break;

    case Array.isArray( aSrc ):
        break;

    default:
        deferred.reject( 'Invalid source path argument: '.concat( aSrc ) );
        return deferred.promise;

    }// /switch()
    
    resolve( aSrc, true )
    .then(function( aPaths ){
        var i, l = aPaths.length;
        var aPromises = [];

        // Loop over each file path and read it's file.
        for( i = 0; i < l; i++ ) {
            aPromises.push( readOneFile( aPaths[ i ], cContentType ) );
        }// /for()
        
        // Either wait for all paths to be read or reject one.
        return Q.all( aPromises );
    })
    .then(function( aContent ){
        if( cSrcType === 'string' )  {
            deferred.resolve( aContent[0] );
        }
        else {
            deferred.resolve( aContent );
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /readFile()


var readOneFile = function( cPath, cContentType ) {
    var deferred = Q.defer();

    fs.readFile( cPath, cContentType, function ( err, cContent ) {
        if ( err ) {
            return deferred.reject( err );
        }

        
        deferred.resolve( cContent );
    });

    return deferred.promise;

};// /readOneFile()