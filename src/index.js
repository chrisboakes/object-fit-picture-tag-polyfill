/**
 * Cross browser CSS object-fit support for picture tags and img tags
 * DOM element must have either data-object-fit-cover or data-object-fit-contain assigned to the tag
 * Replaces tag with two divs - a parent with relative positioning and a child with a background image
 * @version 0.0.1
 * @author Chris Boakes
 * @param options Object
 * @param options - fitPosition String (default 'center center')
 */
export default class {
    constructor(options) {
        // If we don't have object-fit support
        if (!this.supportsObjectFit()) {
            this.combineOptions(options);
            // By default returns a nodeList - the below ensures it's an array
            let objectFitCovers = [].slice.call(document.querySelectorAll('[data-object-fit-cover]'));

            let objectFitContains = [].slice.call(document.querySelectorAll('[data-object-fit-contain]'));

            if (objectFitCovers.length > 0) {
                objectFitCovers.forEach((item) => {
                    this.createReplacementTag(item, 'cover');
                });
            }

            if (objectFitContains.length > 0) {
                objectFitContains.forEach((item) => {
                    this.createReplacementTag(item, 'contain');
                });
            }
        }
    }

    /**
     * Combine default parameters with user options
     * @param options Object
     */
    combineOptions(options) {
        let defaults = {
            fitPosition: 'center center'
        };

        this.options = {
            ...defaults,
            ...options
        };
    }

    /**
     * Loop through array of picture tags and do our fix
     * @param pictureTag String
     */
    createReplacementTag(pictureTag, fitSize) {
        let src = this.getSrc(pictureTag);

        let tagClasses = pictureTag.getAttribute('class');

        let tagId = pictureTag.getAttribute('id');

        // If we have retreived the src attribute
        if (src) {
            // Create a new div to wrap our child div
            let wrapperElement = document.createElement('div');

            // Add IDs and classes from the original picture tag to the new element
            tagClasses ? wrapperElement.setAttribute('class', tagClasses) : tagClasses = false;
            tagId ? wrapperElement.setAttribute('id', tagId) : tagId = false;
            wrapperElement.style.position = 'relative';

            let childElement = document.createElement('div');

            childElement.style.backgroundImage = `url(${src})`;
            childElement = this.setChildElementStyles(childElement, fitSize);
            // Add child div to wrapper
            wrapperElement.appendChild(childElement);
            // Replace <picture> tag with div
            pictureTag.parentNode.replaceChild(wrapperElement, pictureTag);
        }
    }

    /**
     * Child element styles
     * @param el DOM Element
     */
    setChildElementStyles(el, fitSize) {
        el.style.backgroundSize = fitSize;
        el.style.backgroundPosition = this.options.fitPosition;
        el.style.backgroundRepeat = 'no-repeat';
        el.style.height = '100%';
        el.style.width = '100%';
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.left = '0';
        return el;
    }

    /**
     * Get src from <img> tag
     * @return String
     */
    getSrc(item) {
        let imgTagInsidePicture = item.querySelector('img');

        // <picture> tag
        if (imgTagInsidePicture && imgTagInsidePicture !== 'undefined' && imgTagInsidePicture !== null) {
            return imgTagInsidePicture.src;
        // <img> tag
        } else if (item.src !== 'undefined' && item.src !== null) {
            this.options.aspectRatio = item.height / item.width * 100;
            return item.src;
        }
        return false;
    }

    /**
     * Detect whether we support object fit
     * @return Boolean
     */
    supportsObjectFit() {
        let testImg = typeof Image === 'undefined' ? {style: {'object-position': 1}} : new Image();
        let supportsFit = 'object-fit' in testImg.style;

        return supportsFit;
    }
}
