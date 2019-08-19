var overwriteVals = (x, y) => {
    for (var p in y)
        y[p] = typeof x[p] !== 'undefined' ? x[p] : y[p];
}