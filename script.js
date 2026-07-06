
// ==============================
// VARIABLES
// ==============================

// ==============================
// FUNCTIONS
// ==============================

// Mouse Glow
const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    if (!glow) return;

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ==============================
// FUTURE FUNCTIONS
// ==============================
/*======================================================
    TORQUEBYTEE FINANCE HUB
    Calculator Showcase
======================================================*/

const calculators = [

{
    title:"EMI Calculator",
    category:"loan",
    badge:"⭐ Flagship",
    icon:"🏦",
    description:"Monthly EMI with amortization schedule and interest breakdown."
},

{
    title:"Home Loan Calculator",
    category:"loan",
    badge:"🏠 Popular",
    icon:"🏡",
    description:"Know affordability, EMI and total repayment."
},

{
    title:"Car Loan Calculator",
    category:"loan",
    badge:"🚗 Quick",
    icon:"🚗",
    description:"Calculate vehicle loan EMI instantly."
},

{
    title:"SIP Calculator",
    category:"investment",
    badge:"📈 Popular",
    icon:"📈",
    description:"Estimate wealth from monthly investments."
},

{
    title:"FD Calculator",
    category:"investment",
    badge:"💰 Essential",
    icon:"💰",
    description:"Calculate maturity value using compound interest."
},

{
    title:"PPF Calculator",
    category:"investment",
    badge:"🏛 Government",
    icon:"🏛️",
    description:"Long-term Public Provident Fund calculator."
},

{
    title:"GST Calculator",
    category:"tax",
    badge:"🧾 Tax",
    icon:"🧾",
    description:"Add or remove GST within seconds."
},

{
    title:"Income Tax Calculator",
    category:"tax",
    badge:"📊 India",
    icon:"📊",
    description:"Estimate your income tax instantly."
},

{
    title:"Retirement Planner",
    category:"retirement",
    badge:"🎯 Advanced",
    icon:"🎯",
    description:"Plan your retirement corpus and monthly income."
}

];

const calculatorGrid=document.getElementById("calculatorGrid");

const filterButtons=document.querySelectorAll(".filter-btn");

/*-------------------------------------*/

function renderCalculators(filter="all",search=""){

calculatorGrid.innerHTML="";

const filtered=calculators.filter(calc=>{

const categoryMatch=
filter==="all" || calc.category===filter;

const query = search.toLowerCase();

const searchMatch =

calc.title.toLowerCase().includes(query) ||

calc.description.toLowerCase().includes(query);

return categoryMatch && searchMatch;

});

filtered.forEach(calc=>{

calculatorGrid.innerHTML+=`

<div class="calculator-card">

<div class="card-category">

${calc.badge}

</div>

<div class="card-icon">

${calc.icon}

</div>

<h3>

${calc.title}

</h3>

<p>

${calc.description}

</p>

<div class="card-footer">

<span class="card-status">

${calc.title==="EMI Calculator"

? "Open Calculator"

: "Coming Soon"}

</span>

<div class="card-arrow">

${calc.title==="EMI Calculator"

? "↗"

: "→"}

</div>

</div>

</div>

`;

});

}

/*-------------------------------------*/

renderCalculators();

/*-------------------------------------*/

/*====================================
    FILTER BUTTONS
====================================*/

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const search =
            document.getElementById("heroSearch")?.value || "";

        renderCalculators(

            button.dataset.filter,

            search

        );

    });

});
/*====================================
    HERO SEARCH
====================================*/

const heroSearch = document.getElementById("heroSearch");

if(heroSearch){

    heroSearch.addEventListener("input",(e)=>{

        const activeFilter =
            document.querySelector(".filter-btn.active").dataset.filter;

        renderCalculators(

            activeFilter,

            e.target.value

        );

    });

}