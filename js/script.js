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
})
