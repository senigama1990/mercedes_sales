window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const loader = document.querySelector('.loader')
        loader.style.opacity = '0'
        setInterval(function () {
            loader.style.display = 'none'
        }, 500)
    }, 1000)
})