const debounce = (func,delay=1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay);
        // apply: call the function as normally would and take all the args or whatever is inside of that array right here and pass them in as separate args to the original func.
    };
};