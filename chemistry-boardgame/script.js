const rfidToCompound = {
    'a5b6a36e': 'Nitroglycerine ',
    '232981a6': 'Sodium Nitrate',
    'b519e030': 'Oxygen',
    '9b3b8a4c': 'Potassium Nitrate',
    '1529b16e': 'Glucose',
    'c5c9a26e': 'Potassium Permanganate',
    '17079d05': 'Aluminium',
    '45a7a36e': 'Water',
    'c560b06e': 'Iron Oxide',
    '05d3aa6e': 'Sodium Chlorate',
    'd50ea36e': 'Sodium',
    '6533a26e': 'Methane',
}

const rfidToFacilitator = {
    '555ba26e': 'Heat',
}

const reactions = {
    '["","","Heat","Nitroglycerine"]': ["Nitrogen", "Water", "Carbon Dioxide", "Explosion"],
    '["","","Methane","Oxygen"]': ["Carbon Dioxide", "Water", "Heat", "Explosion"],
    '["","","Sodium","Water"]': ["Sodium Hydroxide", "Hydrogen"],
    '["","","Heat","Sodium Chlorate"]': ['Sodium Chloride', 'Oxygen'],
    '["","","Oxygen","Paraffin Wax"]': ['Carbon Dioxide', 'Water', 'Heat', 'Light'],
    '["","","Hydrogen Peroxide","Phenyl Oxalate Ester"]': ['Phenol', 'Carbon Dioxide', 'Water', 'Light'],
    '["","Chlorine","Heat","Methane"]': ['Chlorofoam','Hydrogen Chloride'],
    '["","","Hydrochloric Acid","Sodium Silicate"]': ['Silica Gel', 'Water', 'Heat'],
    '["Heat","Iron Oxide","Aluminium","Potassium Permanganate]': ['Iron', 'Aluminium Oxide', 'Thermite Reaction'],
    '["","","Hydrogen","Sulphur"]': ['Hydrogen Sulfide'],
    '["","","Glucose","Potassium Nitrate"]': ['Nitrogen', 'Carbon Dioxide', 'Water', 'Smoke'],

    '["","","Glucose","Oxygen"]': ['Carbon Dioxide', 'Water', 'Heat', 'Light'],
    '["","","Aluminium","Oxygen"]': ['Aluminium Oxide',"Heat"],
    '["","","Heat","Potassium Nitrate"]': ['Potassium Nitrite','Oxygen','Nitrogen Dioxide'],
    '["","","Iron Oxide","Water"]': ['Iron Hydroxide'],
    '["","","Oxygen","Sodium"]': ['Sodium Oxide'],
    '["","","Heat","Potassium Permanganate"]': ['Potassium Manganate','Manganese Dioxide','Oxygen'],
    '["","","Heat","Iron Oxide"]': ['Iron','Oxygen'],
    '["","","Heat","Potassium Nitrate"]': ['Potassium Nitrite','Oxygen','Nitrogen Dioxide'],
    '["","","Sodium","Water"]': ['Sodium Hydroxide','Hydrogen'],   
}

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    socket.on('data', (data) => {
        console.log(data);
        if (data.trim() === 'React') {
            document.getElementsByClassName("reactionImage")[0].style.display = "block";
            var textElements = document.getElementsByClassName("product");
            for (var i = 0; i < textElements.length; i++) {
                textElements[i].innerHTML = "";
            }

            let reactants = [document.getElementById("compound1").innerHTML, document.getElementById("compound2").innerHTML, document.getElementById("compound3").innerHTML, document.getElementById("compound4").innerHTML];
            console.log(reactants);
            reactants.sort();
            let products = reactions[JSON.stringify(reactants)];
            
            if (products) {
                switch (products.length) {
                    case 1:
                        document.getElementById("product1-1").innerHTML = products[0];
                        break;
                    case 2:
                        document.getElementById("product2-1").innerHTML = products[0];
                        document.getElementById("product2-2").innerHTML = products[1];
                        break;
                    case 3:
                        document.getElementById("product3-1").innerHTML = products[0];
                        document.getElementById("product3-2").innerHTML = products[1];
                        document.getElementById("product3-3").innerHTML = products[2];
                        break;
                    case 4:
                        document.getElementById("product4-1").innerHTML = products[0];
                        document.getElementById("product4-2").innerHTML = products[1];
                        document.getElementById("product4-3").innerHTML = products[2];
                        document.getElementById("product4-4").innerHTML = products[3];
                        break;
                }
            } else {
                document.getElementById("product1-1").innerHTML = "Gloop";
            }
        }
        
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