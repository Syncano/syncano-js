/* global describe, it */

(function () {
    'use strict';
	
	var s;
	var eventsHistory = [];
	var uuid = null;

	
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}


	describe('Syncano', function(){
		beforeEach(function(){
			s = SyncanoConnector.getInstance();
			s.off('all');
			s.on('all', function(type, data){
				eventsHistory.push([type, data]);
			});
		});

		describe('Connection', function(){
			
			// it('should not connect without api_key', function(done){
			// 	try {
			// 		s.connect({
			// 			instance: 'develjs'
			// 		});
			// 	} catch(err){
			// 		done();
			// 	}
			// });
			// 
			// 
			// it('should not connect with wrong api_key', function(done){
			// 	var oneTimeFun = function(){
			// 		setTimeout(done, 1500);
			// 	}
			// 	s.once('syncano:error', oneTimeFun);
			// 	s.connect({
			// 		instance: 'develjs',
			// 		api_key: 'not-the-one'
			// 	});
			// });


			it('should connect with proper instance and api_key', function(done){
				s.connect({
					instance: 'develjs',
					api_key: '2a8fac000d915af306dfc0e8df835619c5445e72'
				}, function(data){
					if(typeof data.uuid !== 'undefined'){
						done();
					} else {
						throw Error('problem with connection');
					}
				});
			});


		    it('trigger event on successful auth', function(){
				lastEvt()[0].should.equal('syncano:auth');
		    });


			it('set uuid', function(){
				uuid = lastEvt()[1][0].uuid;
				uuid.should.not.equal(null);
			});
		});

	});

})();
