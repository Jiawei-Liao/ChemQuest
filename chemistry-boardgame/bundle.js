(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const rfidToCompound = {
    'b3ab0fa6': 'Oxygen',
    '232981a6': 'Hydrogen',
    '0000000010': 'Water',
    '0000000011': 'Methane',
    '0000000100': 'Carbon Dioxide',
}

const rfidToFacilitator = {
    '1000000000': 'Heat',
    '0100000000': 'Platinum',
    '0010000000': 'Agitation',
    '0001000000': 'Sunlight',
}
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    socket.on('data', (data) => {
        // Set all displays to empty
        var imageElememts = document.getElementsByClassName("editableImage");
        for (var i = 0; i < imageElememts.length; i++) {
            imageElememts[i].style.display = "none";
        }

        var textElements = document.getElementsByClassName("editableText");
        for (var i = 0; i < textElements.length; i++) {
            textElements[i].innerHTML = "";
        }

        const rfidDatas = data.trim().split(' ');

        for (const rfidData of rfidDatas) {
            const rfid = rfidData.split('-')[0];
            const index = rfidData.split('-')[1];
            if (rfid in rfidToCompound) {
                compound = rfidToCompound[rfid];
                switch (index) {
                    case "1":
                        document.getElementById("compound1").innerHTML = compound;
                        const image = document.getElementById("testtube1Image");
                        image.style.display = "block";
                        break;
                    case "2":
                        document.getElementById("compound2").innerHTML = compound;
                        const image2 = document.getElementById("testtube2Image");
                        image2.style.display = "block";
                        break;
                    case "3":
                        document.getElementById("compound3").innerHTML = compound;
                        const image3 = document.getElementById("testtube3Image");
                        image3.style.display = "block";
                        break;
                    case "4":
                        document.getElementById("compound4").innerHTML = compound;
                        const image4 = document.getElementById("testtube4Image");
                        image4.style.display = "block";
                        break;
                }
            } 
            if (rfid in rfidToFacilitator) {
                facilitator = rfidToFacilitator[rfid];
                switch (facilitator) {
                    case "Heat":
                        document.getElementById("fireImage").style.display = "block";
                        break;
                    case "Sunlight":
                        document.getElementById("sunImage").style.display = "block";
                        break;
                }
            }
        }
    });
});
},{}]},{},[1]);
