$(function () {
  $("[data-toggle=tooltip]").tooltip();
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
  $(".text-icon").html(textSign);
  $(".dollar-icon").html(dollarSign);
  $(".calendar-icon").html(calendarSign);
  $(".down-arrow-icon").html(downArrow);
  $(".percent-icon").html(percentSign);

  $("input[type=number]").attr("value", "0.00");
  $("input[type=number]").on("change", function () {
    if (this.value == "" || this.value == 0) {
      this.value = "0.00";
    }
  });

  function tabbedButton() {
    let activeTab = 1;
    let tabCount = $(".calc-section").length;
    let formHeight = $("#net_sheet_form").height();
    $("#net_sheet_form").height($("#section-1").height() + formHeight);
    let currentFormHeight = $("#net_sheet_form").height();
    $(".tab-nav-btn").on("click", function (e) {
      e.preventDefault();
      let lastSectionHeight = $(`#section-${activeTab}`).height();
      $(`#section-${activeTab}`).css({ opacity: 0 });
      $(`#section-${activeTab}`).css("z-index", "-999");
      $(".indicator-btn").removeClass("indicator-active");

      switch (true) {
        case $(this).data("target") == "next":
          if (activeTab < tabCount) activeTab += 1;
          break;
        case $(this).data("target") == "back":
          if (activeTab > 1) activeTab -= 1;
          break;
      }

      $(`#section-${activeTab}`).css({ opacity: 1 });
      $(`#section-${activeTab}`).css("z-index", 999);

      let newFormHeight =
        $("#net_sheet_form").height() +
        $(`#section-${activeTab}`).height() -
        lastSectionHeight;
      $("#net_sheet_form").height(newFormHeight);

      $(`#indicator-btn-${activeTab}`).addClass("indicator-active");
    });
  }

  tabbedButton();
});
