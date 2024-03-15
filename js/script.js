document.addEventListener('DOMContentLoaded', () => {
	// responsive menu
	const menuBtn = document.querySelector('.menu-btn');
	const nav = document.querySelector("header .nav");
	menuBtn.addEventListener('click', () => {
		nav.classList.toggle('active');
		menuBtn.classList.toggle('active');
	})

	nav.addEventListener('click', (e) => {
		if (e.target && e.target.classList.contains('nav')) {
			nav.classList.remove('active');
			menuBtn.classList.remove('active');
		}
	})

	// validate input
	const errorBox = document.querySelectorAll('.error-box');

	errorBox.forEach(box => {
		const validateInput = box.querySelector('.form-input');
		const errorText = box.querySelector('.error_input');

		validateInput.addEventListener('input', () => {
			const inputValue = validateInput.value.trim();
			if (!inputValue) {
				errorText.classList.remove('hidden');
			} else {
				errorText.classList.add('hidden');
			}
		})
	})



	// validate select 
	const warningText = document.querySelectorAll('.warning-text');
	const dropdownErrors = {};

	function show(value, textBox, optionContainer) {
		textBox.value = value;
		optionContainer.classList.add('hidden');
	}

	function initializeDropdown(dropdown, idx) {
		const textBox = dropdown.querySelector('.textBox');
		const options = dropdown.querySelector('.option');
		const optionItems = options.querySelectorAll('.option-item');
		const clearIcon = dropdown.querySelector(".clear-icon");

		dropdownErrors[idx] = 0;

		clearIcon.addEventListener('click', () => {
			textBox.value = '';
			clearIcon.classList.add('hidden');
			clearIcon.classList.remove('block');
			dropdownErrors[idx] = 0;
			warningText[idx].classList.remove('hidden');
			textBox.classList.add('error');
			optionItems.forEach(el => el.classList.remove('active'))
		})

		optionItems.forEach((item) => {

			item.addEventListener('click', function () {
				optionItems.forEach(el => {
					el.classList.remove('active');
				})

				show(item.textContent.trim(), textBox, options);
				clearIcon.classList.add('block');
				clearIcon.classList.remove('hidden');

				this.parentNode.parentNode.parentNode.classList.remove('active');
				item.classList.add('active');
				warningText[idx].classList.add('hidden');
				textBox.classList.remove('error');
			});
		});

		textBox.addEventListener('click', function () {
			options.classList.toggle('hidden');
			this.parentNode.classList.add('active');
			dropdownErrors[idx] = 1;
		});

	}


	// Initialize each dropdown
	const dropdowns = document.querySelectorAll('.sellect-dropdown');
	dropdowns.forEach(initializeDropdown);

	document.addEventListener('click', (event) => {
	
		for (const [key, value] of Object.entries(dropdownErrors)) {
			if (value) {
				const withinBoundaries = event.composedPath().includes(dropdowns[+key]);
				if (withinBoundaries) {
				} else {
					let input = dropdowns[+key].querySelector('.textBox');
					if (input.value === '') {
						warningText[+key].classList.remove('hidden');
						input.classList.add('error');
					} else {
						warningText[+key].classList.add('hidden');
						input.classList.remove('error');
					}
					dropdownErrors[key] = 0;
					dropdowns[+key].querySelector('.option').classList.add('hidden');
					dropdowns[+key].classList.remove('active');
				}
			}
		}
	})











	// accordion
	const openBtn = document.querySelector('.open-box');
	const contentBox = document.querySelector(".content-box");
	openBtn.addEventListener("click", () => {
		contentBox.classList.toggle('h-0');
		openBtn.classList.toggle('active');
	});

	const accordion = document.querySelectorAll('.accordion');

	accordion.forEach((el) => {
		const accordionHeader = el.querySelector('.accordion-header');
		const accordionHeaderIconPlus = el.querySelector('.accordion-header__icon-plus');
		const accordionHeaderIconMinus = el.querySelector('.accordion-header__icon-minus');
		const accordionContent = el.querySelector('.accordion-content');
		accordionHeader.addEventListener('click', () => {
			accordionHeaderIconPlus.classList.toggle('hidden');
			accordionHeaderIconMinus.classList.toggle('hidden');
			accordionContent.classList.toggle('hidden');
		})
	})

	const copyText = document.querySelector('.copy-btn span');
	const copyBtn = document.querySelector('.copy-btn');

	copyBtn.addEventListener('click', () => {
		if (copyText.textContent === 'Поделиться калькулятором') {
			copyText.textContent = 'Ссылка скопирована';
			copyText.parentNode.classList.add('active')
		}
	})
})