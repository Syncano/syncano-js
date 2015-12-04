(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var projectId = 0;
	var collectionId = 0;
	var collectionKey = '';
	var userId = 0;
	var nick = 'nick1';
	var userName = 'User1';
		
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}

	/**
	 *   
	 *  TEST USER MIXIN
	 *
	 */
	describe('User', function(){
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

		describe('new', function(){
			it('should not create user without name', function(){
				try {
					s.User.new();
				} catch(err){
					err.message.should.equal('user must have a name');
				}
			});
			
			it('should create user with nick', function(done){
				s.User.new(userName, nick, function(res){
					res.nick.should.equal(nick);
					done();
				});
			});
			
			it('should create user without nick', function(done){
				var name = 'User2';
				s.User.new(name, null, function(res){
					res.name.should.equal(name);
					userId = res.id | 0;
					done();
				});
			});
		});

		describe('get', function(){
			it('should not get users without projectId given', function(){
				try {
					s.User.get();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not get users without collection given', function(){
				try {
					s.User.get(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not get users with wrong state param', function(){
				try {
					s.User.get(projectId, collectionId, {state: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not get users with wrong filter param', function(){
				try {
					s.User.get(projectId, collectionId, {filter: 'everything'});
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should get users', function(done){
				s.User.get(projectId, collectionId, {}, function(res){
					done();
				})
			});
		});

		describe('getOne', function(){
			it('should not get user without parameters', function(){
				try {
					s.User.getOne();
				} catch(err){
				err.message.should.equal('user id or name must be passed');
				}
			});
			
			it('should not get user with wrong param type', function(){
				try {
					s.User.getOne([]);
				} catch(err){
					err.message.should.equal('incorrect type of user param');
				}
			});
			
			it('should get user identified by name', function(done){
				s.User.getOne(userName, function(res){
					res.name.should.equal(userName);
					done();
				});
			});
			
			it('should get user identified by id', function(done){
				s.User.getOne(userId, function(res){
					res.id.should.equal(userId + '');
					done();
				});
			});
		});
		
		describe('update', function(){
			it('should not update user without name given', function(){
				try {
					s.User.update();
				} catch(err){
					err.message.should.equal('user id or name must be passed');
				}
			});
			
			it('should not update user with wrong param type', function(){
				try {
					s.User.update([]);
				} catch(err){
					err.message.should.equal('incorrect type of user param');
				}
			});
			
			it('should not update user without nick given', function(){
				try {
					s.User.update(userId);
				} catch(err){
					err.message.should.equal('nick must be given');
				}
			});
			
			it('should update user', function(done){
				var n = 'newnick';
				s.User.update(userId, n, function(res){
					res.nick.should.equal(n);
					done();
				})
			});
		});
		
		describe('count', function(){
			it('should not count users with wrong collection param', function(){
				try {
					s.User.count({collection: []})
				} catch(err){
					err.message.should.equal('collection identifier must be a string (key) or number (id)');
				}
			});
			
			it('should not count users with wrong state param', function(){
				try {
					s.User.count({state: 'awesome'})
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not count users with wrong filter param', function(){
				try {
					s.User.count({filter: 'both'})
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should count all users', function(done){
				s.User.count({}, function(){
					done();
				});
			});
		});
		
		describe('delete', function(){
			it('should not delete user without identifier given', function(){
				try {
					s.User.delete();
				} catch(err){
					err.message.should.equal('user identifier must be given');
				}
			});
			
			it('should delete user with id given', function(done){
				s.User.delete(userId, function(res){
					res.should.equal(true);
					done();
				});
			});
			
			it('should delete user with name given', function(done){
				s.User.delete(userName, function(res){
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