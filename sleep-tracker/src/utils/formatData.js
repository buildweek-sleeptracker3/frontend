

export const formatData = rawData => {
    if (!rawData) {return null} //if the data isn't here yet then don't bother

    const format = { //start with just format of what we want
        "0 - 5": [],
        "5 - 5.5": [],
        "5.5 - 6": [],
        "6 - 6.5": [],
        "6.5 - 7": [],
        "7 - 7.5": [],
        "7.5 - 8": [],
        "8 - 8.5": [],
        "8.5 - 9": [],
        "9 - 9.5": [],
        "9.5 - 10": [],
        "10 - 10.5": [],
        "10.5 - 11": [],
        "11+": [],
    }


    const rawDataKeys= Object.keys(rawData) //iterate through and add mood rating to an array per category/bin so that it can be averaged next 

    rawDataKeys.map(key => { 
        let currHours = rawData[key].hours
        let mood = rawData[key].mood
        if (currHours < 5) {
            format["0 - 5"].push(mood)
        } else if (currHours < 5.5) {
            format ["5 - 5.5"].push(mood)
        } else if (currHours < 6) {/////////
            format ["5.5 - 6"].push(mood)
        } else if (currHours < 6.5) {
            format ["6 - 6.5"].push(mood)
        } else if (currHours < 7) {
            format ["6.5 - 7"].push(mood)
        } else if (currHours < 7.5) {
            format ["7 - 7.5"].push(mood)
        } else if (currHours < 8) {
            format ["7.5 - 8"].push(mood)
        } else if (currHours < 8.5) {
            format ["8 - 8.5"].push(mood)
        } else if (currHours < 9) {
            format ["8.5 - 9"].push(mood)
        } else if (currHours < 9.5) {
            format ["9 - 9.5"].push(mood)
        } else if (currHours < 10) {
            format ["9.5 - 10"].push(mood)
        } else if (currHours < 10.5) {
            format ["10 - 10.5"].push(mood)
        } else if (currHours < 11) {
            format ["10.5 - 11"].push(mood)
        } else {
            format ["11+"].push(mood)
        } 
        
    })

    //now, find the average for each of format's keys

    const formatKeys = Object.keys(format)

    formatKeys.map(key => {
        if (format[key].length != 0) {
            format[key] = format[key].reduce((a, b) => a + b, 0 / format[key].length)
        } else {
            format[key] = 0
        }
        
    })

    const binnedData = Object.keys(format).map(key => {
        return {
            id: key,
            bin: key,
            count: format[key]
        }
    })

    console.log(format)

    return {binned: binnedData, formatted: format} //this is now formatted and ready to go!

}