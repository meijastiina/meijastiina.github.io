$( ".toggle" ).click(function() {
    $(this).next('div.togglable-content').toggle();
});