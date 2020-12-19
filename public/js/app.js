// fetch("http://puzzle.mead.io/puzzle").then((res) => {
// 	console.log(res); //start
// 	console.log(res.json()); //middle step (promise)
// 	res.json().then((data) => {
// 		console.log(data); // finish the fetch
// 	});
// });
const wetherForm = document.querySelector("form");
const search = document.querySelector("input");
const massageOne = document.querySelector("#massageOne");
const massageTwo = document.querySelector("#massageTwo");

wetherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value;

	fetch(`/weather?address=${location}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				massageOne.textContent = data.error;
				massageTwo.textContent = "";
			} else {
				massageOne.textContent = data.location;
				massageTwo.textContent = data.forecast;
			}
		});
	});
});
