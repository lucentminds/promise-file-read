var read = require( '../promise-file-read' );

read( './test/test.txt' )
.then( function( cContent ){
    console.log( cContent );
}).done();