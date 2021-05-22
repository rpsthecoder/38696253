if(!!window.IntersectionObserver){
	const domparser = new DOMParser();
	const observer = new IntersectionObserver((entries, observer) => { 
		entries.forEach(entry => {
			if(entry.isIntersecting){
				fetch(`${entry.target.id}.html`)
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
	document.querySelectorAll('div.post').forEach(div => { observer.observe(div) });
}

if('share' in navigator){
	const button = document.querySelector('button#share')
	const data= {title: "Preethi Sam", text: "Preethi Sam", url: "https://preethisam.com"};
	button.addEventListener('click', ()=>{navigator.share(data)});
	button.style.display = 'block';
}
