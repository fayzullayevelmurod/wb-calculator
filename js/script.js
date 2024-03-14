document.addEventListener('DOMContentLoaded', () => {
	function show(value, textBox, optionContainer) {
		textBox.value = value;
		optionContainer.classList.add('hidden');
	}

	const sellectDropdown = document.querySelector('.sellect-dropdown');
	function initializeDropdown(dropdown) {
		const textBox = dropdown.querySelector('.textBox');
		const options = dropdown.querySelector('.option');
		const optionItems = options.querySelectorAll('.option-item');
		optionItems.forEach((item) => {
			item.addEventListener('click', function () {
				show(item.textContent.trim(), textBox, options);
				this.parentNode.parentNode.parentNode.classList.remove('active')
			});
		});

		textBox.addEventListener('click', function () {
			options.classList.toggle('hidden');
			this.parentNode.classList.add('active');
		});

		// Close the dropdown when clicking outside
		document.addEventListener('click', function (e) {
			if (!options.contains(e.target) && e.target !== textBox) {
				options.classList.add('hidden');
			}
		});
	}

	// Initialize each dropdown
	const dropdowns = document.querySelectorAll('.sellect-dropdown');
	dropdowns.forEach(initializeDropdown);

	// accordion
	const openBtn = document.querySelector('.open-box');
	const contentBox = document.querySelector(".content-box");
	console.log(contentBox);
	openBtn.addEventListener("click", () => {
		contentBox.classList.toggle('h-0');
		openBtn.classList.toggle('active');
		console.log(openBtn);
	});

})