lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/ef8c6887-7fcf-4a8c-8706-8aff23d63126/nPAaYG4XY2.json'
});


let loader = lottie.loadAnimation({
    container: document.getElementById('loader-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'https://assets2.lottiefiles.com/packages/lf20_usmfx6bp.json'
});


$('form').on('submit', function () {
    $('#loader-overlay').fadeIn(200);
    loader.play();
});

// Auto Suggest Feature
$(document).ready(function () {
    let $input = $('input[name="title"]');
    let $form = $input.closest('form');

    $input.after('<div class="suggestion-box" id="suggestion-box"></div>');
    let $suggestionBox = $('#suggestion-box');

    $input.on('input', function () {
        let query = $(this).val();
        if (query.length < 2) {
            $suggestionBox.hide();
            return;
        }

        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=48d5017`)
            .then(res => res.json())
            .then(data => {
                if (data.Search) {
                    let suggestions = data.Search.map(movie => `
                        <div data-title="${movie.Title}">${movie.Title} (${movie.Year})</div>
                    `).join('');
                    $suggestionBox.html(suggestions).show();
                } else {
                    $suggestionBox.hide();
                }
            });
    });

    $suggestionBox.on('click', 'div', function () {
        let title = $(this).data('title');
        $input.val(title);
        $suggestionBox.hide();
        $form.submit();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.suggestion-box, input[name="title"]').length) {
            $suggestionBox.hide();
        }
    });

    const switchHtml = `
        <div class="custom-control custom-switch ml-3">
            <input type="checkbox" class="custom-control-input" id="darkModeSwitch">
            <label class="custom-control-label text-dark" for="darkModeSwitch"></label>
        </div>
    `;
    $('.navbar .navbar-nav').after(switchHtml);

    const $darkModeSwitch = $('#darkModeSwitch');
    const $darkModeLabel = $('.custom-control-label');

    function applyTheme(theme) {
        if (theme === 'dark') {
            $('body').addClass('dark-mode');
            $darkModeSwitch.prop('checked', true);
            $darkModeLabel.removeClass('text-dark').addClass('text-light');
            $('.navbar').removeClass('bg-light navbar-light').addClass('bg-dark navbar-dark');
        } else {
            $('body').removeClass('dark-mode');
            $darkModeSwitch.prop('checked', false);
            $darkModeLabel.removeClass('text-light').addClass('text-dark');
            $('.navbar').removeClass('bg-dark navbar-dark').addClass('bg-light navbar-light');
        }
    }

    $darkModeSwitch.on('change', function () {
        const theme = this.checked ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});
