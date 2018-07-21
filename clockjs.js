function displayCanvas(d) {

    let canvas = document.getElementById("drawingCanvas");
    let context = canvas.getContext("2d");
    let radiusClock = canvas.width / 2 - 10;
    let xCenterClock = canvas.width / 2;
    let yCenterClock = canvas.height / 2;
    let radiusNum = radiusClock - 10;
    let lengthSeconds = radiusNum - 15;
    let lengthMinutes = radiusNum - 20;
    let lengthHour = lengthMinutes / 1.5;
    let img = new Image();

    img.src = 'images/clock3.png';
    img.onload = function () {
        context.drawImage(img, this.x, this.y, 500, 500);
    }

    context.fillStyle = "#D3D3D3";
    context.fillRect(0,0,canvas.width,canvas.height);

    // Drawing center

    context.beginPath();
    context.strokeStyle =  "#000000";
    context.fillStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true);
    context.stroke();
    context.fill();
    context.closePath();

    let tSec = 6 * new Date().getSeconds();
    let tMin = (!d) ? 6 * ((new Date().getMinutes()) + (1 / 60) * new Date().getSeconds()) : 6 * ((d.getMinutes()) + (1 / 60) * new Date().getSeconds());
    let tHour = (!d) ? 30 * ((new Date().getHours()) + (1 / 60) * (new Date().getMinutes())) : 30 * ((d.getHours()) + (1 / 60) * (d.getMinutes()));

    // Drawing seconds hand

    context.beginPath();
    context.strokeStyle =  "#FF0000";
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock +
        lengthSeconds *
        Math.cos(Math.PI / 2 - tSec * (Math.PI / 180)),
        yCenterClock -
        lengthSeconds *
        Math.sin(Math.PI / 2 - tSec * (Math.PI / 180)));
    context.stroke();
    context.closePath();

    // Drawing minutes hand

    context.beginPath();
    context.strokeStyle =  "#000000";
    context.lineWidth = 3;
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock +
        lengthMinutes *
        Math.cos(Math.PI / 2 - tMin * (Math.PI / 180)),
        yCenterClock -
        lengthMinutes *
        Math.sin(Math.PI / 2 - tMin * (Math.PI / 180)));
    context.stroke();
    context.closePath();

    // Drawing hours hand

    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(xCenterClock, yCenterClock);
    context.lineTo(xCenterClock +
        lengthHour *
        Math.cos(Math.PI / 2 - tHour * (Math.PI / 180)),
        yCenterClock -
        lengthHour *
        Math.sin(Math.PI / 2 - tHour * (Math.PI / 180)));
    context.stroke();
    context.closePath();

    return;
}

let i;
let d;

window.onload = function(){
    displayCanvas();
    i = setInterval(displayCanvas, 1000);
}

function setTime(){
    let setTime = document.getElementById('nTime').value;
    setTime = {hours: setTime.substr(0, 2), minutes: setTime.substr(3, 2)};
    d = new Date();
    d.setHours(setTime.hours);
    d.setMinutes(setTime.minutes);
    setArrows(d);
}

function setArrows(d){
    clearInterval(i);
    displayCanvas(d);
    function f() {
        if (new Date().getSeconds() === 0) {
            let m = this.getMinutes();
            m++;
            this.setMinutes(m);
            if (m === 0) {
                let h = this.getHours();
                h++;
                this.setHours(h);
            }
        }
        displayCanvas(this);
    }
    x = f.bind(d);
    i = setInterval(x, 1000);
}


