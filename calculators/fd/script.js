/* ============================================
   TORQUEBYTEE FD CALCULATOR
============================================ */

let fdChart;

/* ---------------- Currency ---------------- */

function formatCurrency(value){

const symbol=document.getElementById("currency").value;

return symbol+" "+Number(value).toLocaleString(undefined,{

maximumFractionDigits:0

});

}

/* ---------------- Calculate ---------------- */

function calculateFD(){

const principal =
parseFloat(document.getElementById("principal").value) || 0;

const annualRate =
parseFloat(document.getElementById("rate").value) || 0;

const years =
parseFloat(document.getElementById("years").value) || 0;

const inflation =
parseFloat(document.getElementById("inflation").value) || 0;

const n =
parseInt(document.getElementById("compound").value);

/* Compound Interest */

const maturity =
principal *
Math.pow((1 + annualRate/(100*n)), n*years);

const interest =
maturity - principal;

/* Inflation Adjusted */

const realValue =
maturity /
Math.pow((1 + inflation/100), years);

/* Effective Yield */

const effectiveYield =
(Math.pow((1 + annualRate/(100*n)),n)-1)*100;

/* Savings Comparison */

const savings =
principal *
Math.pow((1 + 0.03),years);

const savingsDifference =
maturity - savings;

/* ============================= */
/* RESULTS */
/* ============================= */

document.getElementById("depositResult").textContent =
formatCurrency(principal);

document.getElementById("interestResult").textContent =
formatCurrency(interest);

document.getElementById("maturityResult").textContent =
formatCurrency(maturity);

document.getElementById("inflationResult").textContent =
formatCurrency(realValue);

document.getElementById("yieldResult").textContent =
effectiveYield.toFixed(2)+"%";

document.getElementById("comparisonResult").textContent =
formatCurrency(savingsDifference);

/* ============================= */
/* TABLE */
/* ============================= */

document.getElementById("tableFD").textContent =
formatCurrency(maturity);

document.getElementById("tableSavings").textContent =
formatCurrency(savings);

document.getElementById("tableInterest").textContent =
formatCurrency(interest);

document.getElementById("tableSavingsInterest").textContent =
formatCurrency(savings-principal);

document.getElementById("tableReal").textContent =
formatCurrency(realValue);

/* ============================= */
/* INSIGHT ENGINE */
/* ============================= */

let insight="";

if(years>=10 && annualRate>=7){

insight=
"🚀 Excellent long-term FD. Compounding is working strongly in your favour and your investment is expected to grow steadily.";

}

else if(inflation>annualRate){

insight=
"📉 Inflation is higher than your FD return. Although your money grows, its purchasing power is likely to decline over time.";

}

else if(annualRate<5){

insight=
"⚠ Your FD rate is relatively low. Comparing interest rates from multiple banks could significantly improve your final maturity value.";

}

else{

insight=
"✅ Your Fixed Deposit offers predictable returns with relatively low risk, making it suitable for conservative investors.";

}

document.getElementById("insightText").textContent=insight;
updateChart(principal, interest);
}
/* ============================================
   EVENTS
============================================ */

document.getElementById("calculateBtn")
.addEventListener("click",calculateFD);

/* Initial Calculation */

calculateFD();

/* ============================================
   TORQUEBYTEE FD CHART
============================================ */

function updateChart(principal,interest){

const ctx=document.getElementById("fdChart");

if(fdChart){

fdChart.destroy();

}

fdChart=new Chart(ctx,{

type:"doughnut",

data:{

labels:[

"Principal",

"Interest Earned"

],

datasets:[{

data:[

principal,

interest

],

backgroundColor:[

"#22D3EE",

"#7C5CFC"

],

borderWidth:0,

hoverOffset:15

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"bottom",

labels:{

color:"#ffffff",

padding:18,

font:{

size:14,

family:"Inter"

}

}

},

tooltip:{

backgroundColor:"#151c31",

titleColor:"#ffffff",

bodyColor:"#ffffff",

cornerRadius:10,

padding:12

}

},

cutout:"68%",

animation:{

animateRotate:true,

duration:900

}

}

});

}

/* ============================================
   RESET BUTTON
============================================ */

document.getElementById("resetBtn").addEventListener("click",()=>{

document.getElementById("principal").value=100000;

document.getElementById("rate").value=7;

document.getElementById("years").value=5;

document.getElementById("inflation").value=5;

document.getElementById("compound").value=4;

calculateFD();

});

/* ============================================
   EXPORT REPORT
============================================ */

document.getElementById("exportBtn").addEventListener("click",()=>{

window.print();

});
document.getElementById("currency").addEventListener("change",()=>{

calculateFD();

});
