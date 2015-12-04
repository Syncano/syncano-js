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
	 *  TEST SUBSCTIPTION MIXIN
	 *
	 */
	describe('Subscriptions', function(){
		beforeEach(function(){
			s = SyncanoConnector.getInstance();
			s.off('all');
			s.on('all', function(type, data){
				eventsHistory.push([type, data]);
			});
		});
		
		describe('setup start', function(){
			it('should get default project id', function(done){
				projectId = 0;
				s.Project.get(function(list){
					list.forEach(function(p){
						if(p.name == 'Default'){
							projectId = p.id | 0;
						}
					});
					projectId.should.not.equal(0);
					done();
				});
			});
			
			it('should create test collection and save its id / key', function(done){
				var name = 'Test collection',
					key = 'colkey';
				s.Collection.new(projectId, name, {key: key}, function(rec){
					collectionId = rec.id | 0;
					collectionKey = rec.key;
					rec.name.should.equal(name);
					done();
				});
			});
			
			it('should activate test collection', function(){
				s.Collection.activate(projectId, collectionId, function(res){
					res.should.equal(true);
					done();
				});
			})
		});

		describe('subscribeProject', function(){
			it('should not subscribe without projectId', function(){
				try {
					s.Subscription.subscribeProject();
				} catch(err){
					err.message.should.equal('projectId must be defined');
				}
			});
			
			it('should subscribe', function(done){
				s.Subscription.subscribeProject(projectId, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('unsubscribeProject', function(){
			it('should not unsubscribe without projectId', function(){
				try {
					s.Subscription.unsubscribeProject();
				} catch(err){
					err.message.should.equal('projectId must be defined');
				}
			});
			
			it('should unsubscribe', function(done){
				s.Subscription.unsubscribeProject(projectId, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('subscribeCollection', function(){
			it('should not subscribe without projectId', function(){
				try {
					s.Subscription.subscribeCollection();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not subscribe without collectionId', function(){
				try {
					s.Subscription.subscribeCollection(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should subscribe to collection', function(done){
				s.Subscription.subscribeCollection(projectId, collectionId, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('get', function(){
			it('should get subscriptions with one param', function(done){
				s.Subscription.get(function(res){
					res.length.should.be.above(0);
					done();
				});
			});
			
			it('should get subscriptions with two params', function(done){
				s.Subscription.get(undefined, function(res){
					res.length.should.be.above(0);
					done();
				});
			});
		});
		
		describe('unsubscribeCollection', function(){
			it('should not unsubscribe without projectId', function(){
				try {
					s.Subscription.unsubscribeCollection();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not unsubscribe without collectionId', function(){
				try {
					s.Subscription.unsubscribeCollection(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should unsubscribe from collection', function(done){
				s.Subscription.unsubscribeCollection(projectId, collectionId, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		
		describe('setup - finish', function(){
			it('should remove created collection', function(done){
				s.Collection.delete(projectId, collectionId, function(rec){
					rec.should.equal(true);
					done();
				});
			});
		});
		
	});
})();