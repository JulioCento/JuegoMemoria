//SHUFFLE
const shuffle = (arr) => {
    const length = arr.length
    for (let i = 0; i < length; i++) {
        const rand_index = Math.floor(Math.random() * length)
        const rand = arr[rand_index]
        arr[rand_index] = arr[i]
        arr[i] = rand
    }
}

// GLOBAL VARIABLES AND ARRAYS
var users = [
];
var cards = [
    document.getElementById("card1"), document.getElementById("card2"), document.getElementById("card3"), document.getElementById("card4"), document.getElementById("card5"), document.getElementById("card6"), document.getElementById("card7"), document.getElementById("card8"), document.getElementById("card9"), document.getElementById("card10"), document.getElementById("card11"), document.getElementById("card12"), document.getElementById("card13"), document.getElementById("card14"), document.getElementById("card15"), document.getElementById("card16")
];
var cardsNames = [
    "Sangheili", "Banshees", "Flood Sangheili", "Cortana", "Marins", "MasterChief", "Sangheili Elite", "Unggoy"
];
var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
var selectedCards = [];
var validCouples = [];
var clicked = [];
var delay;
var delay2;
var successes = 0;
var errors = 0;
var finded;
var aux;
var sound = new Audio();
var mainSound = new Audio();
sound.src = "./effects/sound.mp3"
mainSound.src = "./effects/mainSound.mp3"

// CLASSES
class User {
    constructor(nm, em) {
        this.recordTime = 86400;
        this.name = nm;
        this.email = em;
    }

    static addUser() {
        let exists;
        let auxName;
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == document.getElementById("namePlayer").value) {
                exists = true;
                break
            }
        }

        if (exists) {
            Swal.fire("Usuario ya registrado, inicia sesion")
        } else {
            if (validEmail.test(document.getElementById("emailPlayer").value)) {
                let user = new User(document.getElementById("namePlayer").value, document.getElementById("emailPlayer").value)
                let auxUser = JSON.stringify(user);
                users.push(JSON.parse(auxUser));
                localStorage.setItem("newUser", JSON.stringify(auxUser));
                localStorage.setItem("Name", document.getElementById("namePlayer").value);
                localStorage.setItem("Email", document.getElementById("emailPlayer").value);
                localStorage.setItem("Record", 86400);
                document.getElementById("record").innerHTML = "Tiempo record: 0"
                Swal.fire("Bienvenido SPARTAN, ahora inicia sesión")
                document.getElementById("loginPlayer").style = "filter: blur(0px);"
                document.getElementById("loginPlayer").style = "scale: 1.5;"
                document.getElementById("signinPlayer").style.display = "none";
            } else {
                Swal.fire("Por favor indique un e-mail válido");
                document.getElementById("emailPlayer").focus();
            }
        }
    }
}

// FUNCTIONS
// ONLOAD FUNCTION
window.addEventListener("load", () => {
    if (localStorage.length >= 1) {

        let user = new User(localStorage.Name, localStorage.Email)
        let auxUser = JSON.stringify(user);
        users.push(JSON.parse(auxUser));
        aux = users[0]
        users[0].recordTime = localStorage.Record;

        document.getElementById("welcomeText").innerHTML = "Bienvenido SPARTAN " + localStorage.Name.toUpperCase();
        document.getElementById("btnPlay").style.display = "block"
        document.getElementById("btnOut").style.display = "block"
        document.getElementById("successes").style.display = "flex"
        document.getElementById("time").style.display = "flex"
        document.getElementById("record").style.display = "flex"
        document.getElementById("signinPlayer").style.display = "none"
        document.getElementById("loginPlayer").style.display = "none"
        document.getElementById("namePlayer").style.display = "none"
        document.getElementById("emailPlayer").style.display = "none"
        if (localStorage.Record == undefined || localStorage.Record == 86400) {
            document.getElementById("record").innerHTML = "Tiempo record: 0"
        } else {
            document.getElementById("record").innerHTML = "Tiempo record: " + localStorage.Record;
        }
    }
})

// SOUND EFFECT
function soundOnMouseOver() {
    sound.play();
}

