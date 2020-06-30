function computeForm(form) {
  var i = 0;
  form.s_purchaseprice.value = formatNum(
    Number(form.purchaseprice.value.replace(/,/g, ""))
  );
  computeTitleInsAndEscrow(form);
  CalculatePropTax(form);
  recalcRealEstateFees(form);
  var CountyArgs = form.CountyMultiplier.value.replace(/,/g, "");
  var CountyArray = CountyArgs.split("|");

  // calculate and autoplug Transfer Fee
  form.s_recfee.value = formatNum(
    (Number(form.purchaseprice.value.replace(/,/g, "")) / 1000) *
      Number(CountyArray[0])
  );

  //calculate Unpaid Taxes entry
  form.s_halftaxdue.value = formatNum(
    Number(document.netsheet.TaxUnpaid.value.replace(/,/g, ""))
  );

  //show prorated days on second part of form
  document.getElementById("proration").innerText = form.taxabledaysdue.value;

  //calculate and autoplug Title Search Fee
  if (CountyArray[1] == "X") {
    form.s_searchfee.value = formatNum(250);
  } // Knox
  else {
    form.s_searchfee.value = formatNum(250);
  } // All Other Counties

  // calculate and plug Seller Close Fee
  if (CountyArray[1] == "X") {
    form.s_sellclosefee.value = formatNum(175);
  } // Knox
  if (CountyArray[1] == "Y") {
    form.s_sellclosefee.value = formatNum(175);
  } // Yellow Zone
  if (CountyArray[1] == "B") {
    form.s_sellclosefee.value = formatNum(175);
  } // Blue Zone
  if (CountyArray[1] == "R") {
    form.s_sellclosefee.value = formatNum(175);
  } // Red Zone
}

function init() {
  var d = new Date();
  document.netsheet.day.selectedIndex = d.getDate();
  document.netsheet.month.selectedIndex = d.getMonth() + 1;
  document.netsheet.year.selectedIndex = d.getYear();
  document.netsheet.taxabledaysdue.value = calctaxdays(netsheet);
}

function MM_findObj(n, d) {
  //v4.01
  var p, i, x;
  if (!d) d = document;
  if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
    d = parent.frames[n.substring(p + 1)].document;
    n = n.substring(0, p);
  }
  if (!(x = d[n]) && d.all) x = d.all[n];
  for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
  for (i = 0; !x && d.layers && i < d.layers.length; i++)
    x = MM_findObj(n, d.layers[i].document);
  if (!x && d.getElementById) x = d.getElementById(n);
  return x;
}

function getsellers() {
  tblChoice1.style.display = "none";
  tblChoice3.style.display = "";
}

function resetforms() {
  document.getElementById("tblChoice1").style.display = "center";
  document.getElementById("tblChoice3").style.display = "center";
}

function popminiwin() {
  mywindow = window.open(
    "DiscountDetails.htm",
    "details",
    "location=0,status=0,scrollbars=0,toolbar=0,width=300,height=300"
  );
}

function popminiwin2() {
  mywindow = window.open(
    "TaxDaysDetails.htm",
    "details",
    "location=0,status=0,scrollbars=0,toolbar=0,width=300,height=300"
  );
}

function CalculatePropTax(form) {
  var TaxAmount = parseFloat(Number(form.taxes.value.replace(/,/g, "")));
  var ClosingYear = parseFloat(Number(form.year.value.replace(/,/g, "")));
  var ClosingMonth = parseFloat(Number(form.month.value.replace(/,/g, "")));
  var ClosingDay = parseFloat(Number(form.day.value.replace(/,/g, "")));
  var uuTaxdays = parseFloat(
    Number(form.taxabledaysdue.value.replace(/,/g, ""))
  );
  var TaxDays = 0;
  var TaxPerDiem = 0;
  var TotalTax = 0;
  if (isNaN(TaxAmount)) {
    TaxAmount = 0;
  }
  if (isNaN(ClosingMonth)) {
    ClosingMonth = 0;
  }
  if (isNaN(ClosingDay)) {
    ClosingDay = 0;
  }
  if (TaxAmount > 0) {
    TaxPerDiem = Math.ceil((TaxAmount / 365) * 10000) / 10000;
    //alert('going to calc taxes at ' + TaxPerDiem + ' per day');
    //TaxDays = calctaxdays(form);
    TaxDays = uuTaxdays;
    //alert('calced tax days : ' + TaxDays);
    TotalTax = TaxDays * TaxPerDiem;
    TotalTax = Math.ceil(TotalTax * 100) / 100;
    form.s_proptaxdue.value = TotalTax;
  } else {
    if (TaxAmount <= 0) {
      alert("Please enter the Yearly Property Tax Amount.");
      form.taxes.focus();
    } else {
      if (ClosingMonth <= 0 || ClosingMonth > 12) {
        alert("Please enter the Closing Month between 1-12.");
        form.month.focus();
      } else {
        if (ClosingDay <= 0 || ClosingDay > 31) {
          alert("Please enter the Closing Day between 1-31.");
          form.day.focus();
        }
      }
    }
  }
}

