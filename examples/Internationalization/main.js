// ==========================================================================
// The updating of the view is done by going through the lists of
// keywords for strings and pictures, and replacing the contents
// through the use of a simple jQuery statement.
//
// Note especially that strings and pictures are treated in
// different ways, due to the way they are handled in the container.
//
function update_view() {
    keys = dict['keys'];
    for (idx in keys) {
        key = keys[idx];
        $("#" + key).text(get_string(key));
    };
    pics = dict['pics'];
    for (idx in pics) {
        pic = pics[idx];
        $("#" + pic).attr('src', get_string(pic));
    };
}

// We don't update the view the first time until the document is ready
// loading.
//
$(document).ready(function() {
    update_view();
})
// ==========================================================================
// END OF FILE
// ==========================================================================





