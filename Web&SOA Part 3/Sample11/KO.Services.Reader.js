var KO;
(function(KO){
    (function(Services){
        Services.Reader = function(selector){
            var _this = this;
            _this.readSelector = selector;

            _this.Read = function(){
                return $(_this.readSelector).val();
            }

            return {Read: _this.Read}
        }

    })(Services = KO.Services || (KO.Services = {}));
})(KO || (KO = {}));
