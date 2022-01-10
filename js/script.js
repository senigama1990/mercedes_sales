window.addEventListener('DOMContentLoaded', function () {
    //LOADER
    setTimeout(function () {
        const loader = document.querySelector('.loader')
        loader.style.opacity = '0'
        setInterval(function () {
            loader.style.display = 'none'
        }, 500)
    }, 1000)

    //TABS
    const tabs = document.querySelectorAll('.tabheader__item')
    const tabContent = document.querySelectorAll('.tabcontent')
    const headerParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none'
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }
    function showTabContent(i = 0) {
        tabContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    headerParent.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    //MODAL
    const allmodalBtn = document.querySelectorAll('[data-modal]')
    const modal = document.querySelector('.modal')
    const modalClose = document.querySelector('[data-close]')

    allmodalBtn.forEach((btn) => {
        btn.addEventListener('click', openModal)
    })
    modalClose.addEventListener('click', closeModal)

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearTimeout(modalTimer)
    }

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    const modalTimer = setTimeout(() => openModal(), 5000)

    function showMyModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showMyModalByScroll)
        }
    }
    window.addEventListener('scroll', showMyModalByScroll)

    //DATE
    const deadline = '2022-12-31'

    function getTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date())
        const days = Math.floor((total / (1000 * 60 * 60 * 24)))
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num
        } else {
            return num
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector)
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        const timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const time = getTime(endTime)
            days.innerHTML = getZero(time.days)
            hours.innerHTML = getZero(time.hours)
            minutes.innerHTML = getZero(time.minutes)
            seconds.innerHTML = getZero(time.seconds)
            if (time.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadline)


    //CARD CLASS
    class CarCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.transfer = 10750
            this.parent = document.querySelector(parentSelector)
            this.classes = classes
            this.changeToUSD()
        }
        changeToUSD() {
            this.price = this.price * this.transfer
        }
        render() {
            const element = document.createElement('div')

            if (this.classes.length === 0) {
                this.classes = 'menu__item'
                element.classList.add(this.classes)
            } else {
                this.classes.forEach(classname => element.classList.add(classname))
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                      <div class="menu__item-cost">Price:</div>
                      <div class="menu__item-total"><span>${this.price}</span> $</div>
                    </div>
                </div>
            `
            this.parent.append(element)
        }
    }
    new CarCard (
        'img/tabs/1.jpg',
        'vegy',
        '2021 Mercedes-Benz C-Class',
        `The 2021 Mercedes-Benz C-Class finishes in the top half of our
              luxury small car rankings. It's powerful and upscale, but it has
              so-so handli...`,
        199000,
        '.menu .container'
    ).render()
    
    new CarCard(
        'img/tabs/4.jpg',
        'elite',
        '2021 Mercedes-Benz CLA-Class',
        `The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant
              interior, and easy-to-use tech features, but it also has a firm
              ride and a ..`,
        299000,
        '.menu .container'
    ).render()

    new CarCard(
        'img/tabs/2.jpg',
        'post',
        '2021 Mercedes-Benz SCLA-Class',
        `The German luxury car-manufacturer has been around for more than a
              century, having elegantly drifted rough curves of automobile.`,
        399000,
        '.menu .container'
    ).render()

    // SLIDER
    const slides = document.querySelectorAll('.offer__slide')
    const prev = document.querySelector('.offer__slider-prev')
    const next = document.querySelector('.offer__slider-next')
    const current = document.querySelector('#current')
    const total = document.querySelector('#total')

    let slideIndex = 1
    show(slideIndex)
    function show(s) {
        if (s > slides.length) {
            slideIndex = 1
        }
        if (s < 1) {
            slideIndex = slides.length
        }
        slides.forEach(item => item.style.cssText = 'display: none')
        slides[slideIndex - 1].style.display = 'block'
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }
    function sliderPlus(s) {
        show(slideIndex += 1)
    }
    function sliderMinus(s) {
        show(slideIndex -= 1)
    }
    prev.addEventListener('click', () => {
        sliderMinus(1)
    })
    next.addEventListener('click', () => {
        sliderPlus(-1)
    })
})
