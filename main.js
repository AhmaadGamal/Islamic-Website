// Explore Button 
let exploreBtn = document.querySelector('.title .btn'),
hadithSection  = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    hadithSection.scrollIntoView({
        behavior : "smooth"
    })
})


let fixedNav  = document.querySelector('.header');
let scrollBtn = document.querySelector('scrollBtn');
window.addEventListener("scroll",() =>{
    window.screenY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');

    // window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active')
    
    // if(window.scrollY > 500) {
    //     scrollBtn.classList.add('active')
    // }
    // else {
    //     scrollBtn.classList.remove('active')
    // }
})



// Hadith Api
let hadith = document.querySelector('.hadith-container'),
    next   = document.querySelector('.buttons .next'),
    prev   = document.querySelector('.buttons .prev'),
    num    = document.querySelector('.buttons .num');

let hadithIndex = 0;
hadithChanger();

function hadithChanger() {
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(Response => Response.json())
    .then(data =>{
        let Hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click', ()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeHadith();
        })

        prev.addEventListener('click', ()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            changeHadith();
        })

        function changeHadith() {
            hadith.innerText = Hadiths[hadithIndex].arab;
            num.innerText = `300 - ${hadithIndex}`
        }
    })
}

// End Hadith Api

// Start محاضرات section 

let sections = document.querySelectorAll("section"),
    links    = document.querySelectorAll('.header ul li');

links.forEach(link => (
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section => {
            if(section.classList.contains(target)) {
                section.scrollIntoView({
                    behavior : "smooth"
                });
            }
        })
    })
))

//  End محاضرات section


// Start Quran Section 
let surhasContainer = document.querySelector('.surah-container');
getsurahs();
function getsurahs() {
fetch("http://api.alquran.cloud/v1/meta")
.then(respons => respons.json())
.then(data=>{
    let surahs = data.data.surahs.references;
    let numberOfSurahs = 114;

    surhasContainer.innerHTML = "";
    for (let i = 0; i < numberOfSurahs; i++) {

        surhasContainer.innerHTML += `
            <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName} </p>
            </div>`
    }

    let surhasTitle   = document.querySelectorAll('.surah');
    let popup         = document.querySelector('.surah-popup'),
        ayatContainer = document.querySelector('.ayat');

    surhasTitle.forEach((title,index)=>{
        title.addEventListener('click',()=>{
            fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then(response => response.json())
            .then(data=>{
                ayatContainer.innerHTML = "";
                let ayat = data.data.ayahs;
                ayat.forEach(aya=>{
                    popup.classList.add('active');
                    ayatContainer.innerHTML += 
                    `<p>(${aya.numberInSurah}) - ${aya.text}</p>`
                })
            })
        })
    })
    let closePopup = document.querySelector ('.close-popup');
    closePopup.addEventListener('click',()=>{
        popup.classList.remove('active');
        // console.log("AAAA");
    })
})
}
// End Quran Section 


// Start prayer section
let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes() {
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        cards.innerHTML = "";
        for (let time in times) {
            cards.innerHTML += `
                <div class="card">
                    <div class="circle">
                        <svg>
                        <circle cx="100" cy="100" r = "100"></circle>
                        </svg>
                    <div class="praytime">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div> `
        }
    })
}

// End prayer section


// Start Scroll Button

//End Scroll Button


//Active sideBar
let bars = document.querySelector('.bars'),
    sideBar = document.querySelector('.header ul')
    bars.addEventListener('click',()=>{
        sideBar.classList.toggle("active");
    })