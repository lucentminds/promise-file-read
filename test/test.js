var read = require( '../promise-file-read' );
var cPath = './test/test.txt';

read( cPath )
.then( function( cContent ){
    console.log( '*** Test1' );
    console.log( cContent );
    console.log( ' ' );
}).done();

read( [ cPath ] )
.then( function( aContent ){
    console.log( '*** Test2' );
    console.log( aContent );
    console.log( ' ' );
}).done();

read( [ cPath, cPath, cPath ] )
.then( function( aContent ){
    console.log( '*** Test3' );
    console.log( aContent );
    console.log( ' ' );
}).done();