// COUNTER FUNCTION
function count() {
    var n = 0;
    var l = document.getElementById("time");
    var tc;
    tc = setInterval(function () {
        l.innerHTML = "Tiempo: " + n;
        n++;
        if (successes == 8) {
            clearInterval(tc);
            successes = 0;
            document.getElementById("status").innerHTML = '<p class="fs-1" id="status" >G A M E   O V E R</p>'
            document.getElementById("btnPlay").style.display = "block"
            document.getElementById("btnOut").style.display = "block"
            mainSound.pause()
            if (n < aux.recordTime) {
                aux.recordTime = (n - 1);
                localStorage.setItem("userUpdated", JSON.stringify(aux));
                localStorage.removeItem("newUser");
                localStorage.setItem("Record", aux.recordTime);
                Swal.fire("Nuevo record SPARTAN " + aux.name.toUpperCase());
                document.getElementById("record").innerHTML = "Tiempo record: " + (n - 1);
            }
        }
    }, 1000);
}

// VALIDATE USER
function validateUser(nm, em) {
    if (users.length != 0) {
        if (nm != "" && isNaN(nm)) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].name == nm) {
                    aux = users[i];
                    finded = true;
                    break
                } else {
                    if (users[i].name != nm && nm != localStorage.Name) {
                        finded = false;
                        document.getElementById("namePlayer").focus();
                        Swal.fire("Nombre no encontrado, por favor registrate y sé un nuevo SPARTAN");
                    }
                }
            }

            if (finded) {
                if (aux.email == em) {
                    localStorage.setItem("Name", aux.name);
                    localStorage.setItem("Email", em)
                    document.getElementById("welcomeText").style.display = "flex"
                    document.getElementById("welcomeText").innerHTML = "Bienvenido SPARTAN " + aux.name.toUpperCase();
                    document.getElementById("btnPlay").style.display = "block"
                    document.getElementById("btnOut").style.display = "block"
                    document.getElementById("successes").style.display = "flex"
                    document.getElementById("time").style.display = "flex"
                    document.getElementById("signinPlayer").style.display = "none"
                    document.getElementById("loginPlayer").style.display = "none"
                    document.getElementById("namePlayer").style.display = "none"
                    document.getElementById("emailPlayer").style.display = "none"
                    document.getElementById("record").style.display = "flex"
                } else {
                    document.getElementById("emailPlayer").focus();
                    Swal.fire("Correo electrónico inválido del usuario " + nm.toUpperCase() + ", ingrese datos válidos e inténtelo de nuevo");
                }
            }
        } else {
            document.getElementById("namePlayer").focus();
            Swal.fire("Por favor introduzca un nombre válido, no deje espacios en blanco y no introduzca números")
        }
    } else {
        Swal.fire("Nombre no encontrado, por favor registrate y sé un nuevo SPARTAN");
        document.getElementById("loginPlayer").style.display = "none"
        document.getElementById("signinPlayer").style = "scale: 1.5;"
    }
}

// FLIP
function flipCard(fp) {
    event.stopPropagation();
    if (!clicked.includes(fp.id) && !validCouples.includes(fp.className)) {
        sound.play();
        fp.style.opacity = 1;
        clicked.push(fp.id);
        selectedCards.push(fp);
        if (selectedCards.length == 2) {
            if (selectedCards[0].className == selectedCards[1].className) {
                successes++
                document.getElementById("successes").innerHTML = "Aciertos: " + successes
                validCouples.push(fp.className);
                document.getElementById("status").innerHTML = '<p style="color:green;">A C E R T A S T E</p>'
                selectedCards = [];
            } else {
                clicked = [];
                document.getElementById("status").innerHTML = '<p style="color:red;">D E S A C E R T A S T E</p>'
                delay2 = setTimeout(() => {
                    document.getElementById(selectedCards[0].id).style.opacity = 0;
                    document.getElementById(selectedCards[1].id).style.opacity = 0;
                    clearTimeout(delay2);
                    selectedCards = [];
                }, 250)
            }
        }
    } else {
        Swal.fire("Ya se seleccionó esta carta");
    }
}

