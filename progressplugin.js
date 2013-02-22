(function ($) {
    var defaults = {
        message: "Loading data ...",
        prependMode: false,
        appendMode: false
    };
    var settings = {};

    var methods = {
        show: function () {
            return this.each(function () {
                var $this = $(this), data = $this.data('progressplugin');
                // If the plugin hasn't been initialized yet
                if (!data) {
                    //Do more setup stuff here
                    $this.data('progressplugin', {
                        initialized: true,
                        settings: settings
                    });
                    data = $this.data('progressplugin');
                    data.parentPosition = $this.css('position');
                    var arrHTML = [];
                    arrHTML.push('<div class="progresspluginmask">');
                    arrHTML.push('</div>');
                    arrHTML.push('<div class="progressplugininfo"><div class="progresspluginmessage">' + settings.message + '</div><div class="loadingimage"></div></div>');
                    $this.append(arrHTML.join(''));
                    $this.data('progressplugin', data);
                }
                var plugininfowidth = $this.children('.progressplugininfo:first').innerWidth();
                var plugininfoheight = $this.children('.progressplugininfo:first').innerHeight();

                $this.css({ position: "relative" });
                var leftcoord = $this.innerWidth() - $this.children('.progressplugininfo:first').width();
                var topcoord = $this.innerHeight() - $this.children('.progressplugininfo:first').height();
                if (leftcoord < 0) {
                    $this.css('min-width', plugininfowidth + 'px');
                }

                if (topcoord < 0) {
                    $this.css('min-height', plugininfoheight + 'px');
                }
                var leftcoord = $this.innerWidth() - $this.children('.progressplugininfo:first').width();
                var topcoord = $this.innerHeight() - $this.children('.progressplugininfo:first').height();

                $this.children('.progressplugininfo:first').css({ top: topcoord / 2 + 'px', left: leftcoord / 2 + 'px' });
                $this.children('.progressplugininfo:first').css({ top: topcoord / 2 + 'px', left: leftcoord / 2 + 'px' });

                $this.children('.progresspluginmask:first').width($this.innerWidth());
                $this.children('.progresspluginmask:first').height($this.innerHeight());

                $(window).bind('resize.progressplugin', function () {

                    $this.children('.progresspluginmask:first').width($this.innerWidth());
                    $this.children('.progresspluginmask:first').height($this.innerHeight());
                    var leftcoord = $this.innerWidth() - $this.children('.progressplugininfo:first').width();
                    var topcoord = $this.innerHeight() - $this.children('.progressplugininfo:first').height();
                    $this.children('.progressplugininfo:first').css({ top: topcoord / 2 + 'px', left: leftcoord / 2 + 'px' });

                });

                //test for settings and data
                //console.log(settings);
                //console.log(data.initialized);
            });
        },
        hide: function () {
            return this.each(function () {
                var $this = $(this), data = $this.data('progressplugin');
                // If the plugin hasn't been initialized yet
                if (!data) {
                    return $this;
                }

                $this.css('position', data.parentPosition);
                $this.children('.progresspluginmask:first').remove();
                $this.children('.progressplugininfo:first').remove();
                $this.removeData('progressplugin');
            });
        }
    }
    $.fn.progressplugin = function (method, options) {
        settings = $.extend({}, defaults, options);
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.progressplugin');
        }
    };
})(jQuery);