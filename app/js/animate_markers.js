$(function() {

    var $this = $('body');
    var offset = $this.offset();
    var width = $this.width();
    var height = $this.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    /*const markerpoints = [
        {x: 35, y: 35, price: 50},
        {x: 300, y: 500, price: 51},
        {x: 100, y: 200, price: 52},
        {x: 120, y: 800, price: 53},
        {x: 500, y: 50, price: 54}
    ]*/

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const showMarker = (x, y, price) => {
        console.log("x: " + x);
        console.log("y: " + y);
        console.log("draw marker");
        const ball = "<div class='ball' style='top:" + x + "px;left:" + y + "px;'></div>";
        const infoBox = "<div class='ball-info-box' style='top:" + (x-30) + "px;left:" + (y+15) + "px;'><p>" + price + "€</p></div>";
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
        mainloop();
    });


    const generateRandomPoints = (number_of_points) => {
        var $this = $('body');
        var offset = $this.offset();
        var width = $this.width();
        var height = $this.height();

        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

      //  let markerpoints = [];
       // for (let index = 0; index < number_of_points; index++) {
       //     markerpoints.push({
       //         "x": Math.floor(Math.random() * (centerX+50) - (centerX-50) + 1) + (centerY-50),
       //         "y": Math.floor(Math.random() * ((centerY+50) - (centerY-50)) + 1) + (centerY-50),
       //         "price": 50
      //      });
     //   }
        //return [{"x": centerX, "y": centerY, "price": 50}, ...markerpoints]
        const markerpoints = [
            {x: centerX, y: centerY, price: 50},
            {x: 35, y: 35, price: 50},
            {x: 400, y: 400, price: 51},
            {x: 400, y: 400, price: 52},
            {x: 420, y: 400, price: 53},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54},
            {x: 400, y: 400, price: 54}
        ]
        return markerpoints; 
    }
}); 