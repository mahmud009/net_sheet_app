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

//Helper function used in dynamic value function
//==============================================
function calcDueDays(input) {
  let date = new Date(input);
  let month = date.getMonth();
  if (month > 5) {
    let newDate = new Date(date.getFullYear(), 6, 1); // year, month, day
    console.log(newDate);
    let timeDiff = Math.abs(newDate.getTime() - date.getTime());
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(dayDiff + 181);

    
  }
}

//===================================================
// Setting dynamic values based on initial input
//===================================================
function settingDynamicValues() {
  // Dynamic sale value passed
  // from section-1 to section-2
  $("#sale-pcire").on("change", function (e) {
    let saleValue = $(this).val();
    let nextSaleValue = $("#calc-sales-price");
    nextSaleValue.val(saleValue);
  });

  $("#closing-date").on("change", function () {
    let dateValue = $(this).val();

    calcDueDays(dateValue);
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

$(function () {
  settingDynamicValues();
});
