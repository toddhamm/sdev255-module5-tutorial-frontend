// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	try {

		// response from server
		// const response = await fetch("http://localhost:3000/api/songs");

		// live
		const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/songs");

		if (!response.ok) {
	    	throw new Error(`HTTP error! Status: ${response.status}`);
	    }

		// song list as promise
		const songs = await response.json();
		
		// console.log(songs); 
		//alert("data: " + songs[0].title);

		// create variable to store the entire list of songs does not work
		// let listItems = '';

		// get the ul element
		const ul = document.querySelector('ul');

		// extract data from promise using foreach 
		songs.forEach(song => {

			// debug
			// console.log(song.title, song.artist);

			// create li element
			const li = document.createElement('li');

			// add the song title and artist
			li.textContent = `${song.title} - ${song.artist}`;

			// append to the ul
			ul.append(li);

			// this does not work
			//listItems+=`<li>${song.title} - ${song.artist}</li>`;
		});

		//alert(listItems);

		// this does not work
		// inject listItems into ul
	    // document.querySelector("addedSongs").innerHTML = listItems;

	} catch (error) {
    	console.error('Failed to extract data:', error);
  }
});