function calctaxdays(form) {
  // Calcualte the close date   3/18/07
  if (
    document.netsheet.month.value == 11 ||
    document.netsheet.month.value <= 4
  ) {
    document.getElementById("halfa").innerText = "First";
    document.getElementById("halfb").innerText = "First";
  } // if jan-jun = first
  else if (
    document.netsheet.month.value >= 5 &&
    document.netsheet.month.value <= 10
  ) {
    document.getElementById("halfa").innerText = "Second";
    document.getElementById("halfb").innerText = "Second";
  } // if jul-dec = second

  var clsDate = new Date();
  clsDate.setYear(parseFloat(Number(form.year.value.replace(/,/g, ""))));
  clsDate.setMonth(parseFloat(Number(form.month.value.replace(/,/g, ""))));
  clsDate.setDate(parseFloat(Number(form.day.value.replace(/,/g, ""))));
  // Calcualte the closest half-year date
  var postDate = new Date();
  postDate.setYear(parseFloat(Number(form.year.value.replace(/,/g, ""))));
  if (parseFloat(Number(form.month.value.replace(/,/g, ""))) >= 6) {
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
  //alert('totdays: ' + datediff);
  // Add 6 months for the delay
  datediff = datediff + 182;
  //alert('totdays plus six months: ' + datediff);
  document.netsheet.taxabledaysdue.value = datediff;
  return Math.round(datediff);
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
// inline code ---------------------------------
function toggleBox(szDivID, iState) {
  // 1 visible, 0 hidden
  var obj = document.layers
    ? document.layers[szDivID]
    : document.getElementById
    ? document.getElementById(szDivID).style
    : document.all[szDivID].style;
  obj.visibility = document.layers
    ? iState
      ? "show"
      : "hide"
    : iState
    ? "visible"
    : "hidden";
}

function jumpBox(list) {
  location.href = list.options[list.selectedIndex].value;
}

function formatNum(Vnum) {
  var originalNum = Vnum;
  if (Vnum < 0) Vnum = Vnum * -1;
  if (Vnum > 99000000) {
    alert("Sorry, this will not generate numbers larger that 99 million.");
    focus();
  } else {
    var V10million = parseInt(Vnum / 10000000);
    var V1million = (Vnum % 10000000) / 1000000;
    if (V1million / 1000000 == 1) {
      V1million = 1;
    } else if (V1million < 1) {
      V1million = "0";
    } else {
      V1million = parseInt(V1million, 10);
    }
    var V100thousand = (Vnum % 1000000) / 100000;
    if (V100thousand / 100000 == 1) {
      V100thousand = 1;
    } else if (V100thousand < 1) {
      V100thousand = "0";
    } else {
      V100thousand = parseInt(V100thousand, 10);
    }
    var V10thousand = (Vnum % 100000) / 10000;
    if (V10thousand / 10000 == 1) {
      V10thousand = 1;
    } else if (V10thousand < 1) {
      V10thousand = "0";
    } else {
      V10thousand = parseInt(V10thousand, 10);
    }
    var V1thousand = (Vnum % 10000) / 1000;
    if (V1thousand / 1000 == 1) {
      V1thousand = 1;
    } else if (V1thousand < 1) {
      V1thousand = "0";
    } else {
      V1thousand = parseInt(V1thousand, 10);
    }
    var Vhundreds = (Vnum % 1000) / 100;
    if (Vhundreds / 100 == 1) {
      Vhundreds = 1;
    } else if (Vhundreds < 1) {
      Vhundreds = "0";
    } else {
      Vhundreds = parseInt(Vhundreds, 10);
    }
    var Vtens = (Vnum % 100) / 10;
    if (Vtens / 10 == 1) {
      Vtens = 1;
    } else if (Vtens < 1) {
      Vtens = "0";
    } else {
      Vtens = parseInt(Vtens, 10);
    }
    var Vones = (Vnum % 10) / 1;
    if (Vones / 1 == 1) {
      Vones = 1;
    } else if (Vones < 1) {
      Vones = "0";
    } else {
      Vones = parseInt(Vones, 10);
    }
    var Vcents = 0;
    if ((Vnum % 1) * 100 < 1) {
      Vcents = 0;
    } else {
      //Vcents = parseInt(((eval(Vnum % 1) * 100)),10);  this doesn't work quite right... give 1 cent error
      Vcents = Math.round((Vnum % 1) * 100);
    }
    if (Vcents < 1) {
      Vcents = "00";
    } else if (Vcents % 10 == 0) {
      Vcents = Vcents + "0";
    } else if (Vcents % 10 == Vcents) {
      Vcents = "0" + Vcents;
    } else {
      Vcents = Vcents;
    }
    if (Vcents == "900") {
      Vcents = "90";
    } else if (Vcents == "800") {
      Vcents = "80";
    } else if (Vcents == "700") {
      Vcents = "70";
    } else if (Vcents == "600") {
      Vcents = "60";
    } else if (Vcents == "500") {
      Vcents = "50";
    } else if (Vcents == "400") {
      Vcents = "40";
    } else if (Vcents == "300") {
      Vcents = "30";
    } else if (Vcents == "200") {
      Vcents = "20";
    } else if (Vcents == "100") {
      Vcents = "10";
    } else {
      Vcents = Vcents;
    }
    var Vformat = "";
    if (Vnum >= 10000000) {
      Vformat =
        V10million +
        "" +
        V1million +
        "," +
        V100thousand +
        "" +
        V10thousand +
        "" +
        V1thousand +
        "," +
        Vhundreds +
        "" +
        Vtens +
        "" +
        Vones +
        "." +
        Vcents;
    } else if (Vnum >= 1000000) {
      Vformat =
        V1million +
        "," +
        V100thousand +
        "" +
        V10thousand +
        "" +
        V1thousand +
        "," +
        Vhundreds +
        "" +
        Vtens +
        "" +
        Vones +
        "." +
        Vcents;
    } else if (Vnum >= 100000) {
      Vformat =
        V100thousand +
        "" +
        V10thousand +
        "" +
        V1thousand +
        "," +
        Vhundreds +
        "" +
        Vtens +
        "" +
        Vones +
        "." +
        Vcents;
    } else if (Vnum >= 10000) {
      Vformat =
        V10thousand +
        "" +
        V1thousand +
        "," +
        Vhundreds +
        "" +
        Vtens +
        "" +
        Vones +
        "." +
        Vcents;
    } else if (Vnum >= 1000) {
      Vformat =
        V1thousand + "," + Vhundreds + "" + Vtens + "" + Vones + "." + Vcents;
    } else if (Vnum >= 100) {
      Vformat = Vhundreds + "" + Vtens + "" + Vones + "." + Vcents;
    } else if (Vnum >= 10) {
      Vformat = Vtens + "" + Vones + "." + Vcents;
    } else if (Vnum >= 1) {
      Vformat = Vones + "." + Vcents;
    } else {
      Vformat = "0." + Vcents;
    }
    if (originalNum < 0) Vformat = "-" + Vformat;
    return Vformat;
  }
}

function ShowTaxesPaid() {
  if (document.getElementById("tax_paid").checked) {
    TaxPaidBox.style.display = "none";
    TaxPaidTR.style.display = "none";
    document.netsheet.TaxUnpaid.value = "0.00";
  } else if (document.getElementById("tax_unpaid").checked) {
    TaxPaidBox.style.display = "";
    TaxPaidTR.style.display = "";
  }
}

function recalcRealEstateFees(form) {
  form.s_refeeselling.value = formatNum(
    Number(form.purchaseprice.value.replace(/,/g, "")) *
      (Number(form.s_refeesellingpct.value) / 100)
  );
  form.s_refeelisting.value = formatNum(
    Number(form.purchaseprice.value.replace(/,/g, "")) *
      (Number(form.s_refeelistingpct.value) / 100)
  );
}

function computeSellerTotals(form) {
  var tmptotal = 0;
  tmptotal += Number(form.s_docprep.value.replace(/,/g, ""));
  tmptotal += Number(form.s_recfee.value.replace(/,/g, ""));
  tmptotal += Number(form.s_halftaxdue.value.replace(/,/g, ""));
  tmptotal += Number(form.s_sellclosefee.value.replace(/,/g, ""));
  tmptotal += Number(form.s_titlebinderfee.value.replace(/,/g, ""));
  tmptotal += Number(form.s_insOwners.value.replace(/,/g, ""));
  tmptotal += Number(form.s_searchfee.value.replace(/,/g, ""));
  tmptotal += Number(form.s_refeeselling.value.replace(/,/g, ""));
  tmptotal += Number(form.s_refeelisting.value.replace(/,/g, ""));
  //tmptotal += Number(form.s_transfee.value.replace(/,/g, ""));
  //tmptotal += Number(form.s_survey.value.replace(/,/g, ""));
  tmptotal += Number(form.s_proptaxdue.value.replace(/,/g, ""));
  tmptotal += Number(form.s_pest.value.replace(/,/g, ""));
  tmptotal += Number(form.s_gaswar.value.replace(/,/g, ""));
  tmptotal += Number(form.s_shipfee.value.replace(/,/g, ""));
  tmptotal += Number(form.s_misc.value.replace(/,/g, ""));
  tmptotal += Number(form.s_custom1.value.replace(/,/g, ""));
  tmptotal += Number(form.s_custom2.value.replace(/,/g, ""));
  tmptotal += Number(form.s_custom3.value.replace(/,/g, ""));
  //tmptotal += Number(form.s_insOwnersDiscount.value.replace(/,/g, ""));
  form.s_totalsellingexp.value = formatNum(tmptotal);
  form.s_totalestequity.value = formatNum(
    Number(form.s_purchaseprice.value.replace(/,/g, "")) -
      tmptotal -
      Number(form.s_mortbal1.value.replace(/,/g, "")) -
      Number(form.s_mortbal2.value.replace(/,/g, ""))
  );
}

function getRadioByValue(radioButtonOrGroup, value) {
  if (!radioButtonOrGroup.length) {
    // single button
    if (radioButtonOrGroup.value == value) return radioButtonOrGroup;
    else return null;
  } else {
    for (var b = 0; b < radioButtonOrGroup.length; b++)
      if (radioButtonOrGroup[b].value == value) return radioButtonOrGroup[b];
    return null;
  }
}

function calcEscrow(amt) {
  var feeamt;
  feeamt = 45;
  feeamt += 3 * (amt / 1000);
  if (feeamt < 100.0) feeamt = 100.0;
  // cut calculated escrow fee in half to split between buyer & seller
  feeamt = feeamt / 2;
  if (feeamt % 1 > 0) {
    // Get the decimal value so it can be rounded.
    tmp = (feeamt % 1) * 100;
    tmp = Math.round(tmp) * 0.01;
    feeamt = feeamt - (feeamt % 1);
    feeamt = feeamt + tmp;
  }
  var cents = 0;
  if ((feeamt % 1) * 100 < 1) cents = "00";
  else cents = parseInt(eval(feeamt % 1) * 100, 10);
  var tmpAmt = feeamt - (feeamt % 1);
  var tmpStr = new String(tmpAmt);
  tmpStr = tmpStr + "." + cents;
  //if (feeamt >= 400)
  //	tmpStr = tmpStr + " or negotiable";
  return 269.0;
}

function computeTitleInsAndEscrow(form) {
  var rdpurchaceprice;
  var rdexistingtitleamt;
  var rdinsOwners;
  rdpurchaceprice = roundup(Number(form.purchaseprice.value.replace(/,/g, "")));

  //jss code start 6/22/2016
  rdinsOwners = TitleCalc(rdpurchaceprice);
  if (rdpurchaceprice <= 30000) {
    rdinsOwners = 175;
  }
  form.s_insOwners.value = rdinsOwners;
  // jss code ends

  //form.s_insOwners.value = TitleCalc(rdpurchaceprice);
  //rdexistingtitleamt = roundup(Number(form.existingtitleamt.value.replace(/,/g, '')));
  //form.s_insOwnersDiscount.value = DiscountTitleCalc(rdexistingtitleamt, rdpurchaceprice);
}

function roundup(value) {
  // round value up to the next 1000
  var retval;
  retval = value;
  if (value % 1000 > 0) {
    var tmp1 = value % 1000;
    var tmp2 = value - tmp1;
    retval = tmp2 + 1000;
  }
  return retval;
}

function calcIns(amt, type) {
  var insamt;
  var tmp;
  var strInsamt;
  var decLocation;
  var strLength;
  if (amt <= 10000) insamt = 200;
  else if (amt <= 30000) insamt = 200 + (6 * (amt - 10000)) / 1000;
  else if (amt <= 50000) insamt = 320 + (5.5 * (amt - 30000)) / 1000;
  else if (amt <= 100000) insamt = 430 + (3.5 * (amt - 50000)) / 1000;
  else if (amt <= 300000) insamt = 605 + (3 * (amt - 100000)) / 1000;
  else if (amt <= 1000000) insamt = 1205 + (2.25 * (amt - 300000)) / 1000;
  else if (amt <= 5000000) insamt = 2780 + (2 * (amt - 1000000)) / 1000;
  else if (amt <= 10000000) insamt = 10780 + (1.75 * (amt - 5000000)) / 1000;
  else insamt = 19530 + (1.25 * (amt - 10000000)) / 1000;
  if (type == "lend") insamt = insamt * 0.3 + 75;
  if (insamt % 1 > 0) {
    // Get the decimal value so it can be rounded.
    tmp = (insamt % 1) * 100;
    tmp = Math.round(tmp) * 0.01;
    insamt = insamt - (insamt % 1);
    insamt = insamt + tmp;
  }
  var cents = 0;
  if ((insamt % 1) * 100 < 1) cents = "00";
  else cents = parseInt(eval(insamt % 1) * 100, 10);
  var tmpAmt = insamt - (insamt % 1);
  var tmpStr = new String(tmpAmt);
  tmpStr = tmpStr + "." + cents;
  return tmpStr;
}

function TitleCalc(pp) {
  // Calc Ins based upon rates per 1000 per bracket
  var PurchasePrice = pp;
  var TitleInsurance = 0;
  var TempPurchasePrice = 0;
  if (PurchasePrice > 150000) {
    // if over 150K
    //Set price for first 150k
    TitleInsurance = 862.5;
    TempPurchasePrice = PurchasePrice - 150000;
    if (TempPurchasePrice > 100000) {
      //If over 250K
      //Set price for first 250k
      TitleInsurance = 1312.5;
      TempPurchasePrice = TempPurchasePrice - 100000;
      if (TempPurchasePrice > 250000) {
        //If over 500K
        //Set price for first 500k
        TitleInsurance = 2187.5;
        TempPurchasePrice = TempPurchasePrice - 250000;
        //Set price for over 500k to be 2.75 per 1000
        TempPurchasePrice = TempPurchasePrice / 1000;
        TitleInsurance = TitleInsurance + TempPurchasePrice * 2.75;
      }
      //If between 250 and 500K
      else {
        //Set price for over 150K / under 250K to be 3.50 per 1000
        TempPurchasePrice = TempPurchasePrice / 1000;
        TitleInsurance = TitleInsurance + TempPurchasePrice * 3.5;
      }
    }
    //If between 150 and 250K
    else {
      //Set price for over 150K / under 250K to be 4.50 per 1000
      TempPurchasePrice = TempPurchasePrice / 1000;
      TitleInsurance = TitleInsurance + TempPurchasePrice * 4.5;
    }
  }
  // if under 150K
  else {
    //Set price for under 150K 5.75 per 1000
    TempPurchasePrice = PurchasePrice / 1000;
    TitleInsurance = TempPurchasePrice * 5.75;
  }
  // Normalize and set form value
  TitleInsurance = Math.ceil(TitleInsurance * 115) / 100;
  return formatNum(TitleInsurance);
}

function DiscountTitleCalc(pp, discmax) {
  // Calc Ins based upon rates per 1000 per bracket
  var OrigTitleAmt = pp;
  var DiscountOnInsurance = 0;
  var TempDiscount = 0;
  if (OrigTitleAmt > discmax) {
    // if Orignal more than New, Set value to new for Discount calc
    OrigTitleAmt = discmax;
  }
  if (OrigTitleAmt > 150000) {
    // if over 150K
    //Set price for first 150k
    DiscountOnInsurance = 862.5;
    TempDiscount = OrigTitleAmt - 150000;
    if (TempDiscount > 100000) {
      //If over 250K
      //Set price for first 250k
      DiscountOnInsurance = 1312.5;
      TempDiscount = TempDiscount - 100000;
      if (TempDiscount > 250000) {
        //If over 500K
        //Set price for first 500k
        DiscountOnInsurance = 2187.5;
        TempDiscount = TempDiscount - 250000;
        //Set price for over 500k to be 2.75 per 1000
        TempDiscount = TempDiscount / 1000;
        DiscountOnInsurance = DiscountOnInsurance + TempDiscount * 2.75;
      }
      //If between 250 and 500K
      else {
        //Set price for over 150K / under 250K to be 3.50 per 1000
        TempDiscount = TempDiscount / 1000;
        DiscountOnInsurance = DiscountOnInsurance + TempDiscount * 3.5;
      }
    }
    //If between 150 and 250K
    else {
      //Set price for over 150K / under 250K to be 4.50 per 1000
      TempDiscount = TempDiscount / 1000;
      DiscountOnInsurance = DiscountOnInsurance + TempDiscount * 4.5;
    }
  }
  // if under 150K
  else {
    //Set price for under 150K 5.75 per 1000
    TempDiscount = OrigTitleAmt / 1000;
    DiscountOnInsurance = TempDiscount * 5.75;
  }
  // Take 30% Discount
  DiscountOnInsurance = DiscountOnInsurance * 0.3;
  // Make Negative
  DiscountOnInsurance = DiscountOnInsurance * (1 - 2);
  // Normalize and set form value
  DiscountOnInsurance = Math.ceil(DiscountOnInsurance * 100) / 100;
  return formatNum(DiscountOnInsurance);
}

function computeTaxMos(form) {}

function computeSeller(form) {
  var month, day, year, eoy, boy, closedate, datediff, taxperday;
  //form.s_documentation.value = formatNum(Number(form.s_documentation.value.replace(/,/g,'')));
  //form.s_documentation.value = formatNum(200);
  //form.s_taxsvcfee.value = formatNum(50);
  //form.s_taxsvcfee.value= "12.00";
  month = eval(form.month.selectedIndex);
  day = eval(form.day.selectedIndex) + eval(1);
  year = eval(form.year.selectedIndex) + eval(1997);
  today = new Date();
  eoy = new Date(year, 11, 31);
  boy = new Date(year, 0, 1);
  closedate = new Date(year, month, day);
  datediff = closedate - boy; //difference in millisecs
  datediff = Math.round(datediff / 86400000); //diff in days
  // if the close date is in a leap year then calc taxperday based on 366 days, else 365
  // diffing the date gives one day less than actual, so compare to 365 and 364
  if ((eoy - boy) / 86400000 == 366 - 1)
    taxperday = Number(form.taxes.value.replace(/,/g, "")) / 366;
  // days should be 365 - 1
  else taxperday = Number(form.taxes.value.replace(/,/g, "")) / 365;
  // PLUS ONE TO INCLUDE THE ACTUAL CLOSING DAY
  //form.s_taxproration.value = formatNum(taxperday * (datediff + 1));
}

function findMonth(form) {
  var tmpmonth;
  for (i = 0; i < form.month.length; i++) {
    if (form.month[i].selected) tmpmonth = form.month[i].value;
  }
  return tmpmonth;
}

function findDay(form) {
  var tmpday;
  for (i = 0; i < form.day.length; i++) {
    if (form.day[i].selected) tmpday = form.day[i].value;
  }
  return tmpday;
}

function findYear(form) {
  var tmpyear;
  for (i = 0; i < form.year.length; i++) {
    if (form.year[i].selected) tmpyear = form.year[i].value;
  }
  return tmpyear;
}
// retval=table: create a window with an amortization table
// retval=int: return the first payment's interest amount
function PrintSellersNetSheet(form) {
  var printable;
  pSeller = form.preparedforseller.value;
  printable = "<HTML>";
  printable =
    printable +
    "<HEAD><TITLE>Seller's Net Sheet</TITLE><style type='text/css'>.tdclss {font-family: Verdana;font-size: 12;}</style></HEAD>" +
    "<BODY BGCOLOR = '#FFFFFF'>";
  printable =
    printable +
    "<p align='center'><img src='/images/logo_netsheet.jpg'><br /><br /><br />";
  printable =
    printable +
    "<b><font size='4' face='Verdana'>Seller NetSheet</font></b></p>";
  printable =
    printable +
    "<TABLE WIDTH='575' BORDER='0' CELLPADDING='0' CELLSPACING='0' ALIGN='CENTER'>";
  printable = printable + "		<TR align='left'>";
  printable = printable + "			<TD>  ";
  printable =
    printable + "				<font face='Verdana' size='1'><b>PREPARED FOR:</b></font>";
  printable = printable + "			</TD>";
  printable = printable + "			<TD class='tdclss'>";
  printable = printable + "			    <b> " + form.preparedforseller.value + "</b>";
  printable = printable + "			</TD>";
  printable = printable + "		</TR>";
  printable = printable + "		<TR align='left'>";
  printable = printable + "			<TD>  ";
  printable =
    printable + "				<font face='Verdana' size='1'><b>PREPARED BY:</b></font>";
  printable = printable + "			</TD>";
  printable = printable + "			<TD class='tdclss'>";
  printable = printable + "			    <b> " + form.preparedby.value + "</b>";
  printable = printable + "			</TD>";
  printable = printable + "		</TR>";
  printable = printable + "		<TR align='left'>";
  printable = printable + "			<TD>  ";
  printable =
    printable + "				<font face='Verdana' size='1'><b>STREET ADDRESS:</b></font>";
  printable = printable + "			</TD>";
  printable = printable + "			<TD class='tdclss'>";
  printable = printable + "			    <b> " + form.propaddress.value + "</b>";
  printable = printable + "			</TD>";
  printable = printable + "		</TR>";
  printable = printable + "		<TR align='left'>";
  printable = printable + "			<TD colspan='2'>";
  printable = printable + "				<a name='top'> </a>";
  printable = printable + "			</TD>";
  printable = printable + "		</TR>";
  //SALES DETAILS HEADER ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable +
    "    <font face='Verdana' size='1'><b>SALES/FINANCING DETAILS</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  //PURCHASE PRICE
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable = printable + "       Sales Price:";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "         $ " + form.s_purchaseprice.value;
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  //1ST BAL
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "          Less Present 1st Mortgage Balance:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "            $ " + form.s_mortbal1.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  //2ND BAL
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "          Less Present 2nd Mortgage Balance:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "            $ " + form.s_mortbal2.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'> ";
  printable = printable + "        </TD>";
  //PROP TAX DETAILS HEADER ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable + "    <font face='Verdana' size='1'><b>TAXES</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  //TRANSFER FEES
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "          Transfer/Conveyance Fees:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  // Transfer fee
  printable = printable + "            $ " + form.s_recfee.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  printable = printable + "";
  // PROP TAX DUE
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Property Tax Proration:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_proptaxdue.value;
  printable =
    printable +
    "        &nbsp;&nbsp;&nbsp;&nbsp;(" +
    form.taxabledaysdue.value +
    " days)</TD>";
  printable = printable + "      </TR>";

  // BACK TAXES
  if (document.getElementById("tax_unpaid").checked) {
    printable = printable + "      <TR align='left'>";
    printable = printable + "        <td  class='tdclss'>  ";
    printable =
      printable +
      "          " +
      document.getElementById("halfa").innerText +
      " Half Tax Due:";
    printable = printable + "        </TD>";
    printable = printable + "        <TD class='tdclss'>";
    printable = printable + "          $ " + form.s_halftaxdue.value;
    printable = printable + "        </TD>";
    printable = printable + "      </TR>";
  }

  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'> ";
  printable = printable + "        </TD>";
  //TITLE INSURANCE ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable +
    "    <font face='Verdana' size='1'><b>TITLE INSURANCE</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  //TITLE POLICY
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "          Owners Title Policy:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "            $ " + form.s_insOwners.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  //TITLE POLICY DISCOUNT
  /*
    printable = printable + "      <TR align='left'>"
    printable = printable + "        <TD class='tdclss'>  "
    printable = printable + "          Reissue Discount:"
    printable = printable + "        </TD>"
    printable = printable + "        <TD class='tdclss'>"
    printable = printable + "            $ " + form.s_insOwnersDiscount.value
    printable = printable + "        </TD>"
    printable = printable + "      </TR>"
    */
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'> ";
  printable = printable + "        </TD>";
  //RE COMMISSIONS ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable +
    "    <font face='Verdana' size='1'><b>REAL ESTATE COMMISSIONS</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  // RE FEE LISTING
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Real Estate Fee (Listing Side):";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable =
    printable +
    "             " +
    form.s_refeesellingpct.value +
    "%   $" +
    form.s_refeeselling.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // RE FEE SELLING
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Real Estate Fee (Selling Side):";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable =
    printable +
    "             " +
    form.s_refeelistingpct.value +
    "%   $" +
    form.s_refeelisting.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'> ";
  printable = printable + "        </TD>";
  //TRANSACTION FEES ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable +
    "    <font face='Verdana' size='1'><b>TRANSACTION FEES</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  //SELLER CLOSING FEE
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Seller Closing Fee:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_sellclosefee.value;
  printable = printable + "        </TD>";
  //TITLE BINDER
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Title Binder:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_titlebinderfee.value;
  printable = printable + "        </TD>";
  //SEARCH FEE
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          * Title Search Fee:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_searchfee.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  //DOC PREP
  printable = printable + "      </TR>";
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "          Document Preparation (Deed):";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "            $ " + form.s_docprep.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  printable = printable + "";
  //HANDLING FEES
  /*
    printable = printable + "      <TR align='left'>"
    printable = printable + "        <td  class='tdclss'>  "
    printable = printable + "          Express Mail and Handling:"
    printable = printable + "        </TD>"
    printable = printable + "        <TD class='tdclss'>"
    printable = printable + "          $ " + form.s_transfee.value
    printable = printable + "        </TD>"
    printable = printable + "      </TR>"
    */
  //RECORDING SERVICE FEES
  /*
    printable = printable + "      <TR align='left'>"
    printable = printable + "        <td  class='tdclss'>  "
    printable = printable + "          Recording Service Fee:"
    printable = printable + "        </TD>"
    printable = printable + "        <TD class='tdclss'>"
    printable = printable + "          $ " + form.s_survey.value
    printable = printable + "        </TD>"
    printable = printable + "      </TR>"
    */
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD class='tdclss'>  ";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'> ";
  printable = printable + "        </TD>";
  //OTHER POSSIBLE FEES ----------------------------------------------
  printable = printable + "   <TR align='left'>";
  printable = printable + "     <TD class='tdclss'>  ";
  printable =
    printable +
    "    <font face='Verdana' size='1'><b>OTHER POSSIBLE FEES</b></font>";
  printable = printable + "     </TD>";
  printable = printable + "     <TD class='tdclss'>";
  printable = printable + "";
  printable = printable + "     </TD>";
  printable = printable + "   </TR>";
  // HOME WARRANTY INSPECTION
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Home Warranty:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_pest.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // GAS LINE INSPECTION
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Gas Line Warranty:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_gaswar.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";

  // Overnight Shipping Fee
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Overnight Shipping Fee:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_shipfee.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";

  // ADDITIONAL
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          Miscellaneous:";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_misc.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // CUSTOM COSTS
  if (
    form.s_custom1_text.value != "" &&
    form.s_custom1_text.value != "Add Cost"
  ) {
    printable = printable + "      <TR align='left'>";
    printable = printable + "        <td  class='tdclss'>  ";
    printable = printable + "          " + form.s_custom1_text.value + ":";
    printable = printable + "        </TD>";
    printable = printable + "        <TD class='tdclss'>";
    printable = printable + "          $ " + form.s_custom1.value;
    printable = printable + "        </TD>";
    printable = printable + "      </TR>";
  }
  if (
    form.s_custom2_text.value != "" &&
    form.s_custom2_text.value != "Add Cost"
  ) {
    printable = printable + "      <TR align='left'>";
    printable = printable + "        <td  class='tdclss'>  ";
    printable = printable + "          " + form.s_custom2_text.value + ":";
    printable = printable + "        </TD>";
    printable = printable + "        <TD class='tdclss'>";
    printable = printable + "          $ " + form.s_custom2.value;
    printable = printable + "        </TD>";
    printable = printable + "      </TR>";
  }
  if (
    form.s_custom3_text.value != "" &&
    form.s_custom3_text.value != "Add Cost"
  ) {
    printable = printable + "      <TR align='left'>";
    printable = printable + "        <td  class='tdclss'>  ";
    printable = printable + "          " + form.s_custom3_text.value + ":";
    printable = printable + "        </TD>";
    printable = printable + "        <TD class='tdclss'>";
    printable = printable + "          $ " + form.s_custom3.value;
    printable = printable + "        </TD>";
    printable = printable + "      </TR>";
  }
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD height='20' colspan='2'>";
  printable = printable + "          <br>";
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  printable = printable + "";
  // TOTAL SELLING EXPENSES
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          <b>Total Selling Expenses:</b>";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_totalsellingexp.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // TOTAL SELLING EXPENSES
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD height='20' colspan='2'>";
  printable = printable + "          <br>";
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  printable = printable + "";
  // NET EQUITY
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <td  class='tdclss'>  ";
  printable = printable + "          <b>Estimated Equity to Seller:</b>";
  printable = printable + "        </TD>";
  printable = printable + "        <TD class='tdclss'>";
  printable = printable + "          $ " + form.s_totalestequity.value;
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  // ++++++++ ROW FEED +++++++++++++++++++++++++
  printable = printable + "      <TR align='left'>";
  printable = printable + "        <TD height='20' colspan='2'>";
  printable = printable + "          <br>";
  printable = printable + "        </TD>";
  printable = printable + "      </TR>";
  printable = printable + "";
  // PRINT BUT
  printable =
    printable +
    "</TABLE><center><input type='button' value='Print' onclick='javascript:window.print()'></center>";
  // EMAIL BUT
  //  printable = printable + "<center><form action=EmailNetSheet.asp method=post><input type=hidden name=message value=\""+printable+"\"><input type=hidden name=seller value=\""+pSeller+"\"><font face='Verdana' size='1'>Send this NetSheet to: </font><input type=text name=email value=''><input type='submit' value='Email'></form></center>";
  // DISCLAIM TEXT
  //printable = printable + "<center><font face='Verdana' size='1'>Note: Generated NetSheet email is HTML formatted. Some email systems may not display this correctly.</font><br></center>";
  printable =
    printable +
    "<center><font face='Verdana' size='1'><i>The information contained herein is for informational purposes only. Columbus Title Agency makes no explicit representations as to the accuracy of these forms and is provided without warranty, express or implied, as to their legal effect and completeness of this Seller NetSheet calculator.</i><br><br>* Title search cost can vary based on type of property being searched. Call either the Westerville office at (614) 890-3888 or our Gahanna office at (614) 656-7571 for a quote.</font><br><br></center>";
  printable = printable + "</BODY></HTML>";
  reportWin = window.open(
    "",
    "s",
    "width=700,height=700,scrollbars=yes,menubar=yes,resizable=yes"
  );
  reportWin.document.write(printable);
  reportWin.document.close();
}

function clearForm(form) {
  form.principal.value = "100000";
  form.intRate.value = "7.00";
  form.numMonths.value = "360";
  form.moPmt.value = "0";
  form.HmoPmt.value = "0";
  form.HperiodPmt.value = "";
  form.Hdivisor.value = "";
  form.HintRate.value = "";
  form.HnumMonths.value = "";
  form.HnumPeriods.value = "";
}

function gothere(here) {
  window.location.hash = here;
}
