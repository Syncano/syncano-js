### Change Log
* **1.0.14** - 2016-05-30
    * Solutions management
* **1.0.13** - 2016-05-30
    * Test release for new deployment workflow
* **1.0.12** - 2016-05-30
    * Small validation changes
    * Small changes in `removeCertificate()` method in APNSConfig
    * Backup listing functionality
* **1.0.11** - 2016-05-27
    * Subscription management
    * Usage management
    * Plan management
    * Profile management
    * Card management
    * Restore backup functionality
* **1.0.10** - 2016-05-17
    * Backups management
    * Invoice management
    * `hasPrev()` and `hasNext()` helper methods
    * `removeCertificate()` method for APNSConfig
* **1.0.9** - 2016-05-12
    * Script traces fix
    * Small fix in generated docs
* **1.0.8** - 2016-05-06
    * Syncano user account bugfixes
    * Added `update()` and `delete()` methods to Admin model `QuerySet`
    * Added `delete()` method to User model `QuerySet`
    * Fixed `schema` field validation in Class model
    * Fixed `getRuntimes()` method in Script model
* **1.0.7** - 2016-05-04
    * Syncano user account methods
* **1.0.6** - 2016-04-21
    * Enable setting of default properties for the main object
    * Raw request response can now be accessed
    * User model methods for groups
    * APNS and GCM missing methods
    * FuseTools build
* **1.0.5** - 2016-04-10
    * Fix for Class model validations
    * `getUSerDetails()` method for Group model
* **1.0.4** - 2016-04-07
    * Group model methods for getting, adding and removing users
* **1.0.3** - 2016-03-30
    * React native support
    * Support for `QuerySet` count method
    * Build pipeline
* **1.0.2** - 2016-03-22
    * New version which supports v1.1 API and new naming
* **0.4.8** - 2016-03-11
    * Fixed `prev` and `next` methods in query results
* **0.4.7** - 2016-01-19
    * Added the ability to listen to connection status change
* **0.4.6** - 2016-01-12
    * Quick fix for browser FormData
* **0.4.5** - 2015-12-18
    * Integration with [Fuse](https://www.fusetools.com/)
* **0.4.4** - 2015-12-16
    * Hot fix for `FormData`
* **0.4.3** - 2015-12-14
    * Polyfill for `FormData`
* **0.4.2** - 2015-12-09
    * Fixed the `register` method in the node environment
* **0.4.1** - 2015-12-07
    * Added support for the `include_count` parameter to retreive dataobject count
* **0.4.0** - 2015-12-07
    * Added the possibility to upload files from both the server and browser environments
* **0.3.5** - 2015-11-27
    * Fixed bug with not being able to create Syncano users with social media credentials
* **0.3.4** - 2015-11-13
    * Fixed bug with callback function checking, breaking callback functions.
* **0.3.3** - 2015-11-07
    * _Actually_ Fixed Bug with `update` method
* **0.3.2** - 2015-11-04
    * ~~Fixed Bug with `update` method~~ Introduced `update` method bug
* **0.3.1** - 2015-11-04
    * Fixed Various Small Bugs
      * Corrected issue with `no content` responses being parsed incorrectly
      * Fixed social authentication issue from api changes
* **0.3.0** - 2015-10-26
    * Added `watch()` functionality for channels
      * Using the watch() function now emits events for channel updates.
    * Dependency reduction
      * Implemented changes to remove lodash and request deps.
      * Reduced overall size of library
    * Paging Support
      * Results with multiple pages now return a `next()` and `prev()` function for paging results.
    * Fixed Various Small Bugs
      * BaseUrl with Empty Scope not working
      * Some errors not being properly returned
* **0.2.6** - 2015-08-19
    * Added gulp-bump for versioning
* **0.2.5** - 2015-08-12
    * Fixes minification error with instances
* **0.2.4** - 2015-08-06
    * Fixed bug in standalone `syncano.js`
      * Added `browserify-shim` to get global modules for `Promise` and `_`
    * Updated `package.json` with additinal fields
    * Corrected version mismatch in bower module.
* **0.2.3** - 2015-08-04
    * Fixed token bug with social login
    * Corrected `user().group` and `group().user` pattern
      * Did not follow chainable method pattern
      * Now `user().group()` and `group().user()`
    * Added filter options `lastId` and `room`
      * Used with `channel().poll()` and `channel().history()`
    * Updated testing
* **0.2.2** - 2015-07-30
    * Added `baseUrl` to config
        * `new Syncano({baseUrl: 'http://newurl.com'});`
        * allows for testing with sandbox acocunt
    * Updated testing
* **0.2.1** - 2015-07-29
    * Added debug feature
        * `new Syncano({debug: true});``
        * Returns request response object in res.debug
    * Added check for query or filter when filtering data objects.
    * Fixed bug with query being encoded incorrectly
* **0.2.0** - 2015-07-28
    * complete overhaul of the library
    * removed dependancies from syncnano.js
      * syncano.js now depends on bluebird and lodash for client-side
    * completed unit testing
* **0.1.9** - 2015-07-07
    * added client side dist folder with minified and map versions
* **0.1.8** - 2015-07-06
    * added core functionality for instance level operations
    * unit testing for main functions started
