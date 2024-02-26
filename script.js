document.addEventListener('DOMContentLoaded', function() {
  updateCurrentFields(); // Initial update on page load
  console.log('DOM fully loaded and parsed');


  // Update event listeners for top fields to update "current" fields in real-time
  document.getElementById('patientnum').addEventListener('input', updateCurrentFields);
  document.getElementById('perPx').addEventListener('input', updateCurrentFields);
  document.getElementById('conversion').addEventListener('input', updateCurrentFields);
  document.getElementById('avConsultation').addEventListener('input', updateCurrentFields);
  document.getElementById('multiPairs').addEventListener('input', updateCurrentFields);

  // Initialize slider value displays and add event listeners for calculations
  initializeSlider('patientsPerDayIncreaseSlider', 'patientsPerDayIncreaseValue', calculateIncreasePatientsPerDay);
  initializeSlider('increasedIncomeSlider', 'increasedIncomeValue', calculateIncreaseIncome, true); // true for currency
  initializeSlider('increaseConversionPercentageSlider', 'increaseConversionPercentageValue', calculateProductivity);
  initializeSlider('increaseFeeSlider', 'increaseFeeValue', calculateConsultationIncome, true); // true for currency
  initializeSlider('multipleSalesSlider', 'multipleSalesValue', calculateMultipleSales);

  // Event listeners for calculate buttons (kept as before)
  // document.getElementById('calculateIncreaseNumberOfPatients').addEventListener('click', calculateIncreasePatientsPerDay);
  // document.getElementById('calculateIncreaseIncome').addEventListener('click', calculateIncreaseIncome);
  // document.getElementById('calculateIncreaseProductivity').addEventListener('click', calculateProductivity);
  // document.getElementById('calculateConsultationIncome').addEventListener('click', calculateConsultationIncome);
  // document.getElementById('calculateMultipleSales').addEventListener('click', calculateMultipleSales);
  document.getElementById('calculateAll').addEventListener('click', calculateTotalPotentialIncrease);
  console.log('Calculate All button clicked');
});

function initializeSlider(sliderId, valueDisplayId, calculationCallback, isCurrency = false) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(valueDisplayId);
  slider.oninput = function() {
    display.textContent = this.value + (isCurrency ? '$' : '');
    calculationCallback();
    updateCurrentFields(); // Trigger calculation on slider move
  
  };
}

function updateCurrentFields() {
  // Fetch values from top fields
  var sliderValue = parseInt(document.getElementById('patientsPerDayIncreaseSlider').value) || '0';
  var patientNum = parseInt(document.getElementById('patientnum').value) || '0';
   // Debugging: Log the values to ensure they are correct
  //  console.log('Slider Value:', sliderValue, 'Patient Number:', patientNum);
  var updatedPatientNum = parseFloat(patientNum + sliderValue)

  // for the Increase Income from Each Patient
  var perpxsliderValue = parseInt(document.getElementById('increasedIncomeSlider').value) || '0';
  var perPx = parseInt(document.getElementById('perPx').value) || '0';
  var updatedperpx = parseFloat(perPx+ perpxsliderValue)

  // for the Increase productivity (Same Day Conversion)
  var conversionsliderValue = parseInt(document.getElementById('increaseConversionPercentageSlider').value) || '0';
  var conversion = parseInt(document.getElementById('conversion').value) || '0';
  var updatedconversion = parseFloat(conversion + conversionsliderValue);
  
  // for the Increase in Consultation Income
  var avConsultationsliderValue = parseInt(document.getElementById('increaseFeeSlider').value) || '0';
  var avConsultation = parseInt(document.getElementById('avConsultation').value) || '0';
  var updatedavConsultation = parseFloat(avConsultation + avConsultationsliderValue);

// for Increase Multiple sales
  var multiPairssliderValue = parseFloat(document.getElementById('multipleSalesSlider').value) || '0';
  var multiPairs = parseFloat(document.getElementById('multiPairs').value) || '0';
  var updatedatmultiPairs = parseFloat(multiPairs + multiPairssliderValue);

  // Update "current" fields in each row
  var rows = document.querySelectorAll('.row .item-2');
  if (rows.length >= 5) {
      rows[1].textContent = updatedPatientNum ;
      rows[2].textContent = updatedperpx;
      rows[3].textContent = updatedconversion;
      rows[4].textContent = updatedavConsultation;
      rows[5].textContent = updatedatmultiPairs;
  }
}


// Updated calculation functions to use slider values
  function calculateIncreasePatientsPerDay() {
   var increasedPatients = parseFloat(document.getElementById('patientsPerDayIncreaseSlider').value);
  // Implement calculation logic here
    var dollarPerPatient = parseFloat(document.getElementById('perPx').value); // Using 'per px $' as $ per patient
    // Assuming 350 as a constant multiplier
      var result = (300 * increasedPatients * dollarPerPatient).toFixed(2);
      document.getElementById('resultIncreaseNumberOfPatients').textContent = result;
  }

  function calculateIncreaseIncome() {
    var numberOfPatients = parseFloat(document.getElementById('patientnum').value);
    var increasedIncome = parseFloat(document.getElementById('increasedIncomeSlider').value);
    var potentialIncrease = (numberOfPatients * increasedIncome).toFixed(2);
    document.getElementById('resultIncome').textContent = potentialIncrease;
  // Implement calculation logic here
  
  }

// function calculateProductivity() {
//   var totalSales = parseFloat(document.getElementById('totalSales').value);
//   var productivityPercentage = parseFloat(document.getElementById('increaseConversionPercentageSlider').value);
//   var increaseProductivity = (totalSales * productivityPercentage).toFixed(2);
//   document.getElementById('resultIncreaseProductivity').textContent = increaseProductivity;
//   // Implement calculation logic here
//   console.log('Updated Calculate Productivity');
// }

function calculateProductivity() {
  var perPx = parseFloat(document.getElementById('perPx').value); // Cost per patient
  var patientNum = parseFloat(document.getElementById('patientnum').value); // Number of patients
  var productivityPercentage = parseFloat(document.getElementById('increaseConversionPercentageSlider').value) / 100; // Increase percentage
  var avgConsultation = parseFloat(document.getElementById("avConsultation").value)

  // Calculate initial productivity
  // var initialProductivity = perPx * patientNum;
  

  // Calculate the increase by an extra percentage
  // var increaseByPercentage = initialProductivity * productivityPercentage;

  // Total productivity after the increase
  var totalProductivity =  patientNum * productivityPercentage * (perPx - avgConsultation)

  document.getElementById('resultIncreaseProductivity').textContent = totalProductivity.toFixed(2);

  console.log('Updated Calculate Productivity with new formula');
}

function calculateConsultationIncome() {
  var increaseFee = parseFloat(document.getElementById('increaseFeeSlider').value);
  // Implement calculation logic here
  var numberOfPatients = parseFloat(document.getElementById('patientnum').value);
  var resultOfIncrease = (increaseFee * numberOfPatients).toFixed(2);
  document.getElementById('resultIncreaseFeeForPatients').textContent = resultOfIncrease;
  
}

// function calculateMultipleSales() {
//   var totalSales = parseFloat(document.getElementById('totalSales').value); // Total sales amount
//   var numberOfPatients = parseFloat(document.getElementById('patientnum').value); // Number of patients
//   var dollarPerPerson = totalSales / numberOfPatients; // Calculate $ per person if not directly provided
//   var increasedValuePercentage = parseFloat(document.getElementById('multipleSalesSlider').value);
//   var resultOfIncrease = (dollarPerPerson * increasedValuePercentage * numberOfPatients).toFixed(2);
//   document.getElementById('resultMultipleSales').textContent = resultOfIncrease;
  
//   // Implement calculation logic here

  

// }


function calculateMultipleSales() {
  var perPx = parseFloat(document.getElementById('perPx').value); // Cost per patient
  var patientNum = parseFloat(document.getElementById('patientnum').value); // Number of patients
  var increasedValuePercentage = parseFloat(document.getElementById('multipleSalesSlider').value) / 100; // Convert to decimal for percentage calculation
  var avgConsultation = parseFloat(document.getElementById("avConsultation").value)

  
  // Calculate the initial sales before the increase
  // var initialSales = perPx * patientNum;
  
  // Calculate the increase by applying the extra percentage
  // var increaseByExtraPercentage = initialSales * increasedValuePercentage;
  
  // Calculate the final total after adding the extra percentage increase
  var totalSalesWithIncrease = (patientNum * increasedValuePercentage) * (perPx - avgConsultation )
  document.getElementById('resultMultipleSales').textContent = totalSalesWithIncrease.toFixed(2);
}

function calculateTotalPotentialIncrease() {
  console.log("Calculate All button clicked");
 
  // Assume each calculation function has already run and updated the DOM
  var increaseNumberOfPatients = parseFloat(document.getElementById('resultIncreaseNumberOfPatients').textContent) || 0;
  var increaseIncome = parseFloat(document.getElementById('resultIncome').textContent) || 0;
  var increaseProductivity = parseFloat(document.getElementById('resultIncreaseProductivity').textContent) || 0;
  var increaseFeeForPatients = parseFloat(document.getElementById('resultIncreaseFeeForPatients').textContent) || 0;
  var multipleSales = parseFloat(document.getElementById('resultMultipleSales').textContent) || 0;
  var avgConsultation = parseFloat(document.getElementById("avConsultation").value)


  // Sum up all the results to calculate the total potential increase
  var totalPotentialIncrease = increaseNumberOfPatients + increaseIncome + increaseProductivity + increaseFeeForPatients + multipleSales;

  document.getElementById('totalPotentialIncrease').textContent = totalPotentialIncrease.toFixed(2);
  console.log(totalPotentialIncrease);
}



