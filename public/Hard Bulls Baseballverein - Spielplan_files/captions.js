function doAdjustCaptionContainer(image) {
    var captionContainer = getNextSibling(image, ".cd-image-caption-container");
    if (captionContainer == null) {
        return;
    }
    setTimeout(function () {
        if (image.naturalHeight / image.naturalWidth > image.height / image.width) {
            var dw = (image.width - image.height * image.naturalWidth / image.naturalHeight) / 2;
            captionContainer.style.cssText = 'left: ' + dw + 'px; right: ' + dw + 'px;';
        }
        if (image.naturalHeight / image.naturalWidth < image.height / image.width) {
            var dh = (image.height - image.width * image.naturalHeight / image.naturalWidth) / 2;
            captionContainer.style.cssText = 'top: ' + dh + 'px; bottom: ' + dh + 'px;';
        }
    }, 100)

}

var getNextSibling = function (elem, selector) {
    var sibling = elem.nextElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) {
            return sibling;
        }
        sibling = sibling.nextElementSibling
    }
}

function adjustCaptionContainer() {
    document.querySelectorAll('.cd-image-contain').forEach(function (image) {
            if (image.width > 0) {
                doAdjustCaptionContainer(image);
            } else {
                image.addEventListener('load',
                    function (e) {
                        doAdjustCaptionContainer(image);
                    });
            }
        }
    )
}