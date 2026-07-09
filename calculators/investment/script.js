
/* ============================================
   TORQUEBYTEE INVESTMENT CALCULATOR
   FOUNDATION
============================================ */

const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    AUD: "$",
    CAD: "$",
    SGD: "$"
};

let currentMode = "sip";
let currentCurrency = "INR";

const tabButtons = document.querySelectorAll(".tab-btn");

const currencySelect = document.getElementById("currency");

const sipInputs = document.getElementById("sipInputs");

const lumpsumInputs = document.getElementById("lumpsumInputs");

const investedResult = document.getElementById("investedResult");

const wealthResult = document.getElementById("wealthResult");

const profitResult = document.getElementById("profitResult");

const inflationResult = document.getElementById("inflationResult");

const insight = document.getElementById("insight");

const growthTable = document.getElementById("growthTable");

/* ============================================
    FORMAT
============================================ */

function formatMoney(value){

    const symbol = currencySymbols[currentCurrency];

    return symbol + Number(value).toLocaleString(undefined,{
        maximumFractionDigits:2
    });

}

/* ============================================
    MODE SWITCHING
============================================ */

tabButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        tabButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        currentMode = button.dataset.type;

        if(currentMode==="sip"){

            sipInputs.style.display="block";

            lumpsumInputs.style.display="none";

        }

        else if(currentMode==="lumpsum"){

            sipInputs.style.display="none";

            lumpsumInputs.style.display="block";

        }

        else{

            sipInputs.style.display="block";

            lumpsumInputs.style.display="block";

        }

        clearResults();

    });

});

/* ============================================
    CURRENCY
============================================ */

currencySelect.addEventListener("change",()=>{

    currentCurrency = currencySelect.value;

    clearResults();

});

/* ============================================
    RESULT RESET
============================================ */

function clearResults(){

    investedResult.textContent="--";

    wealthResult.textContent="--";

    profitResult.textContent="--";

    inflationResult.textContent="--";

    insight.textContent="Enter your investment details to receive personalized insights.";

    growthTable.innerHTML="";

}

/* ============================================
    RESET BUTTON
============================================ */

document
.getElementById("resetBtn")
.addEventListener("click",()=>{

document.querySelectorAll("input").forEach(input=>{

if(input.type==="number"){

input.value="";

}

});

currencySelect.value="INR";

currentCurrency="INR";

currentMode="sip";

sipInputs.style.display="block";

lumpsumInputs.style.display="none";

tabButtons.forEach(btn=>btn.classList.remove("active"));

tabButtons[0].classList.add("active");

clearResults();

});

/* ============================================
    CHART
============================================ */

let chart;

const ctx=document
.getElementById("investmentChart")
.getContext("2d");

chart=new Chart(ctx,{

type:"doughnut",

data:{

labels:["Investment","Profit"],

datasets:[{

data:[50,50]

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"#ffffff"

}

}

}

}

});

/* ============================================
    UPDATE CHART
============================================ */

function updateChart(invested,profit){

chart.data.datasets[0].data=[invested,profit];

chart.update();

}
function updateCompareChart(

sip,

lumpsum

){

chart.data.labels=[

"SIP Wealth",

"Lumpsum Wealth"

];

chart.data.datasets[0].data=[

sip,

lumpsum

];

chart.update();

}
/* ============================================
    EXPORT
============================================ */

document
.getElementById("exportBtn")
.addEventListener("click",()=>{

window.print();

});

/* ============================================
    CALCULATE
============================================ */

document
.getElementById("calculateBtn")
.addEventListener("click",()=>{

if(currentMode==="sip"){

calculateSIP();

}

else if(currentMode==="lumpsum"){

calculateLumpsum();

}

else{

compareInvestment();

}

});

/* ============================================
PLACEHOLDERS
============================================ */

function calculateSIP(){

const monthlyInvestment = Number(document.getElementById("sipAmount").value);

const annualReturn = Number(document.getElementById("returnRate").value);

const years = Number(document.getElementById("years").value);

const inflation = Number(document.getElementById("inflation").value);

const stepUp = Number(document.getElementById("stepUp").value);

if(
monthlyInvestment<=0 ||
annualReturn<=0 ||
years<=0
){

alert("Please enter valid values.");

return;

}

const monthlyRate=annualReturn/12/100;

let invested=0;

let futureValue=0;

growthTable.innerHTML="";

let currentMonthly=monthlyInvestment;

for(let year=1;year<=years;year++){

for(let month=1;month<=12;month++){

futureValue=(futureValue+currentMonthly)*(1+monthlyRate);

invested+=currentMonthly;

}

currentMonthly=currentMonthly*(1+stepUp/100);

const profit=futureValue-invested;

const row=document.createElement("tr");

row.innerHTML=`

<td>${year}</td>

<td>${formatMoney(invested)}</td>

<td>${formatMoney(futureValue)}</td>

<td>${formatMoney(profit)}</td>

`;

growthTable.appendChild(row);

}

const profit=futureValue-invested;

const inflationAdjusted=

futureValue/

Math.pow(1+inflation/100,years);

investedResult.textContent=formatMoney(invested);

wealthResult.textContent=formatMoney(futureValue);

profitResult.textContent=formatMoney(profit);

inflationResult.textContent=formatMoney(inflationAdjusted);

updateChart(

Number(invested.toFixed(2)),

Number(profit.toFixed(2))

);

generateInsight(

invested,

futureValue,

profit,

years,

stepUp

);

}
function generateInsight(

invested,

wealth,

profit,

years,

stepUp

){

let text="";

const roi=((profit/invested)*100);

if(roi>100){

text+="Excellent long-term wealth creation. ";

}

else if(roi>50){

text+="Healthy investment growth. ";

}

else{

text+="Increasing investment period may improve returns. ";

}

if(stepUp>0){

text+=`A ${stepUp}% annual Step-Up significantly boosts your corpus. `;

}

if(years>=20){

text+="Long investment horizons benefit greatly from compounding.";

}

else if(years<10){

text+="Consider investing for a longer duration for stronger compounding.";

}

insight.textContent=text;

}

