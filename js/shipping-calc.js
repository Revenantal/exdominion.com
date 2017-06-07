
(function ($) {



    $.fn.shippingCalc = function (settings) {

        
        $.fn.shippingCalc.defaults = {
            volumeRate: 200,
            volumeChargeMinimum: 10000000,
            collateralLimit: 1500000000,
            collateralOverChargeRate: 1000000
        };
        var options = $.extend({}, $.fn.shippingCalc.defaults, settings);

        $("form#calculator :input").change(function () {
            $("form#calculator").submit();
        });

        $("form#calculator").submit(function (event) {
            var fields = formToObjects($(this));
            var fieldsHasNull = false;
            var $detailsComplete = $("#details-complete");
            var $detailsIncomplete = $("#details-incomplete");

            // Should probably find a better way to do this...
            $.each(fields, function (i, val) {
                if (val == "") {
                    fieldsHasNull = true;
                }
            });


            if (fieldsHasNull) { // All fields not populated
                $detailsComplete.fadeOut(500);
                $detailsIncomplete.fadeIn(500);

            } else {  // All fields populated
                $detailsIncomplete.fadeOut(500);
                $detailsComplete.fadeIn(500);

                var volume = parseFloat(fields['volume'].replace(/,/g, ""));
                var collateral = parseFloat(fields['collateral'].replace(/,/g, ""));

                var contract = new Contract(fields['pickup'], fields['dropoff'], volume, collateral);

                $('#contract-totalCharge').html(numberWithCommas(contract.totalCharge));

                $('#contract-volume').html(numberWithCommas(contract.volume));
                $('#contract-volumeCharge').html(numberWithCommas(contract.volumeCharge));

                if (contract.collateralOverAmount > 0) {
                    $('#contract-collateralOverAmount').html(numberWithCommas(contract.collateralOverAmount));
                    $('#contract-collateralOverCharge').html(numberWithCommas(contract.collateralOverCharge));
                }
            }

            event.preventDefault();
        });


        function Contract(pickup, dropoff, volume, collateral) {
            this.pickup = pickup;
            this.dropoff = dropoff;
            this.volume = volume;
            this.collateral = collateral;
            Object.defineProperty(this, 'volumeCharge', {
                get: function () {
                    var volumeCharge = options.volumeChargeMinimum;
                    if ((this.volume * options.volumeRate) > options.volumeChargeMinimum ) {
                        amount = this.volume * options.volumeRate;
                    }
                    return volumeCharge;
                }
            });
            Object.defineProperty(this, 'collateralOverAmount', {
                get: function () {
                    var collateralOverAmount = 0;
                    if (this.collateral > options.collateralLimit) {
                        collateralOverAmount = this.collateral - options.collateralLimit;
                    }
                    return collateralOverAmount;
                }
            });
            Object.defineProperty(this, 'collateralOverCharge', {
                get: function () {
                    var collateralOverCharge = 0;
                    collateralOverCharge = Math.ceil(this.collateralOverAmount / options.collateralOverChargeRate) * options.collateralOverChargeRate;
                    // Fix this. It's broken.
                    return collateralOverCharge;
                }
            });
            Object.defineProperty(this, 'totalCharge', {
                get: function () {
                    return this.volumeCharge + this.collateralOverCharge;
                }
            });
        }
    };

    function formToObjects(form) {
        var dataArray = $(form).serializeArray(), fields = {};
        $(dataArray).each(function (i, field) {
            fields[field.name] = field.value;
        });

        return fields;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 


}(jQuery));
