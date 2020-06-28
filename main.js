//===================================================
// Form initialization fucntion with various tweaks
// settings, default value and others
//===================================================
function initForms() {
  // Enabling tooltip
  $("[data-toggle=tooltip]").tooltip();
  // Getting some icons to add into the input element
  var dollarSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    `;
  var textSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
    `;

  var calendarSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    `;
  var downArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
    `;
  var percentSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-percent"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
    `;
  var dayIcon = `days`;

  // Adding icons to the input element
  $(".text-icon").html(textSign);
  $(".dollar-icon").html(dollarSign);
  $(".calendar-icon").html(calendarSign);
  $(".down-arrow-icon").html(downArrow);
  $(".percent-icon").html(percentSign);
  $(".day-icon").html(dayIcon);

  // Setting default number input value
  $("input[type=number]").attr("value", "0.00");
  $(".days-wrapper input").attr("value", "0");
  $("#overnight-shipping").attr("value", "10.77");
  $("#seller-closing-fee").attr("value", "175.00");
  $("#title-commitment-binder").attr("value", "50.00");
  $("#title-search-fee").attr("value", "250.00");
  $("#document-prep").attr("value", "75.00");
  $("#courier-others").attr("value", "35.00");
  $("#record-service").attr("value", "30.00");

  // If user accidentaly leave an input box empty
  // Then zero will be added automatically
  // to numbered input value
  $("input[type=number]").on("change", function () {
    if (this.value == "" || this.value == 0) {
      this.value = "0.00";
    }
  });

  // Enable second half tax input based on
  // Current tax paid field value
  $("#select-current-tax").on("change", function () {
    if ($(this).val() == "No") {
      $("#second-half-tax").removeAttr("readonly");
    } else {
      $("#second-half-tax").val("0.00");
      $("#second-half-tax").attr("readonly", "");
      $("#calc-second-half-tax").val("0.00");
    }
  });

  // Adding county data to county selection dropdown
  let countyDropdown = $("#select-county");
  for (county of COUNTIES) {
    let name = county.name;
    let option = `<option value="${name.toLowerCase()}">${name}</option>`;
    countyDropdown.append(option);
  }
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===============================================================
// Function to implement tabbed view layout
//===============================================================
function tabbedView() {
  let activeTab = 1; //Setting active tab, it always first tab
  let tabCount = $(".calc-section").length; // Getting the count of sections to implement the view

  // Setting the dynamic form height
  // based on current initial section height
  // as the section is absolutely positioned
  let form = $("#net_sheet_form");
  let formHeight = $("#net_sheet_form").height(); //Initial height of the form
  let initialSectionHeight = $("#section-1").height(); //first section height as it is loaded first
  form.height(initialSectionHeight + formHeight); // Set the form height on initial load

  $(".tab-nav-btn").on("click", function (e) {
    e.preventDefault();

    $(window).scrollTop(0);

    // After clicking nav button it will go the next section
    // or previous section, so before going anywhere
    // last section's height should be removed from the form height
    let lastSectionHeight = $(`#section-${activeTab}`).height(); // Get the current section's height, will be used as last section's height later

    // After clicking nav button, current section should be hidden
    // Active indicator class should be removed
    $(`#section-${activeTab}`).css({ opacity: 0 });
    $(`#section-${activeTab}`).css("z-index", "-999");
    $(".indicator-btn").removeClass("indicator-active");

    // Checking an validating the button actions
    // and updating the active section variable
    // to update the view

    switch (true) {
      case $(this).data("target") == "next":
        if (activeTab < tabCount) activeTab += 1;
        break;
      case $(this).data("target") == "back":
        if (activeTab > 1) activeTab -= 1;
        break;
    }

    // Convert next button to submit button based on third section
    if (activeTab > 2) {
      $("#tab-next").attr("type", "submit");
      $("#tab-next").attr("onclick", "calculateAll()");
      $("#tab-next").html(`Calculate <i class="fas fa-check-circle"></i>`);
    } else {
      $("#tab-next").removeAttr("type");
      $("#tab-next").removeAttr("onclick");
      $("#tab-next").html(`Next <i
      class="fas fa-arrow-circle-right"></i>`);
    }

    // After updating the active section variable
    // Its time to update the view
    // Dynamic form height, new indicator class
    $(`#section-${activeTab}`).css({ opacity: 1 });
    $(`#section-${activeTab}`).css("z-index", 999);
    let newFormHeight =
      $("#net_sheet_form").height() +
      $(`#section-${activeTab}`).height() -
      lastSectionHeight;
    $("#net_sheet_form").height(newFormHeight);
    $(`#indicator-btn-${activeTab}`).addClass("indicator-active");
  });

  $(window).on("resize", function (e) {
    let activeHeight = $(`#section-${activeTab}`).height();
    $("#net_sheet_form").height(formHeight + activeHeight);
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//=========================
// Document ready function
//=========================
$(function () {
  initForms();
  tabbedView();

  $("button[type=download]").on("click", function (e) {
    // doc.save(`Seller_net_sheet.pdf`);
    e.preventDefault();
    // generate();

    var pdf = new jsPDF("p", "pt", "letter");
    html2canvas(document.querySelector("#main-result-body")).then((canvas) => {
      document.body.appendChild(canvas);
    });
    pdf.addHTML(document.querySelector("#canvas"), function () {
      pdf.save("Test.pdf");
    });
  });
});
