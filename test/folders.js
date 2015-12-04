(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var projectId = 0;
	var collectionId = 0;
	var collectionKey = '';
	var folderId = 0;
	var folderName = 'TheFold';
	
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}

	/**
	 *   
	 *  TEST FOLDER MIXIN
	 *
	 */
	describe('Folder', function(){
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
			it('should not create folder without project given', function(){
				try {
					s.Folder.new();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not create folder without colleciton given', function(){
				try {
					s.Folder.new(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not create folder without name given', function(){
				try {
					s.Folder.new(projectId, collectionId);
				} catch(err){
					err.message.should.equal('Folder must have a name');
				}
			});
			
			it('should create folder', function(done){
				s.Folder.new(projectId, collectionId, folderName, function(res){
					res.name.should.equal(folderName);
					folderId = res.id | 0;
					done();
				});
			});
		});

		describe('get', function(){
			it('should not get folders without project given', function(){
				try {
					s.Folder.get();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not get folders without collection given', function(){
				try {
					s.Folder.get(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should get folders using collection key', function(done){
				s.Folder.get(projectId, collectionKey, function(res){
					res.length.should.equal(2);
					done();
				});
			});
			
			it('should find newly created folder on a list using collectionId', function(done){
				s.Folder.get(projectId, collectionId, function(res){
					var found = false;
					res.forEach(function(f){
						if(f.id == folderId){
							found = true;
						}
					});
					found.should.equal(true);
					done();
				});
			});
		});

		describe('getOne', function(){
			it('should not get folder without project given', function(){
				try {
					s.Folder.getOne();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not get folder without collection given', function(){
				try {
					s.Folder.getOne(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not get folder without name given', function(){
				try {
					s.Folder.getOne(projectId, collectionId);
				} catch(err){
					err.message.should.equal('FolderName must be a string');
				}
			});
			
			it('should get folder using collection key', function(done){
				s.Folder.getOne(projectId, collectionKey, folderName, function(res){
					res.name.should.equal(folderName);
					done();
				});
			});
		});
		
		describe('update', function(){
			it('should not update folder without project given', function(){
				try {
					s.Folder.update();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not update folder without collection given', function(){
				try {
					s.Folder.update(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not update folder without folder name given', function(){
				try {
					s.Folder.update(projectId, collectionId);
				} catch(err){
					err.message.should.equal('FolderName must be a string');
				}
			});
			
			it('should not update folder without newName given', function(){
				try {
					s.Folder.update(projectId, collectionId, folderName);
				} catch(err){
					err.message.should.equal('newName must be passed');
				}
			});
			
			it('should not update folder when name is not a string', function(){
				try {
					s.Folder.update(projectId, collectionId, 17);
				} catch(err){
					err.message.should.equal('FolderName must be a string');
				}
			});
			
			it('should not update folder when newName is not a string', function(){
				try {
					s.Folder.update(projectId, collectionId, folderName, 20);
				} catch(err){
					err.message.should.equal('newName must be a string');
				}
			});
			
			it('should not update folder when sourceId is not a number', function(){
				try {
					s.Folder.update(projectId, collectionId, folderName, 'NewFolder', 'test');
				} catch(err){
					err.message.should.equal('sourceId must be a number');
				}
			});
			
			it('should update folder with sourceId', function(done){
				var n = 'NewFolder';
				s.Folder.update(projectId, collectionId, folderName, n, 1, function(res){
					res.name.should.equal(n);
					folderName = n;
					done();
				});
			});
			
			it('should update folder without sourceId', function(done){
				var n = 'TheFold';
				s.Folder.update(projectId, collectionId, folderName, n, null, function(res){
					res.name.should.equal(n);
					folderName = n;
					done();
				});
			});
			
			it('should update folder with params passed as object', function(done){
				var n = 'NewFolder';
				s.Folder.update(projectId, collectionId, folderName, {newName: n}, function(res){
					res.name.should.equal(n);
					folderName = n;
					done();
				});
			});
		});
		
		describe('delete', function(){
			it('should not delete folder without project given', function(){
				try {
					s.Folder.delete();
				} catch(err){
					err.message.should.equal('projectId must be a number');
				}
			});
			
			it('should not delete folder without collection given', function(){
				try {
					s.Folder.delete(projectId);
				} catch(err){
					err.message.should.equal('Collection key/id must be passed');
				}
			});
			
			it('should not delete folder without folder name given', function(){
				try {
					s.Folder.delete(projectId, collectionId);
				} catch(err){
					err.message.should.equal('FolderName must be a string');
				}
			});
			
			it('should delete folder', function(done){
				s.Folder.delete(projectId, collectionId, folderName, function(res){
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