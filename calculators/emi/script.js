/* ===========================================
   TorqueBytee EMI Calculator
=========================================== */
const currencySelect =
document.getElementById("currencySelect");
const loanAmountInput = document.getElementById("loanAmount");
const downPaymentInput = document.getElementById("downPayment");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("loanTenure");
const processingFeeInput = document.getElementById("processingFee");
const tenureTypeInput = document.getElementById("tenureType");

const emiOutput = document.getElementById("monthlyEMI");
const interestOutput = document.getElementById("totalInterest");
const paymentOutput = document.getElementById("totalPayment");
const principalOutput = document.getElementById("principalAmount");
const insightOutput = document.getElementById("tbInsight");
let emiChart;
const amortizationBody =
document.querySelector("#amortizationTable tbody");
const exportPdfBtn =
document.getElementById("exportPdfBtn");
const printBtn = document.getElementById("printBtn");
const resetBtn =
document.getElementById("resetBtn");

printBtn.addEventListener("click", () => {
    window.print();
});
function formatCurrency(value){

    const currency = currencySelect.value;

    return new Intl.NumberFormat(

        "en",

        {

            style:"currency",

            currency:currency,

            maximumFractionDigits:0

        }

    ).format(value);

}

function calculateEMI(){

    let loan =
        Number(loanAmountInput.value) || 0;

    const down =
        Number(downPaymentInput.value) || 0;

    const rate =
        Number(interestRateInput.value) || 0;

    let years =
Number(loanTenureInput.value) || 0;

let months;

if(tenureTypeInput.value==="years"){

    months=years*12;

}else{

    months=years;

    years=months/12;

}

    const fee =
        Number(processingFeeInput.value) || 0;

    loan -= down;

  if(

loan<=0 ||

rate<=0 ||

rate>50 ||

months<=0

){

        emiOutput.textContent="₹0";
        interestOutput.textContent="₹0";
        paymentOutput.textContent="₹0";
        principalOutput.textContent="₹0";

        if(loan<=0){

insightOutput.textContent=

"Please enter a valid loan amount.";

}

else if(rate<=0 || rate>50){

insightOutput.textContent=

"Interest rate should be between 0% and 50%.";

}

else{

insightOutput.textContent=

"Please enter a valid loan tenure.";

}

        return;

    }
months = Math.round(months);
    const monthlyRate=rate/12/100;

    

    const emi=

        loan*

        monthlyRate*

        Math.pow(

            1+monthlyRate,

            months

        )/

        (

            Math.pow(

                1+monthlyRate,

                months

            )-1

        );

    const totalPayment=

        emi*months;

    const totalInterest=

        totalPayment-loan;

    const processingFee=

        loan*(fee/100);

    emiOutput.textContent=
        formatCurrency(emi);

    interestOutput.textContent=
        formatCurrency(totalInterest);

    paymentOutput.textContent=
        formatCurrency(totalPayment+processingFee);

    principalOutput.textContent=
        formatCurrency(loan);

    let interestPercent=

(totalInterest/loan)*100;

if(interestPercent<30){

insightOutput.textContent=

`Excellent! Your total interest is only ${interestPercent.toFixed(1)}% of the borrowed amount.`;

}

else if(interestPercent<60){

insightOutput.textContent=

`Good repayment plan. Increasing your down payment could reduce your interest further.`;

}

else{

insightOutput.textContent=

`Your interest is ${interestPercent.toFixed(1)}% of the borrowed amount. Consider a shorter tenure or a larger down payment to reduce overall borrowing cost.`;

}

updateChart(

loan,

totalInterest

);
generateAmortization(

loan,

emi,

monthlyRate,

months

);
}

/* Live Calculation */

// Live input listeners
loanAmountInput.addEventListener("input", calculateEMI);

downPaymentInput.addEventListener("input", calculateEMI);

interestRateInput.addEventListener("input", calculateEMI);

loanTenureInput.addEventListener("input", calculateEMI);

processingFeeInput.addEventListener("input", calculateEMI);

// Dropdown listeners
currencySelect.addEventListener("change", calculateEMI);

tenureTypeInput.addEventListener("change", calculateEMI);
calculateEMI();

/*==========================================
CHART
==========================================*/

function updateChart(principal,interest){

const ctx=document
.getElementById("emiChart");

if(!ctx) return;

if(emiChart){

emiChart.destroy();

}

emiChart=new Chart(ctx,{

type:"doughnut",

data:{

labels:[

"Principal",

"Interest"

],

datasets:[{

data:[

principal,

interest

],

backgroundColor:[

"#7C5CFF",

"#38BDF8"

],

borderWidth:0,

hoverOffset:10

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom",

labels:{

color:"#E5E7EB",

padding:20

}

}

},

cutout:"68%"

}

});

}
/*==========================================
AMORTIZATION
==========================================*/

