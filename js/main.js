let select = function () {
	let selects = document.querySelectorAll('.select')

	selects.forEach(select => {
		let selectHeader = select.querySelector('.select__header')
		let selectCurrent = select.querySelector('.select__current')
		let selectItems = select.querySelectorAll('.select__item')

		if (selectItems.length > 0) {
			let firstItem = selectItems[0]
			selectCurrent.innerText = firstItem.innerText
			selectCurrent.dataset.value = firstItem.innerText
			firstItem.remove()
		}

		selectHeader.addEventListener('click', function () {
			document.querySelectorAll('.select').forEach(otherSelect => {
				if (otherSelect !== select) {
					otherSelect.classList.remove('is-active')
				}
			})
			select.classList.toggle('is-active')
		})

		selectItems.forEach(item => {
			item.addEventListener('click', function () {
				let text = this.innerText
				let oldValue = selectCurrent.dataset.value || ''

				selectCurrent.innerText = text
				selectCurrent.dataset.value = text

				this.remove()

				if (oldValue) {
					let newItem = document.createElement('div')
					newItem.classList.add('select__item')
					newItem.innerText = oldValue

					newItem.addEventListener('click', function () {
						let tempText = selectCurrent.innerText
						selectCurrent.innerText = this.innerText
						selectCurrent.dataset.value = this.innerText
						this.innerText = tempText
						select.classList.remove('is-active')
					})

					select.querySelector('.select__list').appendChild(newItem)
				}
				select.classList.remove('is-active')
			})
		})
	})
}

select()

function animateNumber(targetNumber, duration) {
  const startTime = performance.now();
  const startNumber = 0;
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * progress);
    
    document.getElementById('number').textContent = currentNumber;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      document.getElementById('number').textContent = targetNumber; 
    }
  }
  
  requestAnimationFrame(updateNumber);
}


animateNumber(7850, 3000);

const links = document.querySelectorAll('.how__item');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal__close');

links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const modal = document.getElementById(targetId);
    if (modal) {
      modals.forEach(m => m.style.display = 'none'); 
      modal.style.display = 'flex';
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    modal.style.display = 'none';
  });
});

window.addEventListener('click', event => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});






document.addEventListener('DOMContentLoaded', function () {
	// Вибір елементів для відкриття попапів
	const openPopupButtons = document.querySelectorAll(
		'.perform__item-first, .perform__item-second, .perform__item-third'
	)
	// Вибір попапів
	const popups = {
		'perform__item-first': '.pop-purchase',
		'perform__item-second': '.pop-transfer',
		'perform__item-third': '.pop-service',
	}

	// Відкриття попапів при натисканні на елементи
	openPopupButtons.forEach(button => {
		button.addEventListener('click', event => {
			event.preventDefault()

			// Знаходимо попап, що відповідає натиснутому елементу
			const targetPopupClass = popups[button.classList[1]]
			const popup = document.querySelector(targetPopupClass)
			if (popup) {
				// Закриваємо всі попапи
				document
					.querySelectorAll('.pop-purchase, .pop-transfer, .pop-service')
					.forEach(p => p.classList.remove('active'))
				// Відкриваємо відповідний попап
				popup.classList.add('active')
				popup.setAttribute('aria-hidden', 'false')
			}
		})
	})

	// Закриття попапів при кліку поза ними або по кнопці закриття
	document.addEventListener('click', event => {
		// Клік поза попапом
		document
			.querySelectorAll('.pop-purchase, .pop-transfer, .pop-service')
			.forEach(popup => {
				if (
					!popup.contains(event.target) &&
					!event.target.closest(
						'.perform__item-first, .perform__item-second, .perform__item-third'
					)
				) {
					popup.classList.remove('active')
					popup.setAttribute('aria-hidden', 'true')
				}
			})

		// Клік по кнопці закриття
		if (event.target.matches('.popup__close')) {
			const popup = event.target.closest(
				'.pop-purchase, .pop-transfer, .pop-service'
			)
			if (popup) {
				popup.classList.remove('active')
				popup.setAttribute('aria-hidden', 'true')
			}
		}
	})
})



