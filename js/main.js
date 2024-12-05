document.addEventListener('DOMContentLoaded', () => {
	const initializeDropdown = select => {
		const selectHeader = select.querySelector('.select__header')
		const selectCurrent = select.querySelector('.select__current')
		const selectList = select.querySelector('.select__list')
		let selectItems = select.querySelectorAll('.select__item')

		// Ініціалізація: встановлюємо перший елемент як вибраний
		if (selectItems.length > 0) {
			const firstItem = selectItems[0]
			selectCurrent.innerText = firstItem.innerText
			selectCurrent.dataset.value =
				firstItem.dataset.value || firstItem.innerText
			firstItem.remove()
			selectItems = select.querySelectorAll('.select__item') // Оновлюємо список
		}

		// Функція для обробки вибору елемента
		const handleItemClick = item => {
			const selectedLang = item.dataset.value || item.innerText.toLowerCase()
			const previousText = selectCurrent.innerText

			// Оновлення поточного вибору
			selectCurrent.innerText = item.innerText
			selectCurrent.dataset.value = selectedLang

			// Зміна атрибуту `lang` у <html>
			document.documentElement.setAttribute('lang', selectedLang)

			// Додавання попереднього значення назад у список
			if (previousText) {
				const newItem = document.createElement('div')
				newItem.classList.add('select__item')
				newItem.innerText = previousText
				newItem.dataset.value = selectCurrent.dataset.value || previousText
				newItem.addEventListener('click', () => handleItemClick(newItem))
				selectList.appendChild(newItem)
			}

			// Видалення вибраного елемента
			item.remove()
			select.classList.remove('is-active')
		}

		// Додаємо обробник кліку для кожного пункту
		selectItems.forEach(item => {
			item.addEventListener('click', () => handleItemClick(item))
		})

		// Відкриття/закриття меню
		selectHeader.addEventListener('click', event => {
			event.stopPropagation() // Зупиняємо "всплиття" події
			const isActive = select.classList.contains('is-active')

			// Закриваємо всі інші dropdown-и
			document.querySelectorAll('.select').forEach(otherSelect => {
				otherSelect.classList.remove('is-active')
			})

			// Відкриваємо або закриваємо поточне меню
			select.classList.toggle('is-active', !isActive)
		})
	}

	// Ініціалізуємо всі dropdown-и
	const selects = document.querySelectorAll('.select')
	selects.forEach(select => initializeDropdown(select))

	// Закриття всіх меню при кліку поза ними
	document.addEventListener('click', () => {
		document.querySelectorAll('.select').forEach(select => {
			select.classList.remove('is-active')
		})
	})
})

document.addEventListener('DOMContentLoaded', () => {
	const videoData = {
		alina: './images/alina.mp4',
		ekaterina: './images/ekaterina.mp4',
		denis: './images/denis.mp4',
		natalia: './images/natalia.mp4',
	}

	const modal = document.getElementById('videoModal')
	const videoPlayer = document.getElementById('videoPlayer')
	const videoSource = document.getElementById('videoSource')
	const closeModal = document.getElementById('closeModal')
	const playPause = document.getElementById('playPause')
	const progressBar = document.getElementById('progressBar')
	const currentTime = document.getElementById('currentTime')
	const duration = document.getElementById('duration')
	const muteToggle = document.getElementById('muteToggle')
	const fullScreen = document.getElementById('fullScreen')

	// Відкриття модального вікна
	document.querySelectorAll('.reviews__item-btn').forEach(button => {
		button.addEventListener('click', event => {
			event.preventDefault()
			const videoId = button.id
			if (videoData[videoId]) {
				videoSource.src = videoData[videoId]
				videoPlayer.style.display = 'block'
				videoPlayer.load()
				modal.style.display = 'flex'
			}
		})
	})

	// Закриття модального вікна
	closeModal.addEventListener('click', () => {
		modal.style.display = 'none'
		videoPlayer.pause()
	})

	modal.addEventListener('click', event => {
		if (event.target === modal) {
			modal.style.display = 'none'
			videoPlayer.pause()
		}
	})

	// Відтворення/Пауза
	playPause.addEventListener('click', () => {
		if (videoPlayer.paused) {
			videoPlayer.play()
			playPause.textContent = '||'
		} else {
			videoPlayer.pause()
			playPause.textContent = '▶'
		}
	})

	// Оновлення прогресу
	videoPlayer.addEventListener('timeupdate', () => {
		const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100
		progressBar.value = progress
		currentTime.textContent = formatTime(videoPlayer.currentTime)
		duration.textContent = formatTime(videoPlayer.duration)
	})

	// Перемотування
	progressBar.addEventListener('input', () => {
		const time = (progressBar.value / 100) * videoPlayer.duration
		videoPlayer.currentTime = time
	})

	// Мутування звуку
	muteToggle.addEventListener('click', () => {
		videoPlayer.muted = !videoPlayer.muted
		muteToggle.textContent = videoPlayer.muted ? '🔇' : '🔊'
	})

	// Повноекранний режим
	fullScreen.addEventListener('click', () => {
		if (videoPlayer.requestFullscreen) {
			videoPlayer.requestFullscreen()
		}
	})

	// Формат часу
	function formatTime(seconds) {
		const mins = Math.floor(seconds / 60)
		const secs = Math.floor(seconds % 60)
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`
	}
})

function getBaseNumber() {
	const lastUpdate = localStorage.getItem('lastUpdate')
	const savedNumber = parseInt(localStorage.getItem('number') || '7850', 10)

	const today = new Date().toISOString().split('T')[0]
	if (lastUpdate !== today) {
		const daysPassed =
			Math.floor(
				(new Date() - new Date(lastUpdate || today)) / (1000 * 60 * 60 * 24)
			) || 1
		const updatedNumber = savedNumber + daysPassed * 15

		localStorage.setItem('lastUpdate', today)
		localStorage.setItem('number', updatedNumber)

		return updatedNumber
	}

	return savedNumber
}

function animateNumber(targetNumber, duration) {
	const startTime = performance.now()
	const startNumber = 0

	function updateNumber(currentTime) {
		const elapsed = currentTime - startTime
		const progress = Math.min(elapsed / duration, 1)
		const currentNumber = Math.floor(
			startNumber + (targetNumber - startNumber) * progress
		)

		document.getElementById('number').textContent = currentNumber

		if (progress < 1) {
			requestAnimationFrame(updateNumber)
		} else {
			document.getElementById('number').textContent = targetNumber
		}
	}

	requestAnimationFrame(updateNumber)
}

const targetNumber = getBaseNumber()
animateNumber(targetNumber, 3000)

const links = document.querySelectorAll('.how__item')
const modals = document.querySelectorAll('.modal')
const closeButtons = document.querySelectorAll('.modal__close')

links.forEach(link => {
	link.addEventListener('click', event => {
		event.preventDefault()
		const targetId = link.getAttribute('href').replace('#', '')
		const modal = document.getElementById(targetId)
		if (modal) {
			modals.forEach(m => (m.style.display = 'none'))
			modal.style.display = 'flex'
		}
	})
})

closeButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = button.closest('.modal')
		modal.style.display = 'none'
	})
})

window.addEventListener('click', event => {
	modals.forEach(modal => {
		if (event.target === modal) {
			modal.style.display = 'none'
		}
	})
})

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
