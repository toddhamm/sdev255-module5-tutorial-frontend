// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {
	const response = await fetch("http://localhost:3000/api/songs");
	alert(response);
});
