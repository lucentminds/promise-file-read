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
var readFile = module.exports = function( cFilePath, cContentType ){ // jshint ignore:line
    var deferred = Q.defer();

    cContentType = cContentType || 'utf-8';

    fs.readFile( cFilePath, cContentType, function ( err, cContent ) {
        if ( err ) {
            return deferred.reject( err );
        }
        
        deferred.resolve( cContent );
    });

    return deferred.promise;
};// /readFile()