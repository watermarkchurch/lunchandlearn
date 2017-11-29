$(function () {
    var api;
    if ($("#entries_list").length) {
        api = $("#entries_list").DataTable({
            "columnDefs": [
                {
                    "targets": [7], // Search Fields
                    "visible": false,
                    "searchable": true
                }
            ],
            "pageLength": 50,
            "lengthChange": false,
        });

        $('a[data-dt-filter]').on('click', function (evt) {
            evt.preventDefault();

            var filter = $(this).data('dt-filter');
            api.search(filter).draw();
            flash($('#searchbar'))
        })
    }

    function flash($element) {
        if ($element.hasClass('flashMe')) {
            $element.removeClass('flashMe');
            setTimeout(flash, 1, $element);
            return
        }
        $element.addClass('flashMe');
    }
})