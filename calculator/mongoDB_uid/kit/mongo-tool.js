/*
    mongo-tool.js
    [Usage]
    - MongoDB _id Calculator
    [Dependency]
    - /assets/js/tools.js
 */

let dependency_check = {
    tools: typeof(Tools)!=="undefined"
};

/*
Initialize document
 */
let timezoneOffset = Tools.getTimezoneOffset(), configTmzOffset=document.getElementById("_input_config_tmzOffset");
let init_timezone = timezoneOffset;

/*
Start of mongo-tools
 */
let mongoToolConfig = {
    types: ["timestamp", "machineID", "processID", "counter"]
};
mongoToolConfig[mongoToolConfig.types[0]] = {size: 8, data: ""};
mongoToolConfig[mongoToolConfig.types[1]] = {size: 6, data: ""};
mongoToolConfig[mongoToolConfig.types[2]] = {size: 4, data: ""};
mongoToolConfig[mongoToolConfig.types[3]] = {size: 6, data: ""};

let datetimeElements = {
    year: document.getElementById("_input_datetime_year"),
    month: document.getElementById("_input_datetime_month"),
    day: document.getElementById("_input_datetime_day"),
    hour: document.getElementById("_input_datetime_hour"),
    min: document.getElementById("_input_datetime_min"),
    sec: document.getElementById("_input_datetime_sec")
}

let localElementSet = {
    timestamp: document.getElementById("_input_from_value_timestamp"),
    machineID: document.getElementById("_input_from_value_machineID"),
    processID: document.getElementById("_input_from_value_processID"),
    counter: document.getElementById("_input_from_value_counter")
}

class MongoTool{
    dateBasedTimestampTranslator(date, toBeZeroFilled=false){
        return Math.floor(date.getTime() / 1000).toString(16).concat((toBeZeroFilled) ? "0000000000000000" : "");
    }

    idBasedTimestampTranslator(key){
        return new Date(parseInt(key, 16) * 1000);
    }

    updateIDValue(){
        let idInputElement = document.getElementById("_input_from_id"), error = false;
        Object.keys(localElementSet).forEach((key)=>{
            if(!error) {
                let tempValue = localElementSet[key].value, valid = (tempValue.length === mongoToolConfig[key].size);
                mongoToolConfig[key].data = (valid) ? tempValue : "ERROR";
                error = !(valid);
            }
        });
        if(!error){
            let overallValue = "";
            Object.keys(localElementSet).forEach((key)=>{
                overallValue += mongoToolConfig[key].data;
            });
            idInputElement.value = overallValue;
        }
    }

    datetimeUpdater(timestampID){
        if(timestampID.length !== mongoToolConfig.timestamp.size){
            console.error(`datetimeUpdater(): Expected ${mongoToolConfig.timestamp.size} Char string.`);
        }else{
            let localState = this.idBasedTimestampTranslator(timestampID);
            datetimeElements.year.value = localState.getFullYear();
            datetimeElements.month.value = localState.getMonth()+1;
            datetimeElements.day.value = localState.getDate();
            datetimeElements.hour.value = localState.getHours();
            datetimeElements.min.value = localState.getMinutes();
            datetimeElements.sec.value = localState.getSeconds();
        }
    }

    timestampUpdater(){
        let localDatetime = Tools.datetimeTranslator(datetimeElements.year.value, datetimeElements.month.value, datetimeElements.day.value, datetimeElements.hour.value, datetimeElements.min.value, datetimeElements.sec.value);
        let localTimestamp = Toolset.dateBasedTimestampTranslator(localDatetime);
        document.getElementById("_input_from_value_timestamp").value = localTimestamp;
        Toolset.updateIDValue();
    }
    
    changeTmzOffset(){
        timezoneOffset = init_timezone - configTmzOffset.value;
        Toolset.updateTmzOffset();
    }

    updateTmzOffset(){
        document.getElementById("_element_timezone_offset").innerHTML = ((timezoneOffset>0)?"+":"").concat(timezoneOffset);
    }
}

let Toolset = new MongoTool();

document.getElementById("_input_from_id").addEventListener("keyup", ()=>{
    let inputValue = document.getElementById("_input_from_id").value;
    let isMeetCondition = (inputValue.length === 24);
    let details = {
        timestamp: (isMeetCondition) ? inputValue.substring(0, 8) : "00000000",
        machineID: (isMeetCondition) ? inputValue.substring(8, 14) : "000000",
        processID: (isMeetCondition) ? inputValue.substring(14, 18) : "0000",
        counter: (isMeetCondition) ? inputValue.substring(18) : "000000"
    };
    mongoToolConfig.types.forEach((key)=>{
        document.getElementById("_input_from_value_"+key).value = details[key];
    });
    Toolset.datetimeUpdater(details.timestamp);
    console.log(parseInt(details.counter, 16));
});

document.getElementById("_input_from_value_timestamp").addEventListener("keyup", ()=>{
    Toolset.datetimeUpdater(document.getElementById("_input_from_value_timestamp").value);
});

// Add listener to each elements.
["keyup", "change"].forEach((type)=>{
    ["year", "month", "day", "hour", "min", "sec"].forEach((key)=>{
        datetimeElements[key].addEventListener(type, Toolset.timestampUpdater);
    });
    ["timestamp", "machineID", "processID", "counter"].forEach((key)=>{
        document.getElementById("_input_from_value_"+key).addEventListener(type, Toolset.updateIDValue);
    });
    configTmzOffset.addEventListener(type, Toolset.changeTmzOffset);
});

Toolset.updateTmzOffset();