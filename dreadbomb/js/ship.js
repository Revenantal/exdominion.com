function Ship(shipImage, shipBaseWidth, shipBaseHeight, shipMinScale, shipMaxScale) {
    this.shipImage = shipImage;
    this.shipBaseWidth = shipBaseWidth;
    this.shipBaseHeight = shipBaseHeight;
    this.shipMinScale = shipMinScale;
    this.shipMaxScale = shipMaxScale;
    this.centerX = shipBaseWidth / 2;
    this.centerY = shipBaseHeight / 2;
    this.UUID = generateUUID();

}


Ship.prototype.SpawnRandom = function () {
    if (this.Exists()) {
        this.Remove();
    }
    console.log("1");

    var yPos = ranIntInRange(this.shipBaseHeight, $(window).height() - this.shipBaseHeight);
    var xPos = ranIntInRange(this.shipBaseWidth, $(window).width() - this.shipBaseWidth);

    ship = sprintf("<div class='ship' ship-uuid='%1$s'></ship>", this.UUID);
    $ship = $($.parseHTML(ship));

    $ship.css({
        'background-image': 'url(' + this.shipImage + ')',
        'top': yPos + 'px',
        'left': xPos + 'px'
    });

    return $ship;
};

Ship.prototype.Spawn = function (centerX, centerY) {
    if (this.Exists()) {
        this.Remove();
    }
    console.log("2");
     $ship = sprintf("<div class='ship' ship-uuid='%1$s'></ship>", this.UUID);

     return $ship;
};

Ship.prototype.Exists = function () {
    if ($(".ship[ship-uuid='" + this.UUID + "']").length) {
        return true;
    }
    return false;
}

Ship.prototype.Remove = function () {
    if (this.Exists()) {
        $(".ship[ship-uuid='" + this.UUID + "']").remove();
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function ranFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function ranIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}