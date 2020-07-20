export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const displayTime = (time) => {
    return time.hours + ' hours and ' + time.minute + ' minutes';
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}


//called with every property and its value
// function process(key,value) {
//     console.log(key + " : "+value + '[ RESULT ]');
// }

// function traverse(o,func) { console.log("[call]"+ o + "--------------------------");
    // for (var i in o) { console.log('[ FOR ]'  + i);
    //     func.apply(this,[i,o[i]]);  
    //     console.log('[ APPLY ]' + o[i] +"-"+ (o[i] !== null && typeof(o[i])=="object"));
    //     if (o[i] !== null && typeof(o[i])=="object") {
    //         //going one step down in the object tree!!
    //         console.log('[ TRAVERS ]');
    //         traverse(o[i],func);
    //         console.log('[ TRAVERS END 1]');


    //     }
    //      console.log('[ TRAVERS END]');
    // }
// }

// //that's all... no magic, no bloated framework
// traverse(o,process);