function generateAmortization(

principal,

emi,

monthlyRate,

months

){

if(!amortizationBody) return;

amortizationBody.innerHTML="";

let balance=principal;

const rowsToShow=Math.min(months,12);

for(let month=1;month<=rowsToShow;month++){

const interest=

balance*monthlyRate;

const principalPaid=

emi-interest;

balance-=principalPaid;

if(balance<0){

balance=0;

}

const row=document.createElement("tr");

row.innerHTML=`

<td>${month}</td>

<td>${formatCurrency(emi)}</td>

<td>${formatCurrency(principalPaid)}</td>

<td>${formatCurrency(interest)}</td>

<td>${formatCurrency(balance)}</td>

`;

amortizationBody.appendChild(row);

}

}
printBtn.addEventListener("click", () => {
    window.print();
});
/*==========================================
PDF EXPORT
==========================================*/

async function exportReport(){

const { jsPDF } = window.jspdf;
// Read current values again
let loan = Number(loanAmountInput.value) || 0;

const downPayment = Number(downPaymentInput.value) || 0;

const rate = Number(interestRateInput.value) || 0;

let months = Number(loanTenureInput.value) || 0;

if (tenureTypeInput.value === "years") {
    months *= 12;
}

loan -= downPayment;

const monthlyRate = rate / 12 / 100;

const emi =
    loan *
    monthlyRate *
    Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1);

const doc = new jsPDF();

const today = new Date();

const reportDate =
today.toLocaleDateString();

doc.setFont("helvetica","bold");

doc.setFontSize(20);

doc.text("TorqueByteee",20,20);

doc.setFontSize(11);

doc.setFont("helvetica","normal");

doc.text(

"Finance Hub - EMI Report",

20,

28

);

doc.setDrawColor(124,92,255);

doc.line(20,33,190,33);
doc.setFontSize(10);

doc.text(

`Generated: ${reportDate}`,

20,

42

);

doc.text(

`Currency: ${currencySelect.value}`,

20,

48

);

doc.text(

`Loan Amount: ${formatCurrency(loan)}`,

20,

60

);

doc.text(

`Down Payment: ${formatCurrency(downPayment)}`,

20,

68

);

doc.text(

`Interest Rate: ${rate}%`,

20,

76

);

doc.text(

`Tenure: ${months} Months`,

20,

84

);
doc.setFont(

"helvetica",

"bold"

);

doc.setFontSize(14);

doc.text(

"Results",

20,

100

);

doc.setFont(

"helvetica",

"normal"

);

doc.setFontSize(11);

doc.text(

`Monthly EMI : ${emiOutput.textContent}`,

20,

112

);

doc.text(

`Principal : ${principalOutput.textContent}`,

20,

120

);

doc.text(

`Interest : ${interestOutput.textContent}`,

20,

128

);

doc.text(

`Total Payment : ${paymentOutput.textContent}`,

20,

136

);
doc.setFont(

"helvetica",

"bold"

);

doc.text(

"TorqueByteee Insight",

20,

152

);

doc.setFont(

"helvetica",

"normal"

);

doc.setFontSize(10);

const insight =

doc.splitTextToSize(

insightOutput.textContent,

170

);

doc.text(

insight,

20,

160

);
let startY = 180;

doc.setFont(
"helvetica",
"bold"
);

doc.setFontSize(12);

doc.text(
"Amortization Schedule",
20,
startY
);

startY += 10;

doc.setFontSize(9);

doc.text("Month",20,startY);
doc.text("EMI",55,startY);
doc.text("Principal",90,startY);
doc.text("Interest",130,startY);
doc.text("Balance",165,startY);

startY += 6;

doc.line(20,startY,190,startY);

startY += 8;

let balance = loan;

for(let month=1; month<=Math.min(months,12); month++){

    const interest =
    balance * monthlyRate;

    const principalPaid =
    emi - interest;

    balance -= principalPaid;

    if(balance<0){
        balance = 0;
    }

    doc.text(
        String(month),
        20,
        startY
    );

    doc.text(
        formatCurrency(emi),
        55,
        startY
    );

    doc.text(
        formatCurrency(principalPaid),
        90,
        startY
    );

    doc.text(
        formatCurrency(interest),
        130,
        startY
    );

    doc.text(
        formatCurrency(balance),
        165,
        startY
    );

    startY += 7;

}
doc.setDrawColor(180);

doc.line(
20,
280,
190,
280
);

doc.setFontSize(9);

doc.setTextColor(120);

doc.text(

"Generated by TorqueByteee Finance Hub",

20,

287

);

doc.text(

"www.torquebytee.com",

20,

293

);

doc.text(

"Report Version 1.0",

150,

293

);
doc.save(

"TorqueByteee-EMI-Report.pdf"

);
}
resetBtn.addEventListener(
"click",
resetCalculator
);
function resetCalculator(){

    loanAmountInput.value="";

    downPaymentInput.value="";

    interestRateInput.value="";

    loanTenureInput.value="";

    currencySelect.value="INR";

    tenureTypeInput.value="years";

    emiOutput.textContent="--";

    principalOutput.textContent="--";

    interestOutput.textContent="--";

    paymentOutput.textContent="--";

    insightOutput.textContent=
    "Enter your loan details to view insights.";

    amortizationBody.innerHTML="";

    if(window.emiChart){

        window.emiChart.destroy();

        window.emiChart=null;

    }
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
chartContainer.style.display = "none";
}