(function ($) {
    jQuery.fn.saiSelect = function (options) {
        var firstClick = [];
        var selects = $(".saiselect");

        for (i = 0; i < selects.length; i++) {
            var select = $(selects[i]);
            firstClick[i] = true;
            var inputSelect = select.prev();
            select.wrap("<div class='select_wrapper select_" + (i + 1) + " required valid_select'></div>");
            select.before(inputSelect);
            inputSelect.addClass("select").wrap("<div class='input_wrapper'></div>");
            inputSelect.attr("type", "hidden");
            if (inputSelect.attr("placeholder") != undefined) {
                inputSelect.after("<p class='layer'>" + inputSelect.attr("placeholder") + "</p>");
            } else {
                inputSelect.after("<p class='layer'></p>");
            }
            inputSelect.next().data("index", i);
        }

        $(".input_wrapper .layer").bind("click", function (e) {
            var ind = $(this).data("index");
            var thisSelect = $(this).parent().next(".saiselect");
            var ths = $(this);

            if (thisSelect.css('display') != 'block') {
                thisSelect.fadeIn();
                ths.addClass("active");
                firstClick[ind] = true;
                $(document).bind('click.select' + ind + '', function () {
                    if (!firstClick[ind]) {
                        thisSelect.fadeOut();
                        ths.removeClass("active");
                        $(document).unbind('click.select' + ind + '');
                    }
                    firstClick[ind] = false;
                });
            }
            e.preventDefault();
        });

        selects.find("li").bind("click", function () {
            selects.fadeOut();
            $(this).parent().parent().find(".layer").removeClass("active");
            $(this).parent().prev().find("input").val($(this).text());
            $(this).parent().prev().find("p").text($(this).text());
            for (i = 0; i < firstClick.length; i++) {
                $(document).unbind('click.select' + i + '');
                firstClick[i] = false;
            }
        });
    };
})(jQuery);