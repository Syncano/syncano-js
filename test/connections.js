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
	 *  TEST CONNECTIONS MIXIN
	 *
	 */
	describe('Connections', function(){
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

		describe('get', function(){
			it('should not get with wrong type apiClientId param', function(){
				try {
					s.Connection.get({apiClientId: 'num'});
				} catch(err){
					err.message.should.equal('connection.get: apiClientId must be a number');
				}
			});
			
			it('should not get with wrong type sinceId param', function(){
				try {
					s.Connection.get({sinceId: 'num'});
				} catch(err){
					err.message.should.equal('connection.get: sinceId must be a number');
				}
			});
			
			it('should not get with wrong type limit param', function(){
				try {
					s.Connection.get({limit: 'num'});
				} catch(err){
					err.message.should.equal('connection.get: limit must be a number');
				}
			});
			
			it('should not get with wrong type name param', function(){
				try {
					s.Connection.get({name: []});
				} catch(err){
					err.message.should.equal('connection.get: name must be a string');
				}
			});
			
			it('should get identities with one param', function(done){
				s.Connection.get(function(res){
					res.length.should.be.above(0);
					done();
				});
			});
			
			it('should get identities with two params', function(done){
				s.Connection.get({}, function(res){
					res.length.should.be.above(0);
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