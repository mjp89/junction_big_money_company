$(function() {

    var $this = $('body');
    var offset = $this.offset();
    var width = $this.width();
    var height = $this.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const showMarker = (x, y, price) => {
        console.log("x: " + x);
        console.log("y: " + y);
        console.log("draw marker");
        const ball = "<div class='ball' style='top:" + y + "px;left:" + x + "px;'></div>";
        const infoBox = "<div class='ball-info-box' style='top:" + (y-30) + "px;left:" + (x+15) + "px;'><p>" + price + "€</p></div>";
        $('body').append(ball, infoBox);
    }

    const hideMarker = () => {
        $('.ball').hide('slow', function(){$('.ball').remove();});
        $('.ball-info-box').hide('scale', function(){$('.ball-info-box').remove()}) 
    }

    async function mainloop() {
        const markerpoints = generateRandomPoints(50);
        for (const point of markerpoints) {
            showMarker(point.x, point.y, point.price);
            await sleep(1000);
            hideMarker();
            await sleep(1000);
        }
    }

    $('button').click(function() {
        setTimeout(() => {
            mainloop(); 
        }, 700);
    });


    const generateRandomPoints = (number_of_points) => {
        var $this = $('body');
        var offset = $this.offset();
        var width = $this.width();
        var height = $this.height();

        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

        const markerpoints = [
            {x: 800, y: 300, price: 50},
            {x: 630, y: 470, price: 51},
            {x: 640, y: 420, price: 52},
            {x: 645, y: 450, price: 53},
            {x: 800, y: 320, price: 54},
            {x: 732, y: 320, price: 54},
            {x: 810, y: 380, price: 54},
            {x: 760, y: 350, price: 54},
            {x: 710, y: 390, price: 54},
            {x: 800, y: 300, price: 53},
            {x: 620, y: 315, price: 54},
            {x: 732, y: 350, price: 54}
        ]
        return markerpoints; 
    }
}); 