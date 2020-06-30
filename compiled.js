"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

//===================================================
// Form initialization fucntion with various tweaks
// settings, default value and others
//===================================================
function initForms() {
  // Accounting Number formating settings
  accounting.settings = {
    currency: {
      symbol: " $",
      // default currency symbol is '$'
      format: "%v%s",
      // controls output: %s = symbol, %v = value/number (can be object: see below)
      decimal: ".",
      // decimal point separator
      thousand: ",",
      // thousands separator
      precision: 2, // decimal places
    },
    number: {
      precision: 0,
      // default precision on numbers is 0
      thousand: ",",
      decimal: ".",
    },
  }; // Enabling tooltip

  $("[data-toggle=tooltip]").tooltip(); // Getting some icons to add into the input element

  var dollarSign =
    '\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>\n    ';
  var textSign =
    '\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>\n    ';
  var calendarSign =
    '\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>\n    ';
  var downArrow =
    '\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>\n    ';
  var percentSign =
    '\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-percent"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>\n    ';
  var dayIcon = "days"; // Adding icons to the input element

  $(".text-icon").html(textSign);
  $(".dollar-icon").html(dollarSign);
  $(".calendar-icon").html(calendarSign);
  $(".down-arrow-icon").html(downArrow);
  $(".percent-icon").html(percentSign);
  $(".day-icon").html(dayIcon); // Setting the form wrapper opacity to 1
  // for smooth loading

  $("#main-form-wrapper").css("opacity", 1); // Setting default number input value

  $("input[type=number]").attr("value", "0.00");
  $(".days-wrapper input").attr("value", "0");
  $("#overnight-shipping").attr("value", "10.77");
  $("#seller-closing-fee").attr("value", "175.00");
  $("#title-commitment-binder").attr("value", "50.00");
  $("#title-search-fee").attr("value", "250.00");
  $("#document-prep").attr("value", "75.00");
  $("#courier-others").attr("value", "35.00");
  $("#record-service").attr("value", "30.00"); // If user accidentaly leave an input box empty
  // Then zero will be added automatically
  // to numbered input value

  $("input[type=number]").on("change", function () {
    if (this.value == "" || this.value == 0) {
      this.value = "0.00";
    }
  }); // Enable second half tax input based on
  // Current tax paid field value

  $("#select-current-tax").on("change", function () {
    if ($(this).val() == "No") {
      $("#second-half-tax").removeAttr("readonly");
    } else {
      $("#second-half-tax").val("0.00");
      $("#second-half-tax").attr("readonly", "");
      $("#calc-second-half-tax").val("0.00");
    }
  }); // Adding county data to county selection dropdown

  var countyDropdown = $("#select-county");

  var _iterator = _createForOfIteratorHelper(COUNTIES),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var county = _step.value;
      var name = county.name;
      var option = '<option value="'
        .concat(name.toLowerCase(), '">')
        .concat(name, "</option>");
      countyDropdown.append(option);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//===============================================================
// Function to implement tabbed view layout
//===============================================================

function tabbedView() {
  var activeTab = 1; //Setting active tab, it always first tab

  var tabCount = $(".calc-section").length; // Getting the count of sections to implement the view
  // Setting the dynamic form height
  // based on current initial section height
  // as the section is absolutely positioned

  var form = $("#net_sheet_form");
  var formHeight = $("#net_sheet_form").height(); //Initial height of the form

  var initialSectionHeight = $("#section-1").height(); //first section height as it is loaded first

  form.height(initialSectionHeight + formHeight); // Set the form height on initial load
  // Navigation back button inactive class
  //based on section

  if (activeTab < 2) {
    $("#tab-back").addClass("next-inactive");
  } else {
    $("#tab-back").removeClass("next-inactive");
  }

  $(".tab-nav-btn").on("click", function (e) {
    e.preventDefault(); // Scroll automatically to top after clicking
    // Nav buttons

    $(window).scrollTop(0); // After clicking nav button it will go the next section
    // or previous section, so before going anywhere
    // last section's height should be removed from the form height

    var lastSectionHeight = $("#section-".concat(activeTab)).height(); // Get the current section's height, will be used as last section's height later
    // After clicking nav button, current section should be hidden
    // Active indicator class should be removed

    $("#section-".concat(activeTab)).css({
      opacity: 0,
    });
    $("#section-".concat(activeTab)).css("z-index", "-999");
    $(".indicator-btn").removeClass("indicator-active"); // Checking an validating the button actions
    // and updating the active section variable
    // to update the view

    switch (true) {
      case $(this).data("target") == "next":
        if (activeTab < tabCount) activeTab += 1;
        break;

      case $(this).data("target") == "back":
        if (activeTab > 1) activeTab -= 1;
        break;
    } // Convert next button to submit button based on third section

    if (activeTab > 2) {
      $("#tab-next").attr("type", "submit");
      $("#tab-next").attr("onclick", "calculateAll()");
      $("#tab-next").html('Calculate <i class="fas fa-check-circle"></i>');
    } else {
      $("#tab-next").removeAttr("type");
      $("#tab-next").removeAttr("onclick");
      $("#tab-next").html(
        'Next <i\n      class="fas fa-arrow-circle-right"></i>'
      );
    } // Navigation next button inactive class
    //based on section

    if (activeTab > 3) {
      $("#tab-next").addClass("next-inactive");
    } else {
      $("#tab-next").removeClass("next-inactive");
    } // Navigation back button inactive class
    //based on section

    if (activeTab < 2) {
      $("#tab-back").addClass("next-inactive");
    } else {
      $("#tab-back").removeClass("next-inactive");
    } // After updating the active section variable
    // Its time to update the view
    // Dynamic form height, new indicator class

    $("#section-".concat(activeTab)).css({
      opacity: 1,
    });
    $("#section-".concat(activeTab)).css("z-index", 999);
    var newFormHeight =
      $("#net_sheet_form").height() +
      $("#section-".concat(activeTab)).height() -
      lastSectionHeight;
    $("#net_sheet_form").height(newFormHeight);
    $("#indicator-btn-".concat(activeTab)).addClass("indicator-active");
  }); // Fixing form height on window resize
  // Fixing result table address column padding on
  // Mobile device

  $(window).on("resize", function (e) {
    var activeHeight = $("#section-".concat(activeTab)).height();
    $("#net_sheet_form").height(formHeight + activeHeight);

    if ($(window).width() < 440) {
      $(".res-address").css("padding-left", "50px");
    } else {
      $(".res-address").css("padding-left", "100px");
    }
  });
} //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function enablePdfPrint() {
  // Enabling print button
  $("#btn-print").on("click", function (e) {
    e.preventDefault();
    printJS({
      printable: "result-contents",
      type: "html",
      css: ["style.css"],
    });
  });
  $("#btn-pdf").on("click", function (e) {
    e.preventDefault();
    xepOnline.Formatter.Format("result-contents", {
      render: "download",
      filename: "seller_net_sheet",
    }); // xepOnline.Formatter.Format("result-contents", {
    //   render: "base64",
    // });
    // $(document).on("xepOnlineStatus", function () {
    //   console.log("finished");
    // });
  });
  $("#btn-email").on("click", function (e) {
    e.preventDefault();
  });
}

