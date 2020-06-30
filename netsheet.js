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

//Helper function used in dynamic value function
// Calculating date difference for calculation
// according to financial year
//==============================================
function calcDueDays(input) {
  let date = new Date(input);
  let month = date.getMonth();
  let years = [];
  for (let i = 2015; i <= 2030; i++) {
    years.push(i);
  }

  if (years.includes(date.getFullYear())) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let calcDate;
    let diff;
    let format;

    switch (true) {
      case month > 6:
        format = `${7}/${1}/${year}`;
        calcDate = new Date(format);
        diff =
          Math.floor(Math.abs(calcDate - date) / (1000 * 60 * 60 * 24)) + 182;
        break;

      case month <= 6:
        format = `${1}/${1}/${year}`;
        calcDate = new Date(format);
        diff =
          Math.floor(Math.abs(calcDate - date) / (1000 * 60 * 60 * 24)) + 182;
        break;
    }
    return diff;
  } else {
    //Handle error
  }
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
  // date using calDueDays() helper function
  $("#closing-date").on("change", function () {
    let dateValue = $(this).val();
    $("#pro-ration-due").val(calcDueDays(dateValue));
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
      $("#transfer-fees").val(value);
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
  alert("Generated front");
  let elementsToCalculate = [
    $("#prepared-by"),
    $("#seller-name"),
    $("#property-address"),
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
  ];

  let idMap = elementsToCalculate.map((m) => {
    return m.attr("id");
  });

  for (id of idMap) {
    let value = $(`#${id}`).val();
    let alpha = /[a-z]|[A-Z]/;
    let resultElement = $("#main-result-body").find(`#cnt-${id}`);

    if (!alpha.test(value)) {
      // resultElement.text(accounting.formatMoney(value));
      resultElement.text(value);
    } else {
      resultElement.text(value);
    }

    switch (true) {
      case $("#cnt-seller-name").text() == "0.00 $":
        $("#cnt-seller-name").text("-");
        break;
      case $("#cnt-prepared-by").text() == "0.00 $":
        $("#cnt-prepared-by").text("-");
      case $("#cnt-property-address").text() == "0.00 $":
        $("#cnt-property-address").text("-");
    }
  }
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
  ];

  let expenses = costs.reduce((a, b) => a + b);
  let mortgage_sum = mortgages.reduce((a, b) => a + b);
  let equity = saleValue - expenses - mortgage_sum;

  $("#selling-expenses").text(
    // accounting.formatMoney(expenses.toFixed(2), {
    //   symbol: "",
    // })
    expenses
  );
  $("#selling-equity").text(
    // accounting.formatMoney(equity.toFixed(2), {
    //   symbol: "",
    // })
    equity
  );
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===================================================
// jQuery Document ready function
//===================================================
$(function () {
  settingDynamicValues();
});
