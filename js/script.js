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


	const warningText = document.querySelector('.warning-text');

	function show(value, textBox, optionContainer) {
		textBox.value = value;
		optionContainer.classList.add('hidden');
	}

	function initializeDropdown(dropdown) {
		const textBox = dropdown.querySelector('.textBox');
		const options = dropdown.querySelector('.option');
		const optionItems = options.querySelectorAll('.option-item');

		optionItems.forEach((item) => {
			item.addEventListener('click', function () {
				show(item.textContent.trim(), textBox, options);
				this.parentNode.parentNode.parentNode.classList.remove('active');
			});
		});

		textBox.addEventListener('click', function () {
			options.classList.toggle('hidden');
			this.parentNode.classList.add('active');
		});

		document.addEventListener('click', function (e) {
			if (!options.contains(e.target) && e.target !== textBox) {
				options.classList.add('hidden');
				// warningText.classList.remove('hidden');
			}
		});
	}

	// Initialize each dropdown
	const dropdowns = document.querySelectorAll('.sellect-dropdown');
	dropdowns.forEach(initializeDropdown);

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