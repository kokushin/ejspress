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
gulp.task('publish', ['compile_index', 'compile_single']);


/**
 * トップページを生成
 */
gulp.task('compile_index', () => {
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
gulp.task('compile_single', () => {
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