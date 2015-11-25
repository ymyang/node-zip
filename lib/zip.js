/**
 * Created by yang on 2015/11/25.
 */
var Archiver = require('archiver');
var ArchiverZip = require('archiver-zip');
var DecompressZip = require('decompress-zip');
var Promise = require('bluebird');

var obj = module.exports = {};

obj.zip = function(options) {
    try {
        new Archiver('zip')
            .src(options.src)
            .pipe(archive.dest(options.dest))
            .use(ArchiverZip())
            .run();
        return Promise.resolve();
    } catch(err) {
        return Promise.reject(err);
    }
};

obj.unzip = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            var unzipper = new DecompressZip(options.src);

            unzipper.on('error', function (err) {
                reject(err);
            });

            unzipper.on('extract', function (log) {
                resolve();
            });

            unzipper.on('progress', function (fileIndex, fileCount) {
                // TODO
                // console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
            });

            unzipper.extract({
                path: options.dest,
                filter: options.filter
            });
        } catch(err) {
            reject(err);
        }
    });
};