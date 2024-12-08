
selectCurrent.textContent = item.textContent

requestAnimationFrame(() => {
	selectCurrent.textContent = item.textContent
})

selectItems.forEach(item => {
	item.addEventListener('click', () => handleItemClick(item))
	item.addEventListener('touchstart', () => handleItemClick(item))
})

console.log(document.documentElement.className)

setTimeout(() => {
	selectCurrent.textContent = item.textContent
}, 10)











const header = document.getElementById('header')
const menuItems = document.querySelectorAll('.menu__item')

menuItems.forEach(item => {
	item.addEventListener('click', () => {
		header.classList.remove('open')
	})
})

function exchange() {
	const outputExchange = document.querySelector('.exchange__right-input')
	const outputExchangeCustom = document.querySelector(
		'.exchange__right-input_custom'
	)
	const $exchangeRate = document.querySelector('.exchange_output')
	const $exchange_to = document.querySelector('.exchange_to')
	const $exchange_from = document.querySelector('.exchange_from')
	const $exchange_to_text = document.querySelector('.exchange_to_text')
	const $exchange_from_text = document.querySelector('.exchange_from_text')

	const exchangeRates = {}
	const customExchangeRates = {
		AED: 0.035522969,
		IDR: 154.34742679687,
		CNY: 0.070721858,
		THB: 0.332006,
	}

	fetch('https://www.cbr-xml-daily.ru/latest.js') // Замените на реальный URL API
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return response.json()
		})
		.then(data => {
			Object.assign(exchangeRates, data.rates)
			const rate = getExchangeRate(
				$exchange_from_text.textContent,
				$exchange_to_text.textContent,
				exchangeRates
			)
			const customRate = getExchangeRate(
				$exchange_from_text.textContent,
				$exchange_to_text.textContent,
				customExchangeRates
			)

			outputExchange.value = rate.toFixed(4)
			outputExchangeCustom.value = customRate.toFixed(4)
			$exchangeRate.textContent = customRate.toFixed(4)
		})
		.catch(error => {
			console.error('Ошибка при получении данных:', error)
		})

	function getExchangeRate(fromCurrency, toCurrency, rates) {
		if (fromCurrency === 'RUB') {
			return rates[toCurrency]
		} else if (toCurrency === 'RUB') {
			return 1 / rates[fromCurrency]
		} else {
			return rates[toCurrency] / rates[fromCurrency]
		}
	}

	document.querySelector('.select-ex-list').addEventListener('click', e => {
		if (e.target.classList.contains('select__item')) {
			const selectedText = e.target.textContent.trim()
			const [fromCurrency, toCurrency] = selectedText
				.split(' → ')
				.map(s => s.trim())

			const rate = getExchangeRate(fromCurrency, toCurrency, exchangeRates)
			const customRate = getExchangeRate(
				fromCurrency,
				toCurrency,
				customExchangeRates
			)

			$exchange_from.value = 0
			$exchange_to.value = 0
			outputExchange.value = rate.toFixed(4)
			outputExchangeCustom.value = customRate.toFixed(4)
			$exchangeRate.textContent = customRate.toFixed(4)
			$exchange_to_text.innerHTML = toCurrency
			$exchange_from_text.textContent = fromCurrency
		}
	})

	$exchange_from.addEventListener('input', e => {
		const value = e.target.value
		const rate = getExchangeRate(
			$exchange_from_text.textContent,
			$exchange_to_text.textContent,
			customExchangeRates
		)
		const result = value * rate
		$exchange_to.value = result.toFixed(4)
	})

	$exchange_to.addEventListener('input', e => {
		const value = e.target.value
		const rate = getExchangeRate(
			$exchange_to_text.textContent,
			$exchange_from_text.textContent,
			customExchangeRates
		)
		const result = value * rate
		$exchange_from.value = result.toFixed(4)
	})
}
exchange()

