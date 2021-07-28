/**
 * 01-23-2017
 * Asynchronously read files with promise flow control.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

const fs = require( 'fs' );
const path_resolve = require( 'promise-resolve-path' );

const read_file = async function( aSrc, cContentType ){ // jshint ignore:line
    return new Promise(function( resolve, reject ){
        var cSrcType = typeof aSrc;

        // Determines the content type of the files we are loading.
        switch( true ) {
        case cContentType === 'buffer':
            cContentType = null;
            break;

        case !cContentType:
            cContentType = 'utf-8';
            break;

        default:
            // Don't change anything.

        }// /switch()

        switch( true ) {
        case ( cSrcType === 'string' ):
            aSrc = [aSrc];
            break;

        case Array.isArray( aSrc ):
            break;

        default:
            return reject( 'Invalid source path argument: '.concat( aSrc ) );
        }// /switch()
        
        path_resolve( aSrc, true )
        .then(function( aPaths ){
            var i, l = aPaths.length;
            var aPromises = [];

            // Loop over each file path and read it's file.
            for( i = 0; i < l; i++ ) {
                aPromises.push( readOneFile( aPaths[ i ], cContentType ) );
            }// /for()
            
            // Either wait for all paths to be read or reject one.
            return Promise.all( aPromises );
        })
        .then(function( aContent ){
            if( cSrcType === 'string' )  {
                resolve( aContent[0] );
            }
            else {
                resolve( aContent );
            }
        })
        .catch(function( err ){
            reject( err );
        });

    });
};// /readFile()


var readOneFile = function( cPath, cContentType ) {
    return new Promise(function( resolve, reject ){
        fs.readFile( cPath, cContentType, function ( err, cContent ) {
            if ( err ) {
                return reject( err );
            }
            
            resolve( cContent );
        });
    });
};// /readOneFile()

module.exports = read_file;
