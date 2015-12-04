(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var projectId = 0;
	var collectionId = 0;
	var collectionKey = '';
		
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}

	/**
	 *   
	 *  TEST NOTIFICATIONS MIXIN
	 *
	 */
	describe('Notifications', function(){
		beforeEach(function(){
			s = SyncanoConnector.getInstance();
			s.off('all');
			s.on('all', function(type, data){
				eventsHistory.push([type, data]);
			});
		});

		describe('send', function(){
			it('should not send with wrong type of param apiClientId', function(){
				try {
					s.Notification.send({apiClientId: 'brown'});
				} catch(err){
					err.message.should.equal('notification.send: apiClientId must be a number');
				}
			});
			
			it('should not send with wrong type of param uuid', function(){
				try {
					s.Notification.send({uuid: 7});
				} catch(err){
					err.message.should.equal('notification.send: uuid must be a string');
				}
			});
			
			it('should send with 1 parameter', function(done){
				s.Notification.send(function(res){
					res.should.equal(true);
					done();
				});
			});
			
			it('should send with 2 parameters', function(done){
				s.Notification.send({}, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('getHistory', function(){
			it('should not get history with wrong type of param apiClientId', function(){
				try {
					s.Notification.getHistory({apiClientId: []});
				} catch(err){
					err.message.should.equal('notification.get_history: apiClientId must be a number');
				}
			});
			
			it('should not get history with wrong type of param limit', function(){
				try {
					s.Notification.getHistory({limit: 'big'});
				} catch(err){
					err.message.should.equal('notification.get_history: limit must be a number');
				}
			});
			
			it('should not get history with wrong type of param sinceId', function(){
				try {
					s.Notification.getHistory({sinceId: 'yesterday'});
				} catch(err){
					err.message.should.equal('notification.get_history: sinceId must be a number');
				}
			});
			
			it('should not get history with wrong type of param sinceTime', function(){
				try {
					s.Notification.getHistory({sinceTime: []});
				} catch(err){
					err.message.should.equal('notification.get_history: sinceTime must be a proper date string');
				}
			});
			
			it('should not get history with wrong type of param order', function(){
				try {
					s.Notification.getHistory({order: 7});
				} catch(err){
					err.message.should.equal('notification.get_history: incorrect value of order param - only "asc" and "desc" are allowed');
				}
			});
			
			it('should get history with 1 parameter', function(done){
				s.Notification.getHistory(function(res){
					res.length.should.be.above(0);
					done();
				});
			});
			
			it('should get history with 2 parameters', function(done){
				s.Notification.getHistory({}, function(res){
					res.length.should.be.above(0);
					done();
				});
			});
		});
				
	});
})();