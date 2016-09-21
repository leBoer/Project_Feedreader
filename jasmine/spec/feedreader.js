/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have a name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The Menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('change visibility when menu icon is clicked', function() {
            if ($('body').hasClass('menu-hidden')) {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBeFalsy()
            } else {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBeTruthy()
            }
            // Reset the body class to menu-hidden
            $('body').toggleClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done)
        });
        it('contains at least a single .entry element in the .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feed1;
        var feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed')[0].outerText;
                done();
            });
        });

        it('actually changes the content', function(done) {
            loadFeed(1, function(){
                feed2 = $('.feed')[0].outerText;
                expect(feed1 == feed2).toBeFalsy();
                done();
            });
        });
    });
}());
