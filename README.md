# promise-file-read
Asynchronously read files with promise flow control.


## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-read.git
```

### Useage:

```js
var read = require( 'promise-file-read' );

read( '/path/to/file.txt', 'utf-8' )
.then(function( cContent ){

    console.log( cContent );

});
```

## Examples

Read one file.

```js
read( '/path/to/file.txt' )
.then(function( cContent ){

    console.log( cContent );

});
```

Read multiple files.

```js
read( ['/path/to/file1.txt', '/path/to/file2.txt'] )
.then(function( aContent ){

    console.log( aContent );

});
```