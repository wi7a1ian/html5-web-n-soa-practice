var KO;
(function(KO){
    (function(Services){

        Services.Processor = function(buttonElem, readElem, writeElem){
            var _this = this;
            _this.reader = new KO.Services.Reader(readElem);
            _this.writer = new KO.Services.Writer(writeElem);

            _this.Process = function(){
                _this.writer.Write(_this.reader.Read());
            }

            $(buttonElem).bind('click', _this.Process);

            return { Process: _this.Process };
        }

    })(Services = KO.Services || (KO.Services = {}));
})(KO || (KO = {}));