// INIT FUNCTION
function play() {
    event.stopPropagation();
    selectedCards = [];
    validCouples = [];
    clicked = [];
    mainSound.play()

    document.getElementById("btnPlay").style = "disabled"
    document.getElementById("btnOut").style = "disabled"
    document.getElementById("successes").innerHTML = "Aciertos: " + successes
    document.getElementById("time").innerHTML = "Tiempo: 0";

    // INSERTING CARDS RANDOMNLY
    shuffle(cards);
    shuffle(cardsNames);
    cards[0].innerHTML = '<img src="./imgs/' + cardsNames[0] + '.jpg" alt="" class="P1" id="img1" onclick="(flipCard(this))"  >'
    cards[1].innerHTML = '<img src="./imgs/' + cardsNames[1] + '.jpg" alt="" class="P2" id="img2" onclick="(flipCard(this))">'
    cards[2].innerHTML = '<img src="./imgs/' + cardsNames[2] + '.jpg" alt=""  class="P3" id="img3" onclick="(flipCard(this))">'
    cards[3].innerHTML = '<img src="./imgs/' + cardsNames[3] + '.jpg" alt="" class="P4" id="img4" onclick="(flipCard(this))">'
    cards[4].innerHTML = '<img src="./imgs/' + cardsNames[4] + '.jpg" alt="" class="P5" id="img5" onclick="(flipCard(this))">'
    cards[5].innerHTML = '<img src="./imgs/' + cardsNames[5] + '.jpg" alt="" class="P6" id="img6" onclick="(flipCard(this))">'
    cards[6].innerHTML = '<img src="./imgs/' + cardsNames[6] + '.jpg" alt="" class="P7" id="img7" onclick="(flipCard(this))">'
    cards[7].innerHTML = '<img src="./imgs/' + cardsNames[7] + '.jpg" alt="" class="P8" id="img8" onclick="(flipCard(this))">'
    cards[8].innerHTML = '<img src="./imgs/' + cardsNames[0] + '.jpg" alt="" class="P1" id="img9" onclick="(flipCard(this))">'
    cards[9].innerHTML = '<img src="./imgs/' + cardsNames[1] + '.jpg" alt="" class="P2" id="img10" onclick="(flipCard(this))">'
    cards[10].innerHTML = '<img src="./imgs/' + cardsNames[2] + '.jpg" alt="" class="P3"  id="img11" onclick="(flipCard(this))">'
    cards[11].innerHTML = '<img src="./imgs/' + cardsNames[3] + '.jpg" alt="" class="P4" id="img12" onclick="(flipCard(this))">'
    cards[12].innerHTML = '<img src="./imgs/' + cardsNames[4] + '.jpg" alt="" class="P5" id="img13" onclick="(flipCard(this))">'
    cards[13].innerHTML = '<img src="./imgs/' + cardsNames[5] + '.jpg" alt="" class="P6" id="img14" onclick="(flipCard(this))">'
    cards[14].innerHTML = '<img src="./imgs/' + cardsNames[6] + '.jpg" alt="" class="P7" id="img15" onclick="(flipCard(this))">'
    cards[15].innerHTML = '<img src="./imgs/' + cardsNames[7] + '.jpg" alt="" class="P8" id="img16" onclick="(flipCard(this))">'

    var imgs = [
        document.getElementById("img1"), document.getElementById("img2"), document.getElementById("img3"), document.getElementById("img4"), document.getElementById("img5"), document.getElementById("img6"), document.getElementById("img7"), document.getElementById("img8"), document.getElementById("img9"), document.getElementById("img10"), document.getElementById("img11"), document.getElementById("img12"), document.getElementById("img13"), document.getElementById("img14"), document.getElementById("img15"), document.getElementById("img16")
    ];

    delay = setTimeout(() => {
        imgs.forEach(img => {
            img.style.opacity = 0;
        });
        clearTimeout(delay);
    }, 2000)
    count();
}

function logOut() {
    Swal.fire({
        title: "¿Deseas salir?",
        text: "¡Se borrarán todos los datos!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "lightblue",
        cancelButtonColor: "gray",
        confirmButtonText: "Salir"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`¡Vuelve pronto SPARTAN ${aux.name.toUpperCase()}!`)
            localStorage.removeItem("userUpdated");
            localStorage.removeItem("newUser");
            localStorage.removeItem("Name");
            localStorage.removeItem("Email");
            localStorage.removeItem("Record")
            document.getElementById("btnPlay").style.display = "none"
            document.getElementById("btnOut").style.display = "none"
            document.getElementById("successes").style.display = "none"
            document.getElementById("time").style.display = "none"
            document.getElementById("record").style.display = "none"
            document.getElementById("welcomeText").style.display = "none"
            document.getElementById("signinPlayer").style.display = "flex"
            document.getElementById("signinPlayer").style = "scale: 1;"
            document.getElementById("loginPlayer").style.display = "flex"
            document.getElementById("loginPlayer").style = "scale: 1;"
            document.getElementById("namePlayer").style.display = "flex"
            document.getElementById("emailPlayer").style.display = "flex"
            mainSound.pause()
            users = [];
        } else {
            Swal.fire("¡Nos mantenemos en la batalla SPARTAN " + aux.name.toUpperCase() + "!")
        }
    });
}