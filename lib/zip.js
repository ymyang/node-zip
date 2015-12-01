/**
 * Created by yang on 2015/11/25.
 */
var fs = require('fs');
var Archiver = require('archiver');
var DecompressZip = require('decompress-zip');
var Promise = require('bluebird');

var obj = module.exports = {};

obj.zip = function(src, dest) {
    var destStream = fs.createWriteStream(dest);
    var archive = Archiver('zip');

    return new Promise(function(resolve, reject) {

        // Resolve on close
        destStream.on('close', function () {
            resolve(destStream.path);
        });

        // Reject on Error
        archive.on('error', reject);

        archive.bulk([{
            cwd: src,
            src: ['**/*'],
            expand: true
        }]);

        // Some logs
        archive.on('entry', function (file) {
            console.log('Zipping ' + file.name);
        });

        // Pipe the stream
        archive.pipe(destStream);
        archive.finalize();
    });

};

function _zip(src, dest) {

    var destStream = fs.createWriteStream(dest);
    var archive = Archiver('zip');

    return new Promise(function(resolve, reject) {

        // Resolve on close
        destStream.on('close', function () {
            resolve(destStream.path);
        });

        // Reject on Error
        archive.on('error', reject);

        archive.glob(src);

        // Some logs
        archive.on('entry', function (file) {
            //console.log('Zipping ' + file.name);
        });

        // Pipe the stream
        archive.pipe(destStream);
        archive.finalize();

    });
}

obj.unzip = function(src, dest) {
    return new Promise(function(resolve, reject) {
        try {
            var unzipper = new DecompressZip(src);

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
                path: dest
            });
        } catch(err) {
            reject(err);
        }
    });
};