// !!! Для начала проэкта:
// >npm i

// !!! Для запуска cборщика:
// gulp

// !!!! Для завершения проэкта в терминале вводим в ручную
// что-бы не нагружать проэкт:
// gulp build

const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileInclude = require("gulp-file-include");
// const { notify } = require('browser-sync');

// Функции
// функция для работы с локальным сервером.
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/" // какую папку обновлять
        }
    });
}

// функция для работы с html.
function html() {
    return src('app/html/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML", // где ошибка
                message: error.message // какая ошибка.
            })) // выводит всплывающее окно
        })) // позволяет перехватывать все ошибки
        .pipe(fileInclude()) // Работа с шаблонами в html.
        .pipe(dest('app')) // сохранения файла
        .pipe(browserSync.stream());
}

// функция конвертации с SCSS в CSS
function styles() {
    // путь к рабочей папке.
    return src('app/scss/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS", // где ошибка
                message: error.message // какая ошибка.
            })) // выводит всплывающее окно
        })) // позволяет перехватывать все ошибки
        // действия с этим файлом
        .pipe(scss({ outputStyle: 'expanded' })) // 'expanded' не сжимает
        .pipe(dest('app/css')) // сохроняем куда
        .pipe(scss({ outputStyle: 'compressed' })) // конвертируем 'compressed' сжимает
        .pipe(concat('style.min.css')) // меняем имя файла
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        })) // выставляет автопрефиксы 10 версий.
        .pipe(dest('app/css')) // сохроняем куда
        .pipe(browserSync.stream()) // обновляем локальный сервер.
}

// функция сжимает все файлы js в прописаной последовательности.
function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.js', // путь к JQuery
        // 'app/js/burger-menu.js',
        // 'app/js/file.js'
        'app/js/**/*.js', '!app/js/file.min.js' // за всеми папками и вложинастями js(! - кроме)
    ])
        .pipe(concat('file.min.js')) // объединяем эти файлы в один и меняем имя.
        .pipe(uglify()) // сжимаем
        .pipe(dest('app/js')) // сохраняем в папку js.
        .pipe(browserSync.stream()) // обновляем локальный сервер.
}

// функция для работы с image.
function images() {
    return src('app/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}

// функция удаляющая папку dist.
function cleanDist() {
    return del('dist')
}

// функция сбора конечного файла в папке dist.
function build() {
    return src([
        'app/css/style.css',
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/file.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}
// Отслеживание изменений.
function watching() {
    watch(['app/scss/**/*.scss'], styles) // за всеми папками и вложинастями scss
    watch(['app/js/**/*.js', '!app/js/file.min.js'], scripts) // за всеми папками и вложинастями js(! - кроме)
    watch(["app/html/**/*.html"], html).on('change', browserSync.reload); // при изменении в html перегружает всю страницу.
}

// Экспортирует задачи
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.html = html;

// выполняет последовательные задачи для завершение проэкта.
exports.build = series(cleanDist, images, build);
// выполняем задачу по умолчанию при запуске gulp
// и запускаются паралельные задачи.
exports.default = parallel(html, styles, scripts, browsersync, watching)