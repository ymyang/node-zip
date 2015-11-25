/**
 * Created by yang on 2015/11/25.
 */
var zip = require('../index.js');

describe('zip', function() {
    it('zip', function(done) {
        zip.zip({
            src: 'E:/Temp/*.jpg',
            dest: 'E:/Temp.zip'
        }).then(function() {
            done();
        }).catch(done);
    });
    it.only('unzip', function(done) {
        zip.unzip({
            src: 'E:/Temp.zip',
            dest: 'E:/Temp1',
            filter: function(f) {
                return f.type !== "SymbolicLink";
            }
        }).then(function() {
            done();
        }).catch(done);
    });
});