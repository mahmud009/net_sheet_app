function getAllInputProperty() {
  let allInputWrapper = document.querySelectorAll(".input-wrapper");
  let table = $("body").append(
    `<table id="test-table">
        <tr>
          <th>Display Text</th>
          <th>Label's for</th>
          <th>Input's name</th>
          <th>Input's id</th>
          <th>Wrapper div class</th>
        <tr>
      </table>`
  );
  for (element of allInputWrapper) {
    let tr = `
      <tr>
        <td>${$(element).find("label").text()}</td>
        <td>${$(element).find("label").attr("for")}</td>
        <td>${$(element).find("input").attr("name")}</td>
        <td>${$(element).find("input").attr("id")}</td>
        <td>${$(element).find("div").attr("class")}</td>
      <tr>
      `;
    $("#test-table").append(tr);
  }
}
