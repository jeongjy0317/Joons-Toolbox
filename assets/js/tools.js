class Toolbox{
    getParams(paramName){
        let url = location.href, i;
        let tempParams = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (i = 0; i < tempParams.length; i++) {
            if (tempParams[i].split('=')[0].toUpperCase() === paramName.toUpperCase()) {
                return decodeURIComponent(tempParams[i].split('=')[1]);
            }
        }
    }

    getTimezoneOffset(){
        return -((new Date(Date.now())).getTimezoneOffset()/60);
    }

    datetimeTranslator(year, month, date, hour, min, sec){
        function localDigitHandler(size, inputDigit){
            return inputDigit.length >= size ? inputDigit:new Array(size-inputDigit.length+1).join('0')+inputDigit;
        }
        let localDate = `${localDigitHandler(4, year)}-${localDigitHandler(2, month)}-${localDigitHandler(2, date)}T${localDigitHandler(2, hour)}:${localDigitHandler(2, min)}:${localDigitHandler(2, sec)}`;
        return new Date(localDate);
    }
}

// Pre-define Tools as Variable
const Tools = new Toolbox();