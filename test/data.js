(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var projectId = 0;
	var collectionId = 'default';
	var collectionKey = 'default';
	var dataIds = [];
	var dataKey = 'datakey';
	
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}

	/**
	 *   
	 *  TEST DATA MIXIN
	 *
	 */
	describe('Data', function(){
		beforeEach(function(){
			s = SyncanoConnector.getInstance();
			s.off('all');
			s.on('all', function(type, data){
				eventsHistory.push([type, data]);
			});
			// s.on('syncano:error', function(e){
// 				console.warn(e);
// 			});
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
			it('should not create data without project identifier', function(){
				try {
					s.Data.new();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not create data without collection identifier', function(){
				try {
					s.Data.new(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not create data with wrong dataKey param', function(){
				try {
					s.Data.new(projectId, collectionId, {dataKey: []});
				} catch(err){
					err.message.should.equal('dataKey must be a string');
				}
			});
			
			it('should not create data with wrong userName param', function(){
				try {
					s.Data.new(projectId, collectionId, {userName: {}});
				} catch(err){
					err.message.should.equal('userName must be a string');
				}
			});
			
			it('should not create data with wrong sourceUrl param', function(){
				try {
					s.Data.new(projectId, collectionId, {sourceUrl: function(){}});
				} catch(err){
					err.message.should.equal('sourceUrl must be a string');
				}
			});
			
			it('should not create data with wrong title param', function(){
				try {
					s.Data.new(projectId, collectionId, {title: 9});
				} catch(err){
					err.message.should.equal('title must be a string');
				}
			});
			
			it('should not create data with wrong text param', function(){
				try {
					s.Data.new(projectId, collectionId, {text: []});
				} catch(err){
					err.message.should.equal('text must be a string');
				}
			});
			
			it('should not create data with wrong link param', function(){
				try {
					s.Data.new(projectId, collectionId, {link: []});
				} catch(err){
					err.message.should.equal('link must be a string');
				}
			});
			
			it('should not create data with wrong image param', function(){
				try {
					s.Data.new(projectId, collectionId, {image: []});
				} catch(err){
					err.message.should.equal('image must be a string');
				}
			});
			
			it('should not create data with wrong imageUrl param', function(){
				try {
					s.Data.new(projectId, collectionId, {imageUrl: []});
				} catch(err){
					err.message.should.equal('imageUrl must be a string');
				}
			});
			
			it('should not create data with wrong folder param', function(){
				try {
					s.Data.new(projectId, collectionId, {folder: []});
				} catch(err){
					err.message.should.equal('folder must be a string');
				}
			});
			
			it('should not create data with non-existing folder param', function(done){
				var fname = 'this-folder-doesnt-exist-for-sure-' + (+new Date());
				s.once('syncano:error', function(err){
					err[0].should.equal('DoesNotExist: Folder matching query does not exist');
					done();
				});
				s.Data.new(projectId, collectionId, {folder: fname});
			});
			
			it('should not create data with wrong state param', function(){
				try {
					s.Data.new(projectId, collectionId, {state: 'fake-state'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not create data with not-numeric parentId param', function(){
				try {
					s.Data.new(projectId, collectionId, {parentId: 'test'});
				} catch(err){
					err.message.should.equal('parentId must be a number');
				}
			});
			
			it('should not create data with not-existing parentId param', function(done){
				s.once('syncano:error', function(err){
					err[0].should.equal('ArgumentError: Specified parent does not exist');
					done();
				});
				s.Data.new(projectId, collectionId, {parentId: 1});
			});
			
			it('should create data object with pending state given collectionId', function(done){
				s.Data.new(projectId, collectionId, {title: 'data1', state: 'pending'}, function(rec){
					var id = rec.id | 0;
					dataIds.push(id);
					done();
				});
			});
			
			it('should create data object with moderated state given collectionKey', function(done){
				s.once('syncano:error', function(err){
					err[0].should.not.equal('DoesNotExist: Collection matching query does not exist');
					done();
				});
				s.Data.new(projectId, collectionKey, {title: 'data2', state: 'moderated'}, function(rec){
					var id = rec.id | 0;
					dataIds.push(id);
					done();
				});
			});
			
			it('should create data object with rejected state given collectionKey', function(done){
				s.once('syncano:error', function(err){
					err[0].should.not.equal('DoesNotExist: Collection matching query does not exist');
					done();
				});
				s.Data.new(projectId, collectionKey, {title: 'data3', state: 'rejected', dataKey: dataKey}, function(rec){
					var id = rec.id | 0;
					dataIds.push(id);
					done();
				});
			});
		});
		
		
		describe('get', function(){
			it('should not get data without projectId given', function(){
				try {
					s.Data.get();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not get data without collectionId given', function(){
				try {
					s.Data.get(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not get data with wrong-type maxId param', function(){
				try {
					s.Data.get(projectId, collectionId, {maxId: 'bignum'});
				} catch(err){
					err.message.should.equal('maxId must be a number');
				}
			});
			
			it('should not get data with wrong-type limit param', function(){
				try {
					s.Data.get(projectId, collectionId, {limit: 'bignum'});
				} catch(err){
					err.message.should.equal('limit must be a number');
				}
			});
			
			it('should not get data with wrong-type sinceId param', function(){
				try {
					s.Data.get(projectId, collectionId, {sinceId: 'bignum'});
				} catch(err){
					err.message.should.equal('sinceId must be a number');
				}
			});
			
			it('should not get data with wrong-type depth param', function(){
				try {
					s.Data.get(projectId, collectionId, {depth: 'bignum'});
				} catch(err){
					err.message.should.equal('depth must be a number');
				}
			});
			
			it('should not get data with wrong-type childrenLimit param', function(){
				try {
					s.Data.get(projectId, collectionId, {childrenLimit: 'bignum'});
				} catch(err){
					err.message.should.equal('childrenLimit must be a number');
				}
			});
			
			it('should not get data with wrong-type state param', function(){
				try {
					s.Data.get(projectId, collectionId, {state: 'strange'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not get data with wrong-type sinceTime param', function(){
				try {
					s.Data.get(projectId, collectionId, {sinceTime: 'strange'});
				} catch(err){
					err.message.should.equal('Param sinceTime must be a proper date string');
				}
			});
			
			it('should not get data with wrong-type order param', function(){
				try {
					s.Data.get(projectId, collectionId, {order: 'strange'});
				} catch(err){
					err.message.should.equal('incorrect value of order param - only "asc" and "desc" are allowed');
				}
			});
			
			it('should not get data with wrong-type orderBy param', function(){
				try {
					s.Data.get(projectId, collectionId, {orderBy: 'strange'});
				} catch(err){
					err.message.should.equal('incorrect value of order_by param - only "created_at" and "updated_at" are allowed');
				}
			});
			
			it('should not get data with wrong-type filter param', function(){
				try {
					s.Data.get(projectId, collectionId, {filter: 'strange'});
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should not get data with wrong-type includeChildren param', function(){
				try {
					s.Data.get(projectId, collectionId, {includeChildren: 'no'});
				} catch(err){
					err.message.should.equal('includeChildren param must be boolean');
				}
			});
			
			it('should return 0 records when fake dataIds are passed', function(done){
				s.Data.get(projectId, collectionId, {dataIds: [1,2,3]}, function(rec){
					rec.length.should.equal(0);
					done();
				});
			});
			
			it('should return all records whene dataIds are passed', function(done){
				s.Data.get(projectId, collectionKey, {}, function(rec){
					rec.length.should.equal(dataIds.length);
					done();
				});
			});
			
			it('should return 1 record with pending state', function(done){
				s.Data.get(projectId, collectionKey, {state: 'pending'}, function(rec){
					rec.length.should.equal(1);
					done();
				});
			});
			
			it('should return 1 record with moderated state', function(done){
				s.Data.get(projectId, collectionKey, {state: 'moderated'}, function(rec){
					rec.length.should.equal(1);
					done();
				});
			});
			
			it('should return 1 record with rejected state', function(done){
				s.Data.get(projectId, collectionKey, {state: 'rejected'}, function(rec){
					rec.length.should.equal(1);
					done();
				});
			});
		});
		
		describe('getOne', function(){
			it('should not get record without projectId given', function(){
				try {
					s.Data.getOne();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not get record without collection given', function(){
				try {
					s.Data.getOne(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not get record without dataId given', function(){
				try {
					s.Data.getOne(projectId, collectionId);
				} catch(err){
					err.message.should.equal('Data key/id must be passed');
				}
			});
			
			it('should get record with collectionId and dataId given', function(done){
				var dataId = dataIds[dataIds.length - 1];
				s.Data.getOne(projectId, collectionId, dataId, function(rec){
					var id = rec.id | 0;
					id.should.equal(dataId);
					done();
				});
			});
			
			it('should get record with collectionKey and dataId given', function(done){
				var dataId = dataIds[dataIds.length - 1];
				s.Data.getOne(projectId, collectionKey, dataId, function(rec){
					var id = rec.id | 0;
					id.should.equal(dataId);
					done();
				});
			});
			
			it('should get record with collectionKey and dataKey given', function(done){
				s.Data.getOne(projectId, collectionKey, dataKey, function(rec){
					rec.key.should.equal(dataKey);
					done();
				});
			});
		});
		
		describe('update', function(){
			it('should not update without projectId given', function(){
				try {
					s.Data.update();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not update without collectionId given', function(){
				try {
					s.Data.update(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not update without dataId given', function(){
				try {
					s.Data.update(projectId, collectionId);
				} catch(err){
					err.message.should.equal('Data key/id must be passed');
				}
			});
			
			it('should not update with wrong parentId given', function(){
				var dataId = dataIds[dataIds.length - 1];
				try {
					s.Data.update(projectId, collectionId, dataId, {parentId: 'fake'});
				} catch(err){
					err.message.should.equal('parentId must be a number');
				}
			});
			
			it('should not update with wrong state given', function(){
				var dataId = dataIds[dataIds.length - 1];
				try {
					s.Data.update(projectId, collectionId, dataId, {state: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should update state with dataKey given', function(done){
				var dataId = dataIds[dataIds.length - 1];
				s.Data.update(projectId, collectionId, dataKey, {state: 'moderated'}, function(rec){
					rec.state.should.equal('Moderated');
					done();
				});
			});
			
			it('should update title with dataId given', function(done){
				var dataId = dataIds[dataIds.length - 1];
				var nt = 'New Title';
				s.once('syncano:error', function(err){
					err[0].should.not.equal('DoesNotExist: Data Object matching query does not exist');
					done();
				});
				s.Data.update(projectId, collectionId, dataId, {title: nt}, function(rec){
					rec.title.should.equal(nt);
					done();
				});
			});
		});
		
		describe('move', function(){
			it('should not move data without projectId', function(){
				try {
					s.Data.move();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not move data without collectionId', function(){
				try {
					s.Data.move(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not move data with wrong filter given', function(){
				try {
					s.Data.move(projectId, collectionId, {filter: 'date'});
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should not move data with wrong state given', function(){
				try {
					s.Data.move(projectId, collectionId, {state: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not move data with wrong newState given', function(){
				try {
					s.Data.move(projectId, collectionId, {newState: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of newState param');
				}
			});
			
			it('should not move data with wrong limit given', function(){
				try {
					s.Data.move(projectId, collectionId, {limit: 'date'});
				} catch(err){
					err.message.should.equal('limit must be a number');
				}
			});

			it('should not move data to non-existing folder', function(done){
				var fname = 'this-folder-doesnt-exist-for-sure-' + (+new Date());
				s.once('syncano:error', function(err){
					err[0].should.equal('DoesNotExist: Folder matching query does not exist');
					done();
				});
				s.Data.move(projectId, collectionId, {newFolder: fname});
			});

			it('should move all data to another state', function(done){
				s.Data.move(projectId, collectionId, {newState: 'rejected'}, function(res){
					res.should.equal(true);
					done();
				});
			});
			
			it('should move single record to another state', function(done){
				s.Data.move(projectId, collectionId, {dataIds: dataIds[dataIds.length - 1], newState: 'pending'}, function(res){
					res.should.equal(true);
					done();
				});
			});
			
			it('should move selected records to another state', function(done){
				s.Data.move(projectId, collectionId, {dataIds: dataIds, newState: 'moderated'}, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('copy', function(){
			it('should not copy without projectId given', function(){
				try {
					s.Data.copy();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not copy without collectionId given', function(){
				try {
					s.Data.copy(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not copy without dataIds given', function(){
				try {
					s.Data.copy(projectId, collectionId);
				} catch(err){
					err.message.should.equal('dataId must be set');
				}
			});
			
			it('should not copy when wrong dataIds type given', function(){
				try {
					s.Data.copy(projectId, collectionId, "array");
				} catch(err){
					err.message.should.equal('dataId must be integer or array of integers');
				}
			});
			
			it('should not copy when wrong dataIds given', function(done){
				s.once('syncano:error', function(err){
					err[0].should.not.equal('TypeError: unsupported operand type(s) for -: \'list\' and \'int\'');
					done();
				});
				s.Data.copy(projectId, collectionId, 1);
			});
			
			it('should copy single data object', function(done){
				s.once('syncano:error', function(err){
					err[0].should.not.equal('TypeError: unsupported operand type(s) for -: \'list\' and \'int\'');
					done();
				});
				s.Data.copy(projectId, collectionId, dataIds[0], function(res){
					res.length.should.equal(1);
					done();
				});
			});
			
			it('should copy all data object', function(done){
				s.once('syncano:error', function(err){
					err[0].should.not.equal('TypeError: unsupported operand type(s) for -: \'list\' and \'int\'');
					done();
				});
				s.Data.copy(projectId, collectionId, dataIds, function(res){
					res.length.should.equal(dataIds.length);
					done();
				});
			});
		});
		
		describe('addParent', function(){
			it('should not add parent when projectId is not given', function(){
				try {
					s.Data.addParent();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not add parent when collectionId is not given', function(){
				try {
					s.Data.addParent(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not add parent when dataId is not given', function(){
				try {
					s.Data.addParent(projectId, collectionId);
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not add parent when dataId is not number', function(){
				try {
					s.Data.addParent(projectId, collectionId, 'test');
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not add parent when parentId is not given', function(){
				try {
					s.Data.addParent(projectId, collectionId, dataIds[0]);
				} catch(err){
					err.message.should.equal('parentId must be passed');
				}
			});
			
			it('should not add parent when parentId is not number', function(){
				try {
					s.Data.addParent(projectId, collectionId, dataIds[0], 'test');
				} catch(err){
					err.message.should.equal('parentId must be passed');
				}
			});
			
			it('should add parent', function(done){
				s.Data.addParent(projectId, collectionId, dataIds[0], dataIds[dataIds.length - 1], false, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('removeParent', function(){
			it('should not remove parent when projectId is not given', function(){
				try {
					s.Data.removeParent();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not remove parent when collectionId is not given', function(){
				try {
					s.Data.removeParent(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not remove parent when dataId is not given', function(){
				try {
					s.Data.removeParent(projectId, collectionId);
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not remove parent when dataId is not number', function(){
				try {
					s.Data.removeParent(projectId, collectionId, 'test');
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not remove parent when parentId is not number', function(){
				try {
					s.Data.removeParent(projectId, collectionId, dataIds[0], 'test');
				} catch(err){
					err.message.should.equal('parentId must be passed');
				}
			});
			
			it('should remove parent', function(done){
				s.Data.removeParent(projectId, collectionId, dataIds[0], dataIds[dataIds.length - 1], function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		
		describe('addChild', function(){
			it('should not add child when projectId is not given', function(){
				try {
					s.Data.addChild();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not add child when collectionId is not given', function(){
				try {
					s.Data.addChild(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not add child when dataId is not given', function(){
				try {
					s.Data.addChild(projectId, collectionId);
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not add child when dataId is not number', function(){
				try {
					s.Data.addChild(projectId, collectionId, 'test');
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not add child when childId is not given', function(){
				try {
					s.Data.addChild(projectId, collectionId, dataIds[0]);
				} catch(err){
					err.message.should.equal('childId must be passed');
				}
			});
			
			it('should not add child when childId is not number', function(){
				try {
					s.Data.addChild(projectId, collectionId, dataIds[0], 'test');
				} catch(err){
					err.message.should.equal('childId must be passed');
				}
			});
			
			it('should add child', function(done){
				s.Data.addChild(projectId, collectionId, dataIds[0], dataIds[dataIds.length - 1], false, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		
		describe('removeChild', function(){
			it('should not remove child when projectId is not given', function(){
				try {
					s.Data.removeChild();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not remove child when collectionId is not given', function(){
				try {
					s.Data.removeChild(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not remove child when dataId is not given', function(){
				try {
					s.Data.removeChild(projectId, collectionId);
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not remove child when dataId is not number', function(){
				try {
					s.Data.removeChild(projectId, collectionId, 'test');
				} catch(err){
					err.message.should.equal('dataId must be passed');
				}
			});
			
			it('should not remove child when childId is not number', function(){
				try {
					s.Data.removeChild(projectId, collectionId, dataIds[0], 'test');
				} catch(err){
					err.message.should.equal('childId must be passed');
				}
			});
			
			it('should remove child', function(done){
				s.Data.removeChild(projectId, collectionId, dataIds[0], dataIds[dataIds.length - 1], function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('delete', function(){
			it('should not delete when projectId is not given', function(){
				try {
					s.Data.delete();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not delete when collectionId is not given', function(){
				try {
					s.Data.delete(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not delete when wrong state is given', function(){
				try {
					s.Data.delete(projectId, collectionId, {state: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not delete when wrong filter is given', function(){
				try {
					s.Data.delete(projectId, collectionId, {filter: 'both'});
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should not delete when wrong limit is given', function(){
				try {
					s.Data.delete(projectId, collectionId, {limit: 'large'});
				} catch(err){
					err.message.should.equal('limit must be a number');
				}
			});
			
			it('should delete single record', function(done){
				s.Data.delete(projectId, collectionId, {dataIds: dataIds[0]}, function(res){
					res.should.equal(true);
					done();
				});
			});
			
			it('should delete everything left when no filters are given', function(done){
				s.Data.delete(projectId, collectionId, {}, function(res){
					res.should.equal(true);
					done();
				});
			});
		});
		
		describe('count', function(){
			it('should not count when projectId is not given', function(){
				try {
					s.Data.count();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not count when collectionId is not given', function(){
				try {
					s.Data.count(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not count when state is incorrect', function(){
				try {
					s.Data.count(projectId, collectionId, {state: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of state param');
				}
			});
			
			it('should not count when filter is incorrect', function(){
				try {
					s.Data.count(projectId, collectionId, {filter: 'awesome'});
				} catch(err){
					err.message.should.equal('incorrect value of filter param - only "text" and "image" are allowed');
				}
			});
			
			it('should count items', function(done){
				s.Data.count(projectId, collectionId, {}, function(res){
					res.should.equal(0);
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