addEventListener("DOMContentLoaded", async function () {

	// get url params
	const urlparam = new URLSearchParams(window.location.search);

	// id from url
	const songID = urlparam.get('id');

	//console.log(songID);

	// get song data from api
	// dev
	// const response = await fetch("http://localhost:3000/api/songs/" + songID);

	// live
	const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/songs/" + songID);

	// await json
	const song = await response.json();

	// console.log(song);

	// insert values into form fields
	document.getElementById("title").value=song[0].title;
	document.getElementById("artist").value=song[0].artist;
	document.getElementById("releaseDate").value=song[0].releaseDate;
	document.getElementById("popularity").value=song[0].popularity;
	document.getElementById("genre").value=song[0].genre;
	document.getElementById("songID").value=songID;

	// get the form 
	const form = document.getElementById('updateSongForm');

	// update form
	// form was submitted
	form.addEventListener('submit', async (e) => {

		// prevent form from submitting 
		e.preventDefault();

		// from google: get form fields by their "name" attributes
		const formData = new FormData(form);

		// from google: Convert FormData to a regular JSON object
		const data = Object.fromEntries(formData.entries());

		// let url = "hhttp://localhost:3000/api/updateSong";
		let url = "https://sdev-module5-tutorial.onrender.com/api/updateSong";

		// attempt to post form to api end point (google example is very similar to video example)
		try {
			const response = await fetch(url, {
			method: 'PUT',
				headers: {
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify(data)
			});

			// await api response
			const result = await response.json();

			// response is ok
			if (response.ok) {	

				// add success message
				const successDiv = document.getElementById("success");
				
				// does not work
				// change success div class
				// successDiv.classList.add("alert alert-success");

				// Replace its contents with text
				successDiv.textContent = "Song updated! ID: " + result._id;

				// show div
				successDiv.style.display = "block";

				// responseMessage.textContent = `Success: ${result.message}`;

				// reset the form
				// form.reset(); 

			} else {
			
				// error
				// responseMessage.textContent = `Error: ${result.error}`;

				const errorDiv = document.getElementById("error");

				// does not work
				// change error div class
				// errorDiv.classList.add("alert alert-danger");

				// update error div text
				errorDiv.textContent = `Error: ${result.error}`;
			
				// show div
				errorDiv.style.display = "block";

			}

		} catch (error) {
			// try block failed...
			// console.error('Fetch error:', error);

			const errorDiv = document.getElementById("error");

			// change error div class
			// errorDiv.classList.add("alert alert-danger");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;

			// show div
			errorDiv.style.display = "block";

		}

	});

});