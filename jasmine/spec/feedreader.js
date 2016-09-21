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
        // Test that allFeeds is defined.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Test that all entries in allFeeds have a URL.
        it('have a URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });
        // Test that all entries in allFeeds have a name.
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
        // Check that the navigation menu appears and hides when hamburger is clicked
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
        // At least one entry in the feed is loaded upon initialization.
        it('contains at least a single .entry element in the .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feed1;
        var feed2;
        // Store part of the data in initial feed in var feed1.
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed')[0].outerText;
                done();
            });
        });
        // Store part of the data in new feed in var feed2 and compare to feed1.
        it('actually changes the content', function(done) {
            loadFeed(1, function(){
                feed2 = $('.feed')[0].outerText;
                expect(feed1 == feed2).toBeFalsy();
                done();
            });
        });
    });
}());