function sendEmail() {
  $("#send-email-form").on("submit", function (e) {
    e.preventDefault();
    $("#send-email-modal").modal("hide"); // Email API Key
    // 193F79D80970CA34A7642B44C3E744CA1CFE1EDBAB47F21569137F6A3C5DA52AE5A87AD9B6FA5B5410E9F3D9F0574283
    // Security Token "a2cd447b-0977-4d4d-a376-c709f8682914"

    xepOnline.Formatter.Format("result-contents", {
      render: "none",
      filename: "seller_net_sheet",
    });
    Email.send({
      // SecureToken: "a2cd447b-0977-4d4d-a376-c709f8682914",
      // Port: "25",
      // TLS: "STARTTLS",
      Host: "smtp.mailtrap.io",
      Port: "25",
      Username: "4c680881b5ddb3",
      Password: "13354c0bca23b5",
      To: $("#email-address").val(),
      From: "mahmud.est@gmail.com",
      Subject: "This is the subject",
      Body: "And this is the body",
    }).then(function (message) {
      console.log(message);

      if (message == "OK") {
        var msg = "Mail send succesfull, please check your inbox";
        $("#mail-status .modal-body p").text(msg);
      } else {
        $("#mail-status .modal-body p").text(message);
      }

      $("#mail-status").modal();
    });
  });
} //=========================
// Document ready function
//=========================

