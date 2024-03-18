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
				validateInput.classList.add('warning')
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
		const loaderIcon = dropdown.querySelector('.circle-icon');

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
			if (options.classList.contains('not-found')) {
				clearIcon.classList.add('hidden');
				loaderIcon.classList.remove('hidden');
			}
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

	// tabs
	const tabItems = document.querySelectorAll('.tab-item');
	const tabContent = document.querySelectorAll('.tab-content');

	function hiddenTabContent() {
		tabContent.forEach(content => content.classList.remove('active'));
		tabItems.forEach(tabItem => tabItem.classList.remove('active'));
	}
	function showTabContent(idx = 0) {
		tabContent[idx].classList.add('active');
		tabItems[idx].classList.add('active');
	}

	hiddenTabContent();
	showTabContent();

	tabItems.forEach((btn, idx) => {
		btn.addEventListener('click', () => {
			hiddenTabContent();
			showTabContent(idx);
		})

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
	const clickIcon = document.querySelector('.click-icon')
	const addFolder = document.querySelector('.add-folder');
	copyBtn.addEventListener('click', () => {
		if (copyText.textContent === 'Сохранить данные') {
			copyText.textContent = 'Сохранили в браузере';
			copyText.parentNode.classList.add('active');
			clickIcon.classList.remove('hidden');
			addFolder.classList.add('hidden');
		}
	})

	const reviewsCards = document.querySelectorAll('.read-more__card');

	reviewsCards.forEach(reviewsCard => {
		const readMoreBtn = reviewsCard.querySelector('.read-more__btn');
		const customerComment = reviewsCard.querySelector('.customer-comment');

		const fullText = customerComment.textContent;
		const maxLength = 167;

		if (fullText.length > maxLength) {
			const trimmedText = fullText.slice(0, maxLength) + '...';
			customerComment.textContent = trimmedText;

			readMoreBtn.addEventListener('click', () => {
				if (customerComment.textContent === trimmedText) {
					customerComment.textContent = fullText;
					readMoreBtn.textContent = 'Читать меньше';
				} else {
					customerComment.textContent = trimmedText;
					readMoreBtn.textContent = 'Читать полностью ';
				}
			});
		} else {
			readMoreBtn.style.display = 'none';
		}
	});



	try {
		// counter
		const counters = document.querySelectorAll('.counter');

		if (counters) {
			counters.forEach(counter => {
				const plusCount = counter.querySelector('.plus-count');
				const minusCount = counter.querySelector('.minus-count');
				const count = counter.querySelectorAll('.count');
				const countPrice = counter.querySelector('.count-price');

				let countNumber = 1;
				let currentCountPrice = 3500;

				const updateCounter = () => {
					count.forEach(item => {
						if (countNumber <= 10) {
							item.textContent = `${countNumber} карточка`;
							countPrice.textContent = `${currentCountPrice}₽`;
						}
					});
				};

				if (plusCount) {
					plusCount.addEventListener('click', () => {
						if (currentCountPrice < 8000) {
							countNumber++;
							currentCountPrice += 500
						};
						updateCounter();
					});
				}

				if (minusCount) {
					minusCount.addEventListener('click', () => {
						if (countNumber > 1) {
							if (currentCountPrice >= 3500) {
								countNumber--;
								currentCountPrice -= 500
							};
							updateCounter();
						}
					});
				}
			});
		}
	} catch (error) {
		throw error
	}
})