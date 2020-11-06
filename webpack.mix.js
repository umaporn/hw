const mix = require( 'laravel-mix' );

mix.js( 'assets/js/app.js', 'js/app.js' )
   .sass( 'assets/sass/app.scss', 'css/app.css' )
   .version()
   .options( {
	             processCssUrls: false,
             } )
   .setPublicPath( './public/' );