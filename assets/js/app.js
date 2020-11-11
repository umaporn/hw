/** @namespace window */
/**
 * jQuery framework
 * @type {jQuery}
 */
window.$ = window.jQuery = require( 'jquery' );

require( 'paginationjs/src/pagination' );
let moment = require('moment');

$( document ).ready( function(){

	$.getJSON( 'list.json', function( data ){
		pagination( data );
	} );

} );

function pagination( data ){
	$( '#pagination-container' ).pagination( {
		                                         dataSource: data,
		                                         pageSize:   8,
		                                         className:  'paginationjs-theme-red',
		                                         position:   'top',
		                                         callback:   function( data, pagination ){
			                                         var html = simpleTemplating( data );
			                                         var nav  = simpleNavigation( data, pagination );
			                                         $( '#data-container' ).html( html );
			                                         $( '#nav-container' ).html( nav );
		                                         },
	                                         } );
}

function simpleTemplating( data ){
	var html = '';
	$.each( data, function( index, item ){
		if( index % 4 === 0 ){
			html += '<div class="row">';
		}
		html += '<div class="col-sm-3"><div class="card p-2 m-2">' +
		        '<img src="' + item.image_url + '" class="card-img-top">' +
		        '<div class="card-body">' +
		        '<div class="card-text">' + item.title + '</div>' +
		        '<div class="card-text">' + moment( moment(item.created_at ).toDate() ).fromNow() + '</div>';
		var i = 1;
		while( i <= item.vote ){
			html += '<i class="fa fa-star red"></i>';
			i++;
		}
		html += '<p>&#3647; ' + item.price + '</p></div>' +
		        '</div></div>';
		if( index % 4 === 3 ){
			html += '</div>';
		}
	} );
	html += '</div>';
	return html;
}

function simpleNavigation( data, pagination ){
	return 'items ' + data[0].id + ' - ' + data[data.length - 1].id + ' of ' + pagination.totalNumber;
}
