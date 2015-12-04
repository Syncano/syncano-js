(function(){
	'use strict';
	
	var s;
	var eventsHistory = [];
	var projectId = 0;
	
	function lastEvt(){
		return eventsHistory[eventsHistory.length-1];
	}
	
	
	/**
	 *   
	 *  TEST PROJECT MIXIN
	 *
	 */
	describe('Project', function(){
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
		
		describe('new', function(){
			it('should not create project without a name', function(done){
				try{
					s.Project.new();
				} catch(err){
					err.message.should.equal('project.new: name must be defined');
					done();
				}
			});
		
		
			it('should create new project with proper name given', function(done){
				s.Project.new('Project name', 'Test project created by mocha', function(rec){
					projectId = rec.id | 0;
					projectId.should.not.equal(0);
					done();
				});
			});


		    it('trigger event on project creation', function(){
				lastEvt()[0].should.equal('syncano:project:new');
		    });
		});


		describe('get', function(){
			it('find created project on a list', function(done){
				s.Project.get(function(list){
					list.forEach(function(p){
						if(p.id == projectId){
							done();
						}
					});
				});
			});


		    it('trigger event on project list', function(){
				lastEvt()[0].should.equal('syncano:project:get');
		    });
		});
		
		describe('getOne', function(){
			it('get created project directly', function(done){
				s.Project.getOne(projectId, function(rec){
					var id = rec.id | 0;
					id.should.equal(projectId);
					done();
				});
			});


		    it('trigger event on project get', function(){
				lastEvt()[0].should.equal('syncano:project:get_one');
		    });


			it('should not get info about project from outside the instance', function(done){
				var oneTimeFun = function(){
					s.off('syncano:error', oneTimeFun);
					done();
				}
				s.on('syncano:error', oneTimeFun);
				s.Project.getOne(8);
			});
		});
		
		describe('update', function(){
			it('update project details', function(done){
				var n = 'New name',
					d = 'New description';
				s.Project.update(projectId, n, d, function(rec){
					rec.name.should.equal(n);
					rec.description.should.equal(d);
					done();
				});
			});


		    it('trigger event on project update', function(){
				lastEvt()[0].should.equal('syncano:project:update');
		    });
		});
		
		describe('delete', function(){
			it('should not delete project without id given', function(done){
				try{
					s.Project.delete();
				} catch(err){
					err.message.should.equal('projectId must be a number');
					done();
				}
			});


			it('delete created project', function(done){
				s.Project.delete(projectId, function(res){
					res.should.equal(true);
					done();
				});
			});


		    it('trigger event on project deletion', function(){
				lastEvt()[0].should.equal('syncano:project:delete');
		    });
		});
	});
	
})();