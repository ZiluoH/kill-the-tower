import anime from 'animejs'

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

export const shakeEffect = (imgID, magnitude) => {
        const shake = anime({
            targets: `#${imgID}`,
            easing: 'easeInOutSine',
            duration: 400,
            translateX: [
                {
                    value: magnitude * -1,
                },
                {
                    value: magnitude,
                },
                {
                    value: magnitude / -2,
                },
                {
                    value: magnitude / 2,
                },
                {
                    value: 0,
                }
            ],
            translateY: [
                {
                    value: magnitude * 1,
                },
                {
                    value: magnitude * -1,
                },
                {
                    value: magnitude / 2,
                },
                {
                    value: magnitude / -2,
                },
                {
                    value: 0,
                }
            ],
            autoplay: false,
        });
        shake.restart();
    }