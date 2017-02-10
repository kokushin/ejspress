/**
 * EJSPress - gulpfile.js
 */


/**
 * モジュールを読み込み
 */
const
  gulp = require('gulp'),
  fs = require('fs'),
  rename = require('gulp-rename'),
  ejs = require('gulp-ejs');


/**
 * 記事、設定データを読み込み
 */
const
  src = {
    settings: JSON.parse(fs.readFileSync('settings/settings.json', 'utf8')),
    entries: JSON.parse(fs.readFileSync('entries/entries.json', 'utf8'))
  };


/**
 * データをセット
 */
const
  data = {
    settings: src.settings,
    entries: src.entries,
    theme: src.settings.profile.theme
  };


/**
 * `gulp publish` コマンドで書き出し
 */
gulp.task('publish', ['copyAssets', 'compileIndex', 'compileSingle']);


/**
 * アセットをコピー
 */
gulp.task('copyAssets', () => {
  return gulp.src(
    [
      'themes/' + data.theme +'/**/*',
      '!themes/' + data.theme +'/**/*.ejs'
    ],
    {base: 'themes/' + data.theme}
  )
  .pipe(gulp.dest(data.settings.path.publish));
});


/**
 * トップページを生成
 */
gulp.task('compileIndex', () => {
  gulp.src('themes/' + data.theme +'/index.ejs')
    .pipe(ejs({
      settings: data.settings,
      entries: data.entries
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(data.settings.path.publish));
});


/**
 * 個別ページを生成
 */
gulp.task('compileSingle', () => {
  for (let i = 0; i < data.entries.entry.length; i++) {
    gulp.src('themes/' + data.theme +'/single.ejs')
      .pipe(ejs({
        settings: data.settings,
        entries: data.entries.entry[i]
      }))
      .pipe(rename(data.entries.entry[i].id + '.html'))
      .pipe(gulp.dest(data.settings.path.publish + '/' + data.settings.path.entries + '/'));
  }
});