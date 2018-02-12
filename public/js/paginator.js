/*---------------分页选中判断开始------------*/
 var curPage = $( "#curP" ).val();
 $( ".pagination a" ).each( function(){
     if ($( this ).text() == curPage ) {
         $( this ).parent().addClass( 'active' )
             .siblings( "li" ).removeClass( "active" );
     }
 } );
/*---------------分页选中判断结束------------*/