(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var uuid = null;
	var projectId = 0;
	var collectionId = 0;
	var collectionKey = '';
	
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}

	/**
	 *   
	 *  TEST COLLECTION MIXIN
	 *
	 */
	describe('Collection', function(){
		beforeEach(function(){
			s = SyncanoConnector.getInstance();
			s.off('all');
			s.on('all', function(type, data){
				eventsHistory.push([type, data]);
				//console.log(type, data);
			});
			s.on('syncano:error', function(e){
				console.warn(e);
			});
		});
		
		
		it('should get default project id', function(done){
			projectId = null;
			s.Project.get(function(list){
				list.forEach(function(p){
					if(p.name == 'Default'){
						projectId = p.id | 0;
					}
				});
				projectId.should.not.equal(null);
				done();
			});
		});
		
		/**
		 *   new
		 */
		describe('new', function(){
			it('should not create collection without a projectId', function(done){
				try {
					s.Collection.new();
				} catch(err){
					err.message.should.equal('projectId must be a number');
					done();
				}
			});
		
		
			it('should not create collection without a name', function(done){
				try {
					s.Collection.new(projectId);
				} catch(err){
					err.message.should.equal('collection.new: name must be set');
					done();
				}
			});


			it('should create new collection in default project', function(done){
				var n = 'New collection',
					k = 'collkey',
					d = 'Sample collection created by mocha test framework';
				s.Collection.new(projectId, n, {key:k, description:d}, function(rec){
					collectionId = rec.id | 0;
					collectionKey = rec.key;
					rec.name.should.equal(n);
					done();
				});
			});


		    it('should trigger event on collection creation', function(){
				lastEvt()[0].should.equal('syncano:collection:new');
		    });


			it('should set collection id', function(){
				collectionId.should.not.equal(0);
			});
		});


		/**
		 *   get
		 */
		describe('get', function(){
			it('should find created collection on a list', function(done){
				s.Collection.get(projectId, {}, function(list){
					list.forEach(function(c){
						if(c.id == collectionId){
							done();
						}
					});
				});
			});


			it('should throw an error when improper status is passed to Collection.get', function(){
				var err = '';
				try {
					s.Collection.get(projectId, {status: 'wrong'});
				} catch(e){
					err = e;
				}
				err.should.not.equal(null);
			});


		    it('should trigger event on collection list', function(){
				lastEvt()[0].should.equal('syncano:collection:get');
		    });
		});


		/**
		 *   activate
		 */
		describe('activate', function(){
			it('should throw an error when projectId is not given in activate method', function(){
				try {
					s.Collection.activate();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
			it('should throw an error when collection identifier is not given in activate method', function(){
				try {
					s.Collection.activate(projectId);
				} catch(err){
					err.message.should.equal('collection.activate: collectionId must be a number');
				}
			});
			
			it('should throw an error when collection identifier is not a number', function(){
				try {
					s.Collection.activate(projectId, 'fake_param');
				} catch(err){
					err.message.should.equal('collection.activate: collectionId must be a number');
				}
			});
			
			it('should activate collection', function(){
				s.Collection.activate(projectId, collectionId, function(res){
					res.should.equal(true);
					done();
				});
			});
		});


		/**
		 *   getOne
		 */
		describe('getOne', function(){
			it('should get created collection by key', function(done){
				s.Collection.getOne(projectId, collectionKey, function(rec){
					var id = rec.id | 0;
					id.should.equal(collectionId);
					done();
				});
			});


			it('should get created collection by id', function(done){
				s.Collection.getOne(projectId, collectionId, function(rec){
					var id = rec.id | 0;
					id.should.equal(collectionId);
					done();
				});
			});


		    it('should trigger event on collection get', function(){
				lastEvt()[0].should.equal('syncano:collection:get_one');
		    });
		});


		/**
		 *   deactivate
		 */
		describe('deactivate', function(){
			it('should throw an error when projectId is not given in deactivate method', function(){
				try {
					s.Collection.deactivate();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
			it('should throw an error when collection identifier is not given in deactivate method', function(){
				try {
					s.Collection.deactivate(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should deactivate collection', function(done){
				s.Collection.deactivate(projectId, collectionId, function(res){
					res.should.equal(true);
					done();
				});
			})
		});
		
		
		/**
		 *   update
		 */
		describe('update', function(){
			it('should throw an error when projectId is not given in update method', function(){
				try {
					s.Collection.update();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
			it('should throw an error when collection identifier is not given in update method', function(){
				try {
					s.Collection.update(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
		
			it('should not throw error when no name and description are passed to update method', function(done){
				s.Collection.update(projectId, collectionId, {}, function(res){
					done();
				});
			});
		});
		
		/**
		 *   addTag
		 */
		describe('addTag', function(){
			it('should throw an error when projectId is not given in addTag method', function(){
				try {
					s.Collection.addTag();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
			it('should throw an error when collection identifier is not given in addTag method', function(){
				try {
					s.Collection.addTag(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
		
			it('should throw an error when no tags are passed in addTag method', function(){
				try {
					s.Collection.addTag(projectId, collectionId);
				} catch(err){
					err.message.should.equal('collection.add_tag: tags must be passed');
				}
			});
		
			it('should not allow to pass non-ascii characters in addTag method', function(){
				try {
					s.Collection.addTag(projectId, collectionId, 'żółć');
				} catch(err){
					err.message.should.equal('collection.add_tag: non ascii characters found in tag name');
				}
			});
		
			it('should add tag passed as string', function(done){
				s.Collection.addTag(projectId, collectionId, 'tag1', function(res){
					done();
				});
			});
		
			it('should add tags passed as array', function(done){
				s.Collection.addTag(projectId, collectionId, ['tag2', 'tag3'], function(res){
					done();
				});
			});
		
			it('should add tag passed with additional weight param', function(done){
				s.Collection.addTag(projectId, collectionId, 'tag4', {weight: 8}, function(res){
					done();
				});
			});
		});
		
		
		/**
		 *   deleteTag
		 */
		describe('deleteTag', function(){
			it('should throw an error when projectId is not given in deleteTag method', function(){
				try {
					s.Collection.deleteTag();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
			it('should throw an error when collection identifier is not given in deleteTag method', function(){
				try {
					s.Collection.deleteTag(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
		
			it('should throw an error when no tags are passed in deleteTag method', function(){
				try {
					s.Collection.deleteTag(projectId, collectionId);
				} catch(err){
					err.message.should.equal('collection.delete_tag: tags must be passed');
				}
			});
		
			it('should not allow to pass non-ascii characters in deleteTag method', function(){
				try {
					s.Collection.deleteTag(projectId, collectionId, 'żółć');
				} catch(err){
					err.message.should.equal('collection.delete_tag: non ascii characters found in tag name');
				}
			});
		
			it('should delete tag passed as string', function(done){
				s.Collection.deleteTag(projectId, collectionId, 'tag1', function(res){
					done();
				});
			});
		
			it('should delete tags passed as array', function(done){
				s.Collection.deleteTag(projectId, collectionId, ['tag2','tag3','tag4'], function(res){
					done();
				});
			});
		});
		
		
		/**
		 *   delete
		 */
		describe('delete', function(){
			it('should not delete collection without projectId', function(){
				try {
					s.Collection.delete();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
		
		
			it('should not delete collection without collectionId', function(){
				try {
					s.Collection.delete(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});


			it('should delete created collection', function(done){
				s.Collection.delete(projectId, collectionId, function(rec){
					rec.should.equal(true);
					done();
				});
			});


		    it('should trigger event on collection deletion', function(){
				lastEvt()[0].should.equal('syncano:collection:delete');
		    });
		});
	});
	
	
})();