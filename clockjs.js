function displayCanvas() {

    var canvas = document.getElementById("drawingCanvas"),
        context = canvas.getContext("2d"),
        radiusClock = canvas.width / 2 - 10,
        xCenterClock = canvas.width / 2,
        yCenterClock = canvas.height / 2,
        radiusNum = radiusClock - 10,
        lengthSeconds = radiusNum - 15,
        lengthMinutes = radiusNum - 20,
        lengthHour = lengthMinutes / 1.5,
        img = new Image();

    img.src = 'images/clock3.png';
    img.onload = function () {
        context.drawImage(img, this.x, this.y, 500, 500);
    }

    context.fillStyle = "#D3D3D3";
    context.fillRect(0,0,canvas.width,canvas.height);

    // Центр

    context.beginPath();
    context.strokeStyle =  "#000000";
    context.fillStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    context.stroke();
    context.fill();
    context.closePath();

    var d = new Date();

    var t_sec = 6*d.getSeconds();
    var t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds());
    var t_hour = 30*(d.getHours() + (1/60)*d.getMinutes());

    // Секунды

    context.beginPath();
    context.strokeStyle =  "#FF0000";
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
        yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    context.stroke();
    context.closePath();

    // Минуты

    context.beginPath();
    context.strokeStyle =  "#000000";
    context.lineWidth = 3;
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
        yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    context.stroke();
    context.closePath();

    // Часы

    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
        yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    context.stroke();
    context.closePath();

    return;
}

window.onload = function(){
    window.setInterval(
        function(){
            displayCanvas();
        }
        , 1000);
}

function settingTime(){
    var setTime = document.getElementById('nTime').value;
}