document.addEventListener('DOMContentLoaded', () => {
	const initializeDropdown = select => {
		const selectHeader = select.querySelector('.select__header')
		const selectCurrent = select.querySelector('.select__current')
		const selectList = select.querySelector('.select__list')
		let selectItems = select.querySelectorAll('.select__item')

		if (selectItems.length > 0) {
			const firstItem = selectItems[0]
			selectCurrent.innerText = firstItem.innerText
			selectCurrent.dataset.value =
				firstItem.dataset.value || firstItem.innerText
			firstItem.remove()
			selectItems = select.querySelectorAll('.select__item')
		}

		const handleItemClick = item => {
			const selectedLang = item.dataset.value || item.innerText.toLowerCase()
			const previousText = selectCurrent.innerText

			selectCurrent.innerText = item.innerText
			selectCurrent.dataset.value = selectedLang

			// Оновлення класів для мови
			document.documentElement.classList.remove('lang-ru', 'lang-en')
			if (selectedLang === 'тайланд' || selectedLang === 'китай') {
				document.documentElement.classList.add('lang-ru')
			} else {
				document.documentElement.classList.add('lang-en')
			}

			// Додавання попереднього вибору
			if (previousText) {
				const newItem = document.createElement('div')
				newItem.classList.add('select__item', 'language-specific') // Додаємо клас
				newItem.innerText = previousText
				newItem.dataset.value = selectCurrent.dataset.value || previousText
				newItem.addEventListener('click', () => handleItemClick(newItem))
				selectList.appendChild(newItem)
			}

			item.remove()
			select.classList.remove('is-active')
		}

		selectItems.forEach(item => {
			item.addEventListener('click', () => handleItemClick(item))
		})

		selectHeader.addEventListener('click', event => {
			event.stopPropagation()
			const isActive = select.classList.contains('is-active')

			document.querySelectorAll('.select').forEach(otherSelect => {
				otherSelect.classList.remove('is-active')
			})

			select.classList.toggle('is-active', !isActive)
		})
	}

	const selects = document.querySelectorAll('.select')
	selects.forEach(select => initializeDropdown(select))

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

	playPause.addEventListener('click', () => {
		if (videoPlayer.paused) {
			videoPlayer.play()
			playPause.textContent = '||'
		} else {
			videoPlayer.pause()
			playPause.textContent = '▶'
		}
	})

	videoPlayer.addEventListener('timeupdate', () => {
		const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100
		progressBar.value = progress
		currentTime.textContent = formatTime(videoPlayer.currentTime)
		duration.textContent = formatTime(videoPlayer.duration)
	})

	progressBar.addEventListener('input', () => {
		const time = (progressBar.value / 100) * videoPlayer.duration
		videoPlayer.currentTime = time
	})

	muteToggle.addEventListener('click', () => {
		videoPlayer.muted = !videoPlayer.muted
		muteToggle.textContent = videoPlayer.muted ? '🔇' : '🔊'
	})

	fullScreen.addEventListener('click', () => {
		if (videoPlayer.requestFullscreen) {
			videoPlayer.requestFullscreen()
		}
	})

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
function removeNoBr() {
	if (window.matchMedia('(max-width: 550px)').matches) {
		document.querySelectorAll('nobr').forEach(nobr => {
			const parent = nobr.parentNode
			while (nobr.firstChild) {
				parent.insertBefore(nobr.firstChild, nobr)
			}
			parent.removeChild(nobr)
		})
	}
}

window.addEventListener('load', removeNoBr)

window.addEventListener('resize', removeNoBr)

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('burger').addEventListener('click', function () {
		document.querySelector('.header').classList.toggle('open')
	})
})

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
	const openPopupButtons = document.querySelectorAll(
		'.perform__item-first, .perform__item-second, .perform__item-third'
	)
	const popups = {
		'perform__item-first': '.pop-purchase',
		'perform__item-second': '.pop-transfer',
		'perform__item-third': '.pop-service',
	}

	openPopupButtons.forEach(button => {
		button.addEventListener('click', event => {
			event.preventDefault()

			const targetPopupClass = popups[button.classList[1]]
			const popup = document.querySelector(targetPopupClass)
			if (popup) {
				document
					.querySelectorAll('.pop-purchase, .pop-transfer, .pop-service')
					.forEach(p => p.classList.remove('active'))
				popup.classList.add('active')
				popup.setAttribute('aria-hidden', 'false')
			}
		})
	})

	document.addEventListener('click', event => {
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
