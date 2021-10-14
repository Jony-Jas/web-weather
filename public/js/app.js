console.log("js loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const result = document.querySelector("#result");
const error = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  result.textContent = "Loading ...";
  fetch("http://localhost:8080/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          result.textContent = "";
          error.textContent = data.error;
        } else {
          result.innerHTML = data.location + "<br/>" + data.forecast;
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
