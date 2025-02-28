function SwitchIcon(value){
    //Variabili
    var Big = document.getElementById("sidebar-iconBig");
    var Small = document.getElementById("sidebar-icon");

    IconSize(value);
    EsciSize(value);

    if (value) {
        Big.style.display = "block";
        Small.style.display = "none";

        // Animazione
        var id = null;
        var altezza = 35;
        clearInterval(id);
        id = setInterval(frame, 7);
        function frame() {
            if (altezza == 45) {
                clearInterval(id);
            } else {
                altezza++; 
                Big.style.height = altezza + 'px'; 
            }
        }        

        //Reimposto
        Small.style.height = "45px";
    }else{
        Big.style.display = "none";
        Small.style.display = "block";

        // Animazione
        var id = null;
        var altezza = 45;
        clearInterval(id);
        id = setInterval(frame, 7);
        function frame() {
            if (altezza == 35) {
                clearInterval(id);
            } else {
                altezza--; 
                Small.style.height = altezza + 'px'; 
            }
        }        

        //Reimposto
        Big.style.height = "35px";
    }
}

function IconSize(value) {
    //Variabili
    var Icon = document.getElementById("SidebarAccIcon");

    if (value) {
        var id = null;
        var altezza = 29;
        clearInterval(id);
        id = setInterval(frame, 2);
        function frame() {
            if (altezza == 60) {
                clearInterval(id);
            } else {
                altezza++; 
                Icon.style.height = altezza + 'px'; 
            }
        }        
    }else{
        var id = null;
        var altezza = 60;
        clearInterval(id);
        id = setInterval(frame, 2);
        function frame() {
            if (altezza == 29) {
                clearInterval(id);
            } else {
                altezza--; 
                Icon.style.height = altezza + 'px'; 
            }
        }    
    }
}

function EsciSize(value){
    //Variabili
    var elem = document.getElementById("EsciAccount")

    if (value) {
        elem.style.display = "block"
        var id = null;
        var altezza = 0;
        clearInterval(id);
        id = setInterval(frame, 2);
        function frame() {
            if (altezza == 35) {
                clearInterval(id);
            } else {
                altezza++; 
                elem.style.height = altezza + 'px'; 
            }
        }        
    }else{
        elem.style.display = "none"
        var id = null;
        var altezza = 35;
        clearInterval(id);
        id = setInterval(frame, 2);
        function frame() {
            if (altezza == 0) {
                clearInterval(id);
            } else {
                altezza--; 
                elem.style.height = altezza + 'px'; 
            }
        }    
    }
}

function HomePage() {
    var map = new ZAMMap(ZAMMapType.Ground, "lib/zam-map/");

    var sidebarIcon = document.getElementById("sidebar-icon");
    var sidebarIconBig = document.getElementById("sidebar-iconBig")
    var sidebar = document.getElementById("zam-sidebar");

    sidebarIcon.onclick = (event) => {
        ToggleSidebar(event, sidebar);
    };

    sidebarIconBig.onclick = (event) => {
        ToggleSidebar(event, sidebar);
    };

    sidebar.onmouseenter = (event) => {
        sidebar.setAttribute("open", "");
        SwitchIcon(true);
    }

    sidebar.onmouseleave = (event) => {
        sidebar.removeAttribute("open");
        SwitchIcon();
    }
}

function ToggleSidebar(event, /**@type {HTMLElement} */ sidebar) {
    if(sidebar.hasAttribute("open")) {
        sidebar.removeAttribute("open");
        SwitchIcon();
    } else {
        sidebar.setAttribute("open", "");
        SwitchIcon(true);
    }
}

function RedirLogin() {
    window.location.href = "./login.html";
}

async function FillUserInfo() {
    var auth = new ZAMAuth("http://localhost:8080");

    let status = await auth.getUserInfo((data) => {
        if(data.success) {
            var nameTitle = document.getElementById("SidebarAccTitle");
            nameTitle.innerText = data.nome + " " + data.cognome;
        } else {
            RedirLogin();
        }
    });

    if(status === false) {
        RedirLogin();
    }
}

async function LogOut() {
    var auth = new ZAMAuth("http://localhost:8080");
    
    await auth.logout((data) => {
        if(data.success) {
            window.location.reload();
        } else {
            console.log("Failed to log out");
        }
    });
}

window.onload = () => {
    HomePage();
    FillUserInfo();
}