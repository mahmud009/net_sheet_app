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

$(function () {});
