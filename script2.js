// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	try {

		// response from server

		// local host / dev
		const response = await fetch("http://localhost:3000/api/songs");
		// to run on local server: npx http-server -p 8080

		// live
		// const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/songs");

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

			// add the song title and artist
			li.textContent = `${song.title} - ${song.artist}`;

			// append to the ul
			ul.append(li);

			// this does not work
			//listItems+=`<li>${song.title} - ${song.artist}</li>`;
		});

	} catch (error) {
    	console.error('Failed to fetch songs:', error);
 	}

	// load available courses
	try {

	    // response from server

	    // local host / dev
	    const response = await fetch("http://localhost:3000/api/courses");
	    // to run on local server: npx http-server -p 8080

	    // live
	    // const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses");

	    if (!response.ok) {
	        throw new Error(`HTTP error! Status: ${response.status}`);
	    }

	    // course list as promise
	    const courses = await response.json();

	    // get the ul element
	    const ul = document.querySelector('#ul-courses');

	    // extract data from promise using foreach 
	    courses.forEach(course => {

	        // create li element
	        const li = document.createElement('li');

	        // add the song title and artist
	        li.textContent = `${course.name}`;

	        // append to the ul
	        ul.append(li);

	    });

	    // load courses into select list
	    // get the select list, in this case by id (per google search results)
	    const selectList = document.getElementById('studentCourse');

	    // extract data from promise using foreach 
	    courses.forEach(course => {

	        // create the new option element
	        const newOpt = new Option(course.name, course._id);

	        // append to the ul
	        selectList.add(newOpt);

	    });

	} catch (error) {
	    console.error('Failed to fetch courses:', error);
	}

 	// get courses in student's schedule, load into elements
	try {

		// response from server

		// local host / dev
		const response = await fetch("http://localhost:3000/api/studentCourses");
		// to run on local server: npx http-server -p 8080

		// live
		// const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses");

		if (!response.ok) {
		    throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// course list as promise
		const courses = await response.json();

		// get the ul element
		const ul = document.querySelector('#ul-schedule');

		// get course name from related table
		courses.forEach(course => {

			// this is from a google example showing how to extract the course name value from the promise

			// get the course data, then run promise chain
			fetch('http://localhost:3000/api/courses/' + course.courseId)
			  .then(response => response.json()) // Extracts the JSON promise
			  .then(jsonData => {

			    // Any logic depending on 'username' must be executed inside this block
			    // console.log("Inside promise chain:", jsonData[0].name); 

			    // create li element
				const li = document.createElement('li');

				// add course name to li text content
			    li.textContent = `${jsonData[0].name}`;

				// append to the ul
				ul.append(li);

			  })
			  .catch(error => console.error("Error:", error)); // error

		});

	} catch (error) {
		console.error('Failed to fetch student courses:', error);
	}

});

// song is added

// course is added

// student selects a course

// student drops a course