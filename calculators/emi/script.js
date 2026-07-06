/* ===========================================
   TorqueBytee EMI Calculator
=========================================== */

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

function formatCurrency(value){

    return new Intl.NumberFormat("en-IN",{

        style:"currency",

        currency:"INR",

        maximumFractionDigits:0

    }).format(value);

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

loan<10000 ||

rate<=0 ||

rate>50 ||

months<=0

){

        emiOutput.textContent="₹0";
        interestOutput.textContent="₹0";
        paymentOutput.textContent="₹0";
        principalOutput.textContent="₹0";

        if(loan<10000){

insightOutput.textContent=

"Minimum loan amount is ₹10,000.";

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

    const suggestedDownPayment=

loan*0.10;

const estimatedSavings=

totalInterest*0.08;

insightOutput.textContent=

`Adding approximately ${formatCurrency(suggestedDownPayment)}
as extra down payment could save roughly
${formatCurrency(estimatedSavings)}
in interest over the loan period.`;

updateChart(

loan,

totalInterest

);

}

/* Live Calculation */

[
loanAmountInput,
downPaymentInput,
interestRateInput,
loanTenureInput,
processingFeeInput

].forEach(input=>{

    input.addEventListener(

        "input",

        calculateEMI

    );

});

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