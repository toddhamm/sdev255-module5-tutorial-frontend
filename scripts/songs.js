// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	// get songs
	try {

		// response from server

		// local host / dev
		// const response = await fetch("http://localhost:3000/api/songs");
		// to run on local server: npx http-server -p 8080

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
		const ul = document.querySelector('#ul-songs');

		// extract data from promise using foreach 
		songs.forEach(song => {

			// debug
			// console.log(song.title, song.artist);

			// create li element
			const li = document.createElement('li');

			// create a tag
			const a = document.createElement("a");

			a.href = "song_detail.html?id="+song._id;
			a.textContent = "Edit";

			// add the song title and artist
			li.textContent = `${song.title} - ${song.artist} - `;

			// view detail
			li.appendChild(a);

			const space = document.createTextNode(" ");

			// add some space
			li.appendChild(space);

			// delete song
			// create a tag
			const d = document.createElement("a");

			d.href = "delete.html?id="+song._id;
			d.textContent = "Delete";
			d.classList.add('delete-link');
			li.appendChild(d);

			// append to the ul
			ul.append(li);

			// this does not work
			//listItems+=`<li>${song.title} - ${song.artist}</li>`;
		});

	} catch (error) {
    	console.error('Failed to fetch songs:', error);
 	}

 	// delete one song
	// deletion is not explained in video
	// this is a modified example from google search
	// problem: this only works once; second delete doesn't work...
	document.querySelectorAll('.delete-link').forEach(link => {
	  link.addEventListener('click', async function(event) {
	    
	    //  Prevent the browser from navigating to the URL
	    event.preventDefault(); 
	    
	    //alert('link clicked...');

	    // get the full absolute URL from the clicked link
		const href = this.href; 

		// create a URL object and extract the 'id' parameter
		const urlObj = new URL(href);
		const songID = urlObj.searchParams.get('id');

		// send request to api
	    try {
	      //  Send the HTTP DELETE request
	      // let url = "http://localhost:3000/api/songs/";
	      let url = "https://sdev-module5-tutorial.onrender.com/api/songs";
	      const response = await fetch(url + songID, {
	        method: 'DELETE',
	        headers: {
	          'Content-Type': 'application/json'
	          // Add Authorization tokens here if required
	        }
	      });

	      if (response.ok) {
	      	// show deleted message

	      	// add success message
			const successDiv = document.getElementById("success");
			
			// Replace its contents with text
			successDiv.textContent = "Song deleted!";

			// show div
			successDiv.style.display = "block";

			// remove all li from the ul
			const list = document.getElementById("ul-songs");

			// Clear all contents
			list.innerHTML = "";

	        // refresh the song list
	        try {

				// response from server

				// local host / dev
				// const response = await fetch("http://localhost:3000/api/songs");
				// to run on local server: npx http-server -p 8080

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
				const ul = document.querySelector('#ul-songs');

				// extract data from promise using foreach 
				songs.forEach(song => {

					// debug
					// console.log(song.title, song.artist);

					// create li element
					const li = document.createElement('li');

					// create a tag
					const a = document.createElement("a");

					a.href = "song_detail.html?id="+song._id;
					a.textContent = "Edit";

					// add the song title and artist
					li.textContent = `${song.title} - ${song.artist} - `;

					// view detail
					li.appendChild(a);

					const space = document.createTextNode(" ");

					// add some space
					li.appendChild(space);

					// delete song
					// create a tag
					const d = document.createElement("a");

					d.href = "delete.html?id="+song._id;
					d.textContent = "Delete";
					d.classList.add('delete-link');
					li.appendChild(d);

					// append to the ul
					ul.append(li);

					// this does not work
					//listItems+=`<li>${song.title} - ${song.artist}</li>`;
				});

			} catch (error) {
		    	console.error('Failed to fetch songs:', error);
		 	}

	      } else {
	        // error; show error msg
	        const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${response.error}`;
		
			// show div
			errorDiv.style.display = "block";
	      }
	    } catch (error) {
	        // show error message

	    	const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;
		
			// show div
			errorDiv.style.display = "block";
	    }
	  });
	});

});