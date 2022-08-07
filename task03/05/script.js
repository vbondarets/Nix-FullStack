function substrCount(input, needle, offset, length) {
    if (!needle || !input || length < 1 || offset > input.length - needle.length || length > input.length - offset) {
        return -1;
    }
    let count = 0;

    for (let i = offset; i < length + offset - 1; i++) {
        if(input.slice(i, needle.length + i) == needle) {
            count++;
        }
    }
    return count;
}