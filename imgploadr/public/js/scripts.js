/* global $ */
$(function(){
    'use strict';

    $('#btn-like').on('click', function(event) {
        event.preventDefault();

        var imgId = $(this).data('id');

        $.post('/images/' + imgId + '/like').done(function(data) {
            $('.likes-count').text(data.likes);
        });
    });

    $('#post-comment').hide();
    $('#btn-comment').on('click', function(event) {
        event.preventDefault();

        $('#post-comment').slideDown();
    });
});
