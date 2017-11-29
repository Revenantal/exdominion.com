function Ship(shipImage, shipBaseWidth, shipBaseHeight, shipMinScale, shipMaxScale) {
    this.shipImage = shipImage;
    this.shipBaseWidth = shipBaseWidth;
    this.shipBaseHeight = shipBaseHeight;
    this.shipMinScale = shipMinScale;
    this.shipMaxScale = shipMaxScale;
    this.centerX = shipBaseWidth / 2;
    this.centerY = shipBaseHeight / 2;
    this.UUID = generateUUID();
    this.layerID = "#space";
    this.$ship = null;

}

/** @description Generates a jquery object of the ship ready to be applied to a div.  
 * @param {number} [centerX=random] The centre of the ships X coordinate.
 * @param {number} [centerY=random] The centre of the ships Y coordinate.
 */
Ship.prototype.Spawn = function (centerX, centerY) {
    if (this.$ship != null) {
        this.Remove();
    }

    ship = sprintf("<div class='ship' ship-uuid='%1$s'></ship>", this.UUID);
    this.$ship = $($.parseHTML(ship));

    if (centerX == undefined && centerY == undefined) {
        var yPos = ranIntInRange(0, $(this.layerID).height());
        var xPos = ranIntInRange(0, $(this.layerID).width());

        this.$ship.css({
            'background-image': 'url(' + this.shipImage + ')',
            'left': xPos - this.centerX + 'px',
            'top': yPos - this.centerY + 'px'
        });
    } else {
        this.$ship.css({
            'background-image': 'url(' + this.shipImage + ')',
            'left': centerX - this.centerX + 'px',
             'top': centerY - this.centerY + 'px'
        });
    }

    this.$ship.appendTo(this.layerID);
    
};

/**
 * @param {number} toX - The destination X coordinate.
 * @param {number} toY - The destination Y coordinate.
 * @param {number} [degrees=0] - The Orientation (clockwise) the ship will aim.
 * @param {number} [length=1000] - How long it will take to complete the motion
 */
Ship.prototype.MoveTo = function (toX, toY, degrees = 0, length = 1000) {
    var r = $.Deferred();
    
    this.$ship.css({
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        'transform': 'rotate(' + degrees + 'deg)'
    });

    this.$ship.animate({
        left: toX - this.centerX,
        top: toY - this.centerY
    }, length, function () { });

    setTimeout(function () {
        r.resolve();
    }, length);

    return r;
};
 
/**
 * Removes the ship object from page
 */
Ship.prototype.Remove = function () {
    if (this.$ship != null) {
       this.$ship.remove();
    }
}

/**
 * Generates a UUID
 * @returns {string} A UUID
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * 
 * @param min
 * @param max
 * @returns
 */
function ranFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 
 * @param min
 * @param max
 * @returns
 */
function ranIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}