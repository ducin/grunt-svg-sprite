'use strict';

var grunt			= require('grunt'),
svg2png				= require('svg2png'),
imageDiff			= require('image-diff');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.svgsprite = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  spriteCSS: function (test) {
    test.expect(1);
    var actual		= grunt.file.read('tmp/css/sprite.css'),
    expected		= grunt.file.read('test/expected/spriteCSS.css');
    test.equal(actual, expected, 'should be the default CSS output.');
    test.done();
  },
  spriteSass: function (test) {
    test.expect(1);
    var actual		= grunt.file.read('tmp/sass/_sprite.scss'),
    expected		= grunt.file.read('test/expected/spriteSass.scss');
    test.equal(actual, expected, 'should be the default Sass output.');
    test.done();
  },
  spritePng: function(test) {
    test.expect(5);
    svg2png('tmp/css/svg/sprite.svg', 'tmp/css/svg/sprite.png', function(error) {
      test.ifError(error);
      imageDiff({
        actualImage: 'tmp/css/svg/sprite.png',
        expectedImage: 'tmp/css/svg/sprite.png',
        diffImage: 'tmp/css/svg/sprite.diff.png'
      }, function (error, imagesAreSame) {
        test.ifError(error);
        test.ok(imagesAreSame, 'should report no differences between the actual and the expected sprite');
        imageDiff({
          actualImage: 'tmp/css/svg/sprite.png',
          expectedImage: 'tmp/css/svg/sprite.dot.png',
          diffImage: 'tmp/css/svg/sprite.dot.diff.png'
        }, function (error, imagesAreSame) {
          test.ifError(error);
          test.ok(!imagesAreSame, 'should report some differences between the actual and the expected sprite');
          test.done();
        });
      });
    });
  }
};
