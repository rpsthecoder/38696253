if(!!window.IntersectionObserver){
	const domparser = new DOMParser();
	const observer = new IntersectionObserver((entries, observer) => { 
		entries.forEach(entry => {
			if(entry.isIntersecting){
				fetch(entry.target.dataset.pid)
				.then(response => response.text())
				.catch(() => console.error('Error in fetching the post files'))
				.then(responsetext => {
					const html = (domparser.parseFromString(responsetext, 'text/html')).querySelector("article");
					entry.target.appendChild(html);
					
				})
				.catch(() => console.error('Error in parsing the posts'));
				observer.unobserve(entry.target);
			}
		});
	});
	document.querySelectorAll('[data-pid]').forEach(div => { observer.observe(div) });
}