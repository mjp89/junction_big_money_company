$(function () {
    var crowdWanted = 0;
    var cpm = 0;

    $("#crowdSlider").change(function (asd) {
        crowdWanted = Number.parseFloat($(this).val());
        calculateEstimate();
    });


    $("#cpm").change(function () {
        cpm = Number.parseFloat($(this).val());
        calculateEstimate();
    });

    var agePercentage = 0;
    $(".age_group").click(function () {
        agePercentage = 1;
        $('.age_group').each(function (i, obj) {
            if ($(obj).is(':checked')) {
                agePercentage -= 0.05;
            } 
        });
        calculateEstimate();
    });

    function calculateEstimate() {
        if (cpm <= 0) {
            return;
        }
        if (crowdWanted <= 0) {
            return;
        } 
        if (agePercentage <= 0) {
            return;
        }
        var cpmEffect = cpm > 1 ? 1 : cpm;

        crowdWanted = Math.round(crowdWanted * cpmEffect);
        crowdWanted = Math.round(crowdWanted * agePercentage);
        $("#estimate").text(crowdWanted);
    }

});