$(function () {
  initForms();
  tabbedView();
  enablePdfPrint();
  sendEmail();
}); //Helper function insert some dynamic field to the result
//=======================================================

function resultNewField(fieldName, fieldId) {
  var template = '\n  <tr>\n                                    <td class="particular-name" colspan="2">'
    .concat(
      fieldName,
      ':</td>\n                                    <td class="dollar-sign" style="text-align: right;"></td>\n                                    <td class="particular-amount" id="'
    )
    .concat(
      fieldId,
      '"\n                                        style="text-align: right;"></td>\n                                </tr>\n '
    );
  return $(template);
} //xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx
//Helper function used in dynamic value function
// Calculating title policy included in section-2
//==============================================

function titlePolicyCalc(price) {
  var insurance = 0;
  var perThousand = 0;

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

  var result = insurance + (price / 1000) * perThousand;
  result = (result * 115) / 100;
  return result;
} //xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx
//Helper function used in dynamic value function
// Calculating date difference for calculation
// according to financial year
//==============================================

function calcDueDays(input) {
  var date = new Date(input);
  var month = date.getMonth();
  var years = [];

  for (var i = 2015; i <= 2030; i++) {
    years.push(i);
  }

  if (years.includes(date.getFullYear())) {
    var year = date.getFullYear();

    var _month = date.getMonth() + 1;

    var day = date.getDate();
    var calcDate;
    var diff;
    var format;

    switch (true) {
      case _month > 6:
        format = "".concat(7, "/", 1, "/", year);
        calcDate = new Date(format);
        diff =
          Math.floor(Math.abs(calcDate - date) / (1000 * 60 * 60 * 24)) + 182;
        break;

      case _month <= 6:
        format = "".concat(1, "/", 1, "/", year);
        calcDate = new Date(format);
        diff =
          Math.floor(Math.abs(calcDate - date) / (1000 * 60 * 60 * 24)) + 182;
        break;
    }

    return diff;
  } else {
    //Handle error
  }
} //xxxxxxxxxxxxxxx--End helper function--xxxxxxxxxxxxxxxxxxxxxxxx
//===================================================
// Setting dynamic values based on initial input
//===================================================

