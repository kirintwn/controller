/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const ffmpeg = require('fluent-ffmpeg');
const through = require('through2');
const log = require('fancy-log');
const prettyBytes = require('pretty-bytes');
const chalk = require('chalk');

const VIDEO_EXT = ['.mp4', '.mkv', '.mov', '.webm', '.avi', '.flv'];
const AUDIO_EXT = ['.mp3', '.aac', '.m4a', '.wav', '.ogg'];
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];

const extToGlob = (arr) =>
  arr.reduce((prev, curr) => `${prev}${curr},`, '').slice(0, -1);

const genSavedMsg = (srcSize, dstSize) => {
  const saved = srcSize - dstSize;
  const percent = srcSize > 0 ? (saved / srcSize) * 100 : 0;
  return `saved ${prettyBytes(saved)} - ${percent
    .toFixed(1)
    .replace(/\.0$/, '')}%`;
};

const logFailedMsg = (plugin, fileStr, errMsg) => {
  log(
    `${plugin}:`,
    chalk.red('✘ ') + fileStr + chalk.gray(`An error occurred: ${errMsg}`),
  );
};

gulp.task('image', () =>
  gulp
    .src(`assets/raw/*{${extToGlob(IMAGE_EXT)}}`)
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 8 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
          }),
        ],
        {
          verbose: true,
        },
      ),
    )
    .pipe(gulp.dest('assets/')),
);

gulp.task('media', () => {
  const plugin = 'gulp-mediamin';
  let totalFiles = 0;
  let totalSrcSize = 0;
  let totalDstSize = 0;
  return gulp
    .src(`assets/raw/*{${extToGlob(VIDEO_EXT.concat(AUDIO_EXT))}}`)
    .pipe(
      // eslint-disable-next-line consistent-return
      through.obj((file, enc, cb) => {
        const outputPath = 'assets/';
        const ext = path.extname(file.path);
        const fileName = path.basename(file.path, ext);
        let dstPath;
        if (VIDEO_EXT.includes(ext)) {
          dstPath = `${outputPath}${fileName}.mp4`;
        } else if (AUDIO_EXT.includes(ext)) {
          dstPath = `${outputPath}${fileName}.mp3`;
        } else {
          logFailedMsg(plugin, file.relative, 'FILE_NOT_SUPPORTED');
          return cb();
        }

        let cmd = ffmpeg()
          .addInput(file.path)
          .audioBitrate('128k')
          .audioChannels(2)
          .audioCodec('libmp3lame')
          .output(dstPath)
          .on('error', (err) => {
            logFailedMsg(plugin, file.relative, err.message);
            return cb();
          })
          .on('end', () => {
            const srcSize = file.contents.length;
            const dstSize = fs.statSync(dstPath).size;
            log(
              `${plugin}:`,
              chalk.green('✔ ') +
                file.relative +
                chalk.gray(` (${genSavedMsg(srcSize, dstSize)})`),
            );

            totalFiles += 1;
            totalSrcSize += srcSize;
            totalDstSize += dstSize;
            return cb();
          });

        if (VIDEO_EXT.includes(ext)) {
          cmd = cmd
            .videoCodec('libx264')
            .videoBitrate('1500k')
            .outputOptions('-crf 20')
            .format('mp4');
        }
        if (AUDIO_EXT.includes(ext)) {
          cmd = cmd.format('mp3');
        }
        cmd.run();
      }),
    )
    .on('end', () => {
      log(
        `${plugin}:`,
        `Minified ${totalFiles} media`,
        chalk.gray(` (${genSavedMsg(totalSrcSize, totalDstSize)})`),
      );
    });
});

gulp.task('assets', gulp.parallel('image', 'media'));

gulp.task('watch', () => gulp.watch('assets/raw/**', gulp.series('assets')));

gulp.task('default', gulp.series('assets'));
