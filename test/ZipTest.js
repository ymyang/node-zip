/**
 * Created by yang on 2015/11/25.
 */
var zip = require('../index.js');

describe('zip', function() {
    it.only('zip', function(done) {
        this.timeout(0);
        zip.zip('E:/Temp', 'E:/Temp.zip').then(function() {
            done();
        }).catch(done);
    });
    it('unzip', function(done) {
        zip.unzip('E:/Temp.zip', 'E:/Temp1').then(function() {
            done();
        }).catch(done);
    });
});