function settingDynamicValues() {
  // Dynamic sale value passed
  // from section-1 to section-2 sales value
  $("#sale-price").on("change", function (e) {
    var saleValue = $(this).val();
    $("#calc-sales-price").val(saleValue);
    $("#title-policy").val(titlePolicyCalc(saleValue).toFixed(2));
  }); // Value passed from section-1 second half tax
  // to section-2 second-half tax

  $("#second-half-tax").on("change", function () {
    $("#calc-second-half-tax").val($(this).val());
  }); // Annual and monthly tax vice versa calculation
  // in the section-1, annual make monthly and
  // monthly make annual

  $("#monthly-tax").on("change", function (e) {
    e.preventDefault();
    var value = ($(this).val() * 12).toFixed(2);
    $("#annual-tax").val(value);
  });
  $("#annual-tax").on("change", function () {
    var value = ($(this).val() / 12).toFixed(2);
    $("#monthly-tax").val(value);
  }); // Real estate fee selling side vice versa calculation
  // percent will make amount, amount will make percent

  $("#s-estate-fee-amount").on("change", function (e) {
    e.preventDefault();
    var salesValue = $("#calc-sales-price").val();
    var feeAmount = $(this).val();
    var percentage = ((feeAmount / salesValue) * 100).toFixed(2);
    $("#s-estate-fee-percent").val(percentage);
  });
  $("#s-estate-fee-percent").on("change", function (e) {
    var salesValue = $("#calc-sales-price").val();
    var feePercentage = $(this).val();
    var amount = ((salesValue * feePercentage) / 100).toFixed(2);
    $("#s-estate-fee-amount").val(amount);
  }); // Real estate fee listing side vice versa calculation
  // percent will make amount, amount will make percent

  $("#l-estate-fee-amount").on("change", function (e) {
    e.preventDefault();
    var salesValue = $("#calc-sales-price").val();
    var feeAmount = $(this).val();
    var percentage = ((feeAmount / salesValue) * 100).toFixed(2);
    $("#l-estate-fee-percent").val(percentage);
  });
  $("#l-estate-fee-percent").on("change", function (e) {
    var salesValue = $("#calc-sales-price").val();
    var feePercentage = $(this).val();
    var amount = ((salesValue * feePercentage) / 100).toFixed(2);
    $("#l-estate-fee-amount").val(amount);
  }); // Calculate pro-ration due based on closing
  // date using calDueDays() helper function

  $("#closing-date").on("change", function () {
    var dateValue = $(this).val();
    $("#pro-ration-due").val(calcDueDays(dateValue));
  }); // Dynamic transfer/conveyance fees
  // according to county data

  $("#sale-price, #select-county").on("change", function () {
    var county = $("#select-county").val();
    var salesValue = $("#sale-price").val();
    var countyMap = COUNTIES.map(function (m) {
      return m.name.toLowerCase();
    });
    var countyCode = countyMap.includes(county)
      ? COUNTIES.filter(function (m) {
          return m.name.toLowerCase() === county;
        })[0].code
      : 0;

    if (salesValue > 0 && countyCode > 0) {
      var value = (salesValue / 1000) * countyCode;
      $("#transfer-fees").val(value);
    } else {
      $("#transfer-fees").val("0.00");
    }
  }); // Dynamic property tax proration on section-2
  // from Annual property tax

  $("#annual-tax, #monthly-tax, #pro-ration-due, #closing-date").on(
    "change",
    function () {
      var annualTax = $("#annual-tax").val();
      var days = $("#pro-ration-due").val();
      var value = (annualTax / 365) * days;

      if (annualTax > 0 && days > 0) {
        $("#tax-proration").val(value.toFixed(2));
      } else {
        $("#tax-proration").val("0.00");
      }
    }
  ); //Dynamic second half tax field insert on
  // section-4 based on second-half tax;

  $("#second-half-tax, #select-current-tax").on("change", function () {
    if ($("#second-half-tax").val() > 0) {
      resultNewField("Second Half Tax", "cnt-calc-second-half-tax").insertAfter(
        $("#second-half-tax-insertable")
      );
    } else {
      $("#cnt-calc-second-half-tax").parents("tr").remove();
    }
  }); //Reusable cost field name
  //transfer to the result

  $(".reusable-cost-name").on("change", function () {
    if ($(this).val() != "") {
      resultNewField(
        $(this).val(),
        "cnt-reusable-cost-".concat($(this).data("index"))
      ).insertAfter($("#reusable-cost-insertable"));
    } else {
      $("#cnt-reusable-cost-".concat($(this).data("index")))
        .parents("tr")
        .remove();
    }
  });
} //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//===================================================
// Result sheet generator function
//===================================================

function resultSheetGenerate() {
  var elementsToCalculate = [
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
  var idMap = elementsToCalculate.map(function (m) {
    return m.attr("id");
  });

  var _iterator2 = _createForOfIteratorHelper(idMap),
    _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var id = _step2.value;
      var value = $("#".concat(id)).val();
      var alpha = /[a-z]|[A-Z]/;
      var resultElement = $("#main-result-body").find("#cnt-".concat(id));

      if (!alpha.test(value)) {
        resultElement.text(accounting.formatMoney(value));
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
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
} //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//===================================================
// Final calculation function
//===================================================

function calculateAll() {
  // Initialize Result Sheet
  resultSheetGenerate(); //Sales and mortgage values

  var saleValue = Number($("#calc-sales-price").val());
  var mortgages = [
    Number($("#mortgage-balance-1").val()),
    Number($("#mortgage-balance-2").val()),
  ]; //Costs to be included

  var costs = [
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
  var expenses = costs.reduce(function (a, b) {
    return a + b;
  });
  var mortgage_sum = mortgages.reduce(function (a, b) {
    return a + b;
  });
  var equity = saleValue - expenses - mortgage_sum;
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
} //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//===================================================
// jQuery Document ready function
//===================================================

$(function () {
  settingDynamicValues();
});
