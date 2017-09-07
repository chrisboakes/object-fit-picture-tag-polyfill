/**
 * Cross browser CSS object-fit support for picture tags and img tags
 * DOM element must have either data-object-fit-cover or data-object-fit-contain assigned to the tag
 * Replaces tag with two divs - a parent with relative positioning and a child with a background image
 * @author Chris Boakes
 * @param options Object
 * @param options - fitPosition String (default 'center center')
 * @param options - addContainer Boolean - do we want a 'relative' wrapper?
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
            fitPosition: 'center center',
            addContainer: true
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
            let backgroundElement = this.createBackground(src, tagClasses, tagId, fitSize);

            // If we want a wrapping div
            if (this.options.addContainer) {
                // Create a new div to wrap our child div
                let wrapperElement = this.createBackgroundContainer(tagClasses, tagId);

                // Add child div to wrapper
                wrapperElement.appendChild(backgroundElement);
                // Replace <picture> tag with div
                pictureTag.parentNode.replaceChild(wrapperElement, pictureTag);
            // If we don't have a wrapping div
            } else {
                // Replace <picture> tag with div
                pictureTag.parentNode.replaceChild(backgroundElement, pictureTag);
            }
        }
    }

    /**
     * Creates a new wrapper div for our background-image container
     * @param tagClasses String
     * @param tagId String
     * @return DOM element
     */
    createBackgroundContainer(tagClasses, tagId) {
        // Create a new div to wrap our child div
        let wrapperElement = document.createElement('div');

        // Add IDs and classes from the original picture tag to the new element
        wrapperElement = this.setClassesAndIds(wrapperElement, tagClasses, tagId);
        wrapperElement.style.position = 'relative';

        return wrapperElement;
    }

    /**
     * Our background-image container
     * @param src String
     * @param tagClasses String
     * @param tagId String
     * @param fitSize String
     * @return DOM element
     */
    createBackground(src, tagClasses, tagId, fitSize) {
        let backgroundElement = document.createElement('div');

        backgroundElement.style.backgroundImage = `url(${src})`;
        backgroundElement = this.setBackgroundElementStyles(backgroundElement, fitSize);

        if (!this.options.addContainer) {
            backgroundElement = this.setClassesAndIds(backgroundElement, tagClasses, tagId);
        }

        return backgroundElement;
    }

    /**
     * Append DOM element with Id and classes (if on original element)
     * @param el DOM element
     * @param tagClasses String
     * @param tagId String
     * @return DOM element
     */
    setClassesAndIds(el, tagClasses, tagId) {
        if (tagClasses) {
            el.setAttribute('class', tagClasses);
        }

        if (tagId) {
            el.setAttribute('id', tagId);
        }

        return el;
    }

    /**
     * Child element styles
     * @param el DOM Element
     */
    setBackgroundElementStyles(el, fitSize) {
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
     * @param item String
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
