document.addEventListener("DOMContentLoaded", function () {

    /**
     * Создание экземпляра Height_trim.
     *
     * @constructor
     * @param {string} class_name - id картинки.
     */

    function Height_trim(class_name) { //version 0.9

        this.class = class_name;
        this.blocks = document.getElementsByClassName(this.class);
        this.len = Object.keys(this.blocks).length;
        this.clip = this.len;
        this.limits = 0;
        if (this.len === 0) {
            console.error('height_trim error: elements ' + this.class + ' not found');
            return false;
        }

        this.limit = function (lim) {
            this.limits = lim;
            if (lim > window.innerWidth) {
                this.len = 0;
            }
        };


        /**
         * Обрезка высоты
         * 
         * @param {number} step - число блоков для сравнения
         */

        this.cut = function (step) {

            if (step === undefined) {
                step = this.len;
            }
            var go = 0;
            var stop = step;
            var max = 0;
            while (stop <= this.len) {
                max = this.get_max(go, stop);
                this.set_css(go, stop, max);
                go += step;
                stop += step;
                this.clip -= step;
                if (this.clip < step) {
                    max = this.get_max(go, this.len);
                    this.set_css(go, this.len, max);
                }
            }
        };

        this.get_max = function (start, end) {
            var m = 0;
            var element_h = {};
            for (var i = start; i < end; i++) {
                element_h = this.blocks[i].offsetHeight;
                if (m < element_h) {
                    m = element_h;
                }
            }

            return m;
        };

        this.set_css = function (start, end, max_h) {

            for (var i = start; i < end; i++) {
                this.blocks[i].style.height = max_h + 'px';
            }
        };
    }

    var h = new Height_trim('col-lg-4');
    h.limit(1200);
    h.cut(3);

    window.onresize = function (event, step) {
        var h = new Height_trim('col-lg-4');
        h.limit(1200);
        h.cut(3);
    };
});
