export const toCanvasX = (c, e) => {
    var posX = 0;

    if (e.pageX) {
        posX = e.pageX;
    } else if (e.clientX) {
        posX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
    }
    posX = posX - c.offsetLeft;
    return posX;
}

export const toCanvasY = (c, e) => {
    var posY = 0;

    if (e.pageY) {
        posY = e.pageY;
    } else if (e.clientY) {
        posY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    posY = posY - c.offsetTop;

    return posY;
}