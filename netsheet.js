//Helper function insert some dynamic field to the result
//=======================================================
function resultNewField(fieldName, fieldId) {
  let template = `
  <tr>
                                    <td class="particular-name" colspan="2">${fieldName}:</td>
                                    <td class="dollar-sign" style="text-align: right;"></td>
                                    <td class="particular-amount" id="${fieldId}"
                                        style="text-align: right;"></td>
                                </tr>
 `;
  return $(template);
}
//xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx

//Helper function used in dynamic value function
// Calculating title policy included in section-2
//==============================================
function titlePolicyCalc(price) {
  let insurance = 0;
  let perThousand = 0;

  switch (true) {
    case price <= 150000:
      perThousand = 5.75;
      break;

    case price > 150000 && price <= 250000:
      insurance = 862.5;
      perThousand = 4.5;
      price = price - 150000;
      break;

    case price > 250000 && price <= 500000:
      insurance = 1312.5;
      perThousand = 3.5;
      price = price - 250000;
      break;

    case price > 500000:
      insurance = 2187.5;
      perThousand = 2.75;
      price = price - 500000;
      break;
  }

  let result = insurance + (price / 1000) * perThousand;
  result = (result * 115) / 100;
  return result;
}
//xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx

//total 2 Helper function used in dynamic value function
// Calculating tax days
// according to financial year
//==============================================
function calctaxdays(input) {
  let parser = Date.parse(input);

  var parts = input.match(/(\d+)/g);

  let date;
  if (parts != null) {
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    date = new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based

    // Calcualte the close date
    if (date.getMonth() == 11 || date.getMonth() <= 4) {
      $("#tax-period-a").text("First Half");
      $("#tax-period-b").text("First Half");
    } // if jan-jun = first
    else if (date.getMonth() >= 5 && date.getMonth() <= 10) {
      $("#tax-period-a").text("Second Half");
      $("#tax-period-b").text("Second Half");
    } // if jul-dec = second

    var clsDate = new Date();
    clsDate.setYear(date.getFullYear());
    clsDate.setMonth(date.getMonth());
    clsDate.setDate(date.getDate());
    // Calcualte the closest half-year date
    var postDate = new Date();
    postDate.setYear(date.getFullYear());
    if (date.getMonth() >= 6) {
      postDate.setMonth(6);
      postDate.setDate(1);
    } else {
      postDate.setMonth(0);
      postDate.setDate(1);
    }
    //alert('postdate: ' + postDate);
    // Calcualte the difference
    var datediff;
    datediff = days_between(postDate, clsDate);
    $("#date-preview").html(`
      <span>Tax Proration dates : from ${
        postDate.getMonth() + 1
      }/${postDate.getDate()}/${postDate.getFullYear()} to ${
      clsDate.getMonth() + 1
    }/${clsDate.getDate()}/${clsDate.getFullYear()}, Total : ${datediff} Days</span>
    `);
    //alert('totdays: ' + datediff);
    // Add 6 months for the delay
    datediff = datediff + 182;
    //alert('totdays plus six months: ' + datediff);
    // $("#pro-ration-due").val(datediff);
    return Math.round(datediff);
  }
}

function days_between(date1, date2) {
  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to days and return
  return Math.round(difference_ms / ONE_DAY);
}

//xxxxxxxxxxxxxxx--End of 2 helper function--xxxxxxxxxxxxxxxxxxxxxxxx

// Helper function to calculate days with leap year
//===================================================
function computeDays(formDate) {
  var month, day, year, eoy, boy, closedate, datediff, taxperday;
  //form.s_documentation.value = formatNum(Number(form.s_documentation.value.replace(/,/g,'')));
  //form.s_documentation.value = formatNum(200);
  //form.s_taxsvcfee.value = formatNum(50);
  //form.s_taxsvcfee.value= "12.00";
  let date = new Date(formDate);
  month = date.getMonth() + 1;
  day = date.getDay() + eval(1);
  year = date.getFullYear() + eval(1997);
  today = new Date();
  eoy = new Date(year, 11, 31);
  boy = new Date(year, 0, 1);
  closedate = new Date(year, month, day);
  datediff = closedate - boy; //difference in millisecs
  datediff = Math.round(datediff / 86400000); //diff in days
  // if the close date is in a leap year then calc taxperday based on 366 days, else 365
  // diffing the date gives one day less than actual, so compare to 365 and 364
  if ((eoy - boy) / 86400000 == 366 - 1) return 366;
  // days should be 365 - 1
  else return 365;
  // PLUS ONE TO INCLUDE THE ACTUAL CLOSING DAY
  //form.s_taxproration.value = formatNum(taxperday * (datediff + 1));
}

//xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// Setting dynamic values based on initial input
//===================================================
function settingDynamicValues() {
  // Dynamic sale value passed
  // from section-1 to section-2 sales value
  $("#sale-price").on("change", function (e) {
    let saleValue = $(this).val();
    $("#calc-sales-price").val(saleValue);
    $("#title-policy").val(titlePolicyCalc(saleValue).toFixed(2));
  });

  // Value passed from section-1 second half tax
  // to section-2 second-half tax
  $("#second-half-tax").on("change", function () {
    $("#calc-second-half-tax").val($(this).val());
  });

  // Annual and monthly tax vice versa calculation
  // in the section-1, annual make monthly and
  // monthly make annual
  $("#monthly-tax").on("change", function (e) {
    e.preventDefault();
    let value = ($(this).val() * 12).toFixed(2);
    $("#annual-tax").val(value);
  });

  $("#annual-tax").on("change", function () {
    let value = ($(this).val() / 12).toFixed(2);
    $("#monthly-tax").val(value);
  });

  // Real estate fee selling side vice versa calculation
  // percent will make amount, amount will make percent
  $("#s-estate-fee-amount").on("change", function (e) {
    e.preventDefault();
    let salesValue = $("#calc-sales-price").val();
    let feeAmount = $(this).val();
    let percentage = ((feeAmount / salesValue) * 100).toFixed(2);
    $("#s-estate-fee-percent").val(percentage);
  });

  $("#s-estate-fee-percent").on("change", function (e) {
    let salesValue = $("#calc-sales-price").val();
    let feePercentage = $(this).val();
    let amount = ((salesValue * feePercentage) / 100).toFixed(2);
    $("#s-estate-fee-amount").val(amount);
  });

  // Real estate fee listing side vice versa calculation
  // percent will make amount, amount will make percent
  $("#l-estate-fee-amount").on("change", function (e) {
    e.preventDefault();
    let salesValue = $("#calc-sales-price").val();
    let feeAmount = $(this).val();
    let percentage = ((feeAmount / salesValue) * 100).toFixed(2);
    $("#l-estate-fee-percent").val(percentage);
  });

  $("#l-estate-fee-percent").on("change", function (e) {
    let salesValue = $("#calc-sales-price").val();
    let feePercentage = $(this).val();
    let amount = ((salesValue * feePercentage) / 100).toFixed(2);
    $("#l-estate-fee-amount").val(amount);
  });

  // Calculate pro-ration due based on closing
  // date using calctaxdays() helper function
  $("#closing-date").on("change", function () {
    let dateValue = $(this).val();
    $("#pro-ration-due").val(calctaxdays(dateValue));
  });

  // Dynamic transfer/conveyance fees
  // according to county data
  $("#sale-price, #select-county").on("change", function () {
    let county = $("#select-county").val();
    let salesValue = $("#sale-price").val();
    let countyMap = COUNTIES.map((m) => m.name.toLowerCase());
    let countyCode = countyMap.includes(county)
      ? COUNTIES.filter((m) => m.name.toLowerCase() === county)[0].code
      : 0;

    if (salesValue > 0 && countyCode > 0) {
      let value = (salesValue / 1000) * countyCode;
      $("#transfer-fees").val(value.toFixed(2));
    } else {
      $("#transfer-fees").val("0.00");
    }
  });

  // Dynamic property tax proration on section-2
  // from Annual property tax
  $("#annual-tax, #monthly-tax, #pro-ration-due, #closing-date").on(
    "change",
    function () {
      let annualTax = $("#annual-tax").val();
      let days = $("#pro-ration-due").val();
      let value = (annualTax / 365) * days;

      if (annualTax > 0 && days > 0) {
        $("#tax-proration").val(value.toFixed(2));
      } else {
        $("#tax-proration").val("0.00");
      }
    }
  );

  //Dynamic second half tax field insert on
  // section-4 based on second-half tax;
  $("#second-half-tax, #select-current-tax").on("change", function () {
    if ($("#second-half-tax").val() > 0) {
      resultNewField("Second Half Tax", "cnt-calc-second-half-tax").insertAfter(
        $("#second-half-tax-insertable")
      );
    } else {
      $("#cnt-calc-second-half-tax").parents("tr").remove();
    }
  });

  //Reusable cost field name
  //transfer to the result
  $(".reusable-cost-name").on("change", function () {
    if ($(this).val() != "") {
      resultNewField(
        $(this).val(),
        `cnt-reusable-cost-${$(this).data("index")}`
      ).insertAfter($("#reusable-cost-insertable"));
    } else {
      $(`#cnt-reusable-cost-${$(this).data("index")}`)
        .parents("tr")
        .remove();
    }
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// Result sheet generator function
//===================================================
function resultSheetGenerate() {
  let elementsToCalculate = [
    $("#prepared-by"),
    $("#seller-name"),
    $("#property-address"),
    $("#seller-contact"),
    $("#calc-sales-price"),
    $("#mortgage-balance-1"),
    $("#mortgage-balance-2"),
    $("#transfer-fees"),
    $("#tax-proration"),
    $("#calc-second-half-tax"),
    $("#title-policy"),
    $("#s-estate-fee-amount"),
    $("#l-estate-fee-amount"),
    $("#seller-closing-fee"),
    $("#title-commitment-binder"),
    $("#title-search-fee"),
    $("#document-prep"),
    $("#courier-others"),
    $("#record-service"),
    $("#home-warranty"),
    $("#gas-line"),
    $("#overnight-shipping"),
    $("#additional-cost"),
    $("#reusable-cost-1"),
    $("#reusable-cost-2"),
    $("#reusable-cost-3"),
    $("#wire-transfer-fees"),
  ];

  let idMap = elementsToCalculate.map((m) => {
    return m.attr("id");
  });

  for (id of idMap) {
    let value = $(`#${id}`).val();
    let alpha = /[a-z]|[A-Z]/;
    let resultElement = $("#main-result-body").find(`#cnt-${id}`);

    if (!alpha.test(value)) {
      resultElement.text(accounting.formatMoney(value));
    } else {
      resultElement.text(value);
    }

    switch (true) {
      case $("#cnt-seller-contact").text() == "$ 0.00":
        $("#cnt-seller-contact").text("-");
        break;
      case $("#cnt-seller-name").text() == "$ 0.00":
        $("#cnt-seller-name").text("-");
        break;
      case $("#cnt-prepared-by").text() == "$ 0.00":
        $("#cnt-prepared-by").text("-");
      case $("#cnt-property-address").text() == "$ 0.00":
        $("#cnt-property-address").text("-");
    }
  }

  $("#cnt-seller-contact").text($("#seller-contact").val());
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// Final calculation function
//===================================================

function calculateAll() {
  // Initialize Result Sheet
  resultSheetGenerate();

  //Sales and mortgage values
  let saleValue = Number($("#calc-sales-price").val());
  let mortgages = [
    Number($("#mortgage-balance-1").val()),
    Number($("#mortgage-balance-2").val()),
  ];

  //Costs to be included
  let costs = [
    Number($("#transfer-fees").val()),
    Number($("#tax-proration").val()),
    Number($("#calc-second-half-tax").val()),
    Number($("#title-policy").val()),
    Number($("#s-estate-fee-amount").val()),
    Number($("#l-estate-fee-amount").val()),
    Number($("#seller-closing-fee").val()),
    Number($("#title-commitment-binder").val()),
    Number($("#title-search-fee").val()),
    Number($("#document-prep").val()),
    Number($("#home-warranty").val()),
    Number($("#gas-line").val()),
    Number($("#overnight-shipping").val()),
    Number($("#additional-cost").val()),
    Number($("#reusable-cost-1").val()),
    Number($("#reusable-cost-2").val()),
    Number($("#reusable-cost-3").val()),
    Number($("#courier-others").val()),
    Number($("#record-service").val()),
    Number($("#wire-transfer-fees").val()),
  ];

  let expenses = costs.reduce((a, b) => a + b);
  let mortgage_sum = mortgages.reduce((a, b) => a + b);
  let equity = saleValue - expenses - mortgage_sum;

  $("#selling-expenses").text(
    accounting.formatMoney(expenses.toFixed(2), {
      symbol: "",
    })
  );
  $("#selling-equity").text(
    accounting.formatMoney(equity.toFixed(2), {
      symbol: "",
    })
  );
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// Main calculation form submit action
//===================================================
function mainFormSubmit() {
  $(".form-button-group").on(
    "click",
    $("#net_sheet_form button[type=submit]"),
    function (e) {
      e.preventDefault();
      console.log("submmitted");
      calculateAll();
    }
  );
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// Removing unwanted required warning for dynamically
// generated fields
//===================================================
function removeUnwantedWarning() {
  let allRequired = $(".required");
  $("input, select").on("change", function () {
    for (field of allRequired) {
      let value = $(field).val();
      if (!isEmpty(value)) {
        $(field).removeClass("not-validated");
        $(field).siblings(".validation-error-msg").remove();
      }
    }
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// Function to show county in transfer / convenayance fees
//==========================================================
function showCountyInTransfer() {
  $("#select-county").on("change", function () {
    $("#transfer-fees")
      .parent(".field-wrapper")
      .siblings("label")
      .append(` <span id="county-view">(${$("#select-county").val()})</span>`);

    $("#cnt-transfer-fees")
      .siblings(".particular-name")
      .append(` <span id="county-view">(${$("#select-county").val()})</span>`);
  });
}

//===================================================
// jQuery Document ready function
//===================================================
$(function () {
  settingDynamicValues();
  mainFormSubmit();
  removeUnwantedWarning();
  showCountyInTransfer();
});