function calculateLumpsum(){

const principal=Number(document.getElementById("lumpAmount").value);

const annualReturn=Number(document.getElementById("returnRate").value);

const years=Number(document.getElementById("years").value);

const inflation=Number(document.getElementById("inflation").value);

if(
principal<=0||
annualReturn<=0||
years<=0
){

alert("Please enter valid values.");

return;

}

const wealth=

principal*Math.pow(
1+annualReturn/100,
years
);

const profit=wealth-principal;

const inflationAdjusted=

wealth/

Math.pow(
1+inflation/100,
years
);

investedResult.textContent=formatMoney(principal);

wealthResult.textContent=formatMoney(wealth);

profitResult.textContent=formatMoney(profit);

inflationResult.textContent=formatMoney(inflationAdjusted);

growthTable.innerHTML="";

for(let year=1;year<=years;year++){

const value=

principal*Math.pow(
1+annualReturn/100,
year
);

const row=document.createElement("tr");

row.innerHTML=`

<td>${year}</td>

<td>${formatMoney(principal)}</td>

<td>${formatMoney(value)}</td>

<td>${formatMoney(value-principal)}</td>

`;

growthTable.appendChild(row);

}

updateChart(

Number(principal.toFixed(2)),

Number(profit.toFixed(2))

);

generateLumpsumInsight(

principal,

wealth,

profit,

years

);

}
function generateLumpsumInsight(

principal,

wealth,

profit,

years

){

const roi=(profit/principal)*100;

let text="";

if(roi>150){

text+="Outstanding long-term investment growth. ";

}

else if(roi>75){

text+="Strong capital appreciation over time. ";

}

else{

text+="Returns are moderate. Increasing the investment duration may significantly improve wealth.";

}

if(years>=15){

text+=" Long-term compounding has worked in your favor.";

}

else{

text+=" Longer investment horizons usually produce substantially higher returns.";

}

insight.textContent=text;

}

function compareInvestment(){

const monthlyInvestment=Number(document.getElementById("sipAmount").value);

const lumpAmount=Number(document.getElementById("lumpAmount").value);

const annualReturn=Number(document.getElementById("returnRate").value);

const years=Number(document.getElementById("years").value);

const inflation=Number(document.getElementById("inflation").value);

const stepUp=Number(document.getElementById("stepUp").value);

if(
monthlyInvestment<=0||
lumpAmount<=0||
annualReturn<=0||
years<=0
){

alert("Please enter valid values.");

return;

}

const monthlyRate=annualReturn/12/100;

/* ------------ SIP ------------ */

let sipInvested=0;

let sipValue=0;

let currentMonthly=monthlyInvestment;

for(let y=1;y<=years;y++){

for(let m=1;m<=12;m++){

sipValue=(sipValue+currentMonthly)*(1+monthlyRate);

sipInvested+=currentMonthly;

}

currentMonthly=currentMonthly*(1+stepUp/100);

}

/* ------------ LUMPSUM ------------ */

const lumpValue=

lumpAmount*

Math.pow(

1+annualReturn/100,

years

);

/* ------------ RESULTS ------------ */

const sipProfit=sipValue-sipInvested;

const lumpProfit=lumpValue-lumpAmount;

const difference=sipValue-lumpValue;

investedResult.textContent=

formatMoney(sipInvested)+" / "+formatMoney(lumpAmount);

wealthResult.textContent=

formatMoney(sipValue)+" / "+formatMoney(lumpValue);

profitResult.textContent=

formatMoney(sipProfit)+" / "+formatMoney(lumpProfit);

const inflationAdjusted=

Math.max(sipValue,lumpValue)/

Math.pow(

1+inflation/100,

years

);

inflationResult.textContent=

formatMoney(inflationAdjusted);

updateCompareChart(

sipValue,

lumpValue

);

generateCompareInsight(

difference,

years,

stepUp

);

buildCompareTable(

monthlyInvestment,

lumpAmount,

annualReturn,

years,

stepUp

);

}
function generateCompareInsight(

difference,

years,

stepUp

){

let text="";

if(difference>0){

text=

"SIP generated "+formatMoney(difference)+

" more wealth than the Lumpsum investment over "+years+

" years.";

}

else{

text=

"Lumpsum generated "+formatMoney(Math.abs(difference))+

" more wealth than SIP over "+years+

" years.";

}

if(stepUp>0){

text+=" Annual Step-Up significantly improved SIP performance.";

}

insight.textContent=text;

}
function buildCompareTable(

monthlyInvestment,

lumpAmount,

annualReturn,

years,

stepUp

){

growthTable.innerHTML="";

const monthlyRate=annualReturn/12/100;

let sipInvested=0;

let sipValue=0;

let currentMonthly=monthlyInvestment;

for(let year=1;year<=years;year++){

for(let month=1;month<=12;month++){

sipValue=(sipValue+currentMonthly)*(1+monthlyRate);

sipInvested+=currentMonthly;

}

currentMonthly=currentMonthly*(1+stepUp/100);

const lumpValue=

lumpAmount*

Math.pow(

1+annualReturn/100,

year

);

const row=document.createElement("tr");

row.innerHTML=`

<td>${year}</td>

<td>${formatMoney(sipValue)}</td>

<td>${formatMoney(lumpValue)}</td>

<td>${formatMoney(sipValue-lumpValue)}</td>

`;

growthTable.appendChild(row);

}

}
clearResults();