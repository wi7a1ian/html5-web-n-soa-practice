var KO;
(function(KO){
    (function(Services){

        Services.Writer = function(selector){
            var _this = this;
            _this.writeSelector = selector;

            _this.Write = function(text) {
                $("<p>" + text + "</p>").appendTo(_this.writeSelector);
            }

            return {Write: _this.Write};
        }

    })(Services = KO.Services || (KO.Services = {}));
})(KO || (KO = {}));
