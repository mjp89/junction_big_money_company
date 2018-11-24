$(function() {
    const markerpoints = [
        {x: 35, y: 35, price: 50},
        {x: 300, y: 500, price: 51},
        {x: 100, y: 200, price: 52},
        {x: 120, y: 800, price: 53},
        {x: 500, y: 50, price: 54}
    ]

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const showMarker = (x, y, price) => {
        const ball = "<div class='ball' style='top:" + x + "px;left:" + y + "px;'></div>";
        const infoBox = "<div class='ball-info-box' style='top:" + (x-30) + "px;left:" + (y+15) + "px;'><p>" + price + "€</p></div>";
        $('.container').append(ball, infoBox);
    }

    const hideMarker = () => {
        $('.ball').hide('slow', function(){$('.ball').remove();});
        $('.ball-info-box').hide('scale', function(){$('.ball-info-box').remove()}) 
    }

    async function mainloop() {
        for (const point of markerpoints) {
            showMarker(point.x, point.y, point.price);
            await sleep(1000);
            hideMarker();
            await sleep(1000);
        }
    }
    mainloop();
}); 