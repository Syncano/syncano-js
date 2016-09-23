import Syncano from '../../src/syncano';
import should from 'should/as-function';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, hex, createCleaner} from './utils';

describe('Hosting', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('hosting');
  const data = {
    instanceName,
    label: 'test hosting',
    description: 'test hosting desc',
    domains: [`${hex.getRandom(5)}.com`]
  }

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Hosting;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "label"', function() {
    should(Model({ instanceName, label: [] }).save()).be.rejectedWith(/label/);
  });

  it('should validate "description"', function() {
    should(Model({ instanceName, label: 'sth', description: [] }).save()).be.rejectedWith(/description/);
  });

  it('should validate "domains"', function() {
    should(Model({ instanceName, label: 'sth', description: 'sth', domains: 'sth' }).save()).be.rejectedWith(/domains/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(hosting).have.property('id').which.is.Number();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('links').which.is.Object();
        should(hosting).have.property('created_at').which.is.Date();
        should(hosting).have.property('updated_at').which.is.Date();
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);
        should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        hosting.description = 'some new description';
        return hosting.save()
      })
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal('some new description');
      })
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.delete();
      })
  });

  it('should be able to set default via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.setDefault();
      })
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(2);
        should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
        should(hosting.domains[1]).be.a.String().equal('default');
      })
  });

  it('should be able to list files via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.listFiles();
      })
      .then((files) => {
        should(files).be.an.Array();
      })
  });

  it('should be able to upload file via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.uploadFile({ path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
      })
      .then((file) => {
        should(file).be.an.Object();
        should(file).have.property('instanceName').which.is.String().equal(instanceName);
        should(file).have.property('id').which.is.Number();
        should(file).have.property('path').which.is.String().equal('file.txt');
        should(file).have.property('links').which.is.Object();
        should(file).have.property('size').which.is.Number();
      })
  });

  it('should be able to upload multiple files via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.uploadFiles([
          { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') },
          { path: 'file2.txt', file: Syncano.file(__dirname + '/files/dummy.txt') }
        ]);
      })
      .then((files) => {
        should(files).be.an.Array().with.length(2);
        should(files[0]).have.property('path').which.is.String().equal('file.txt');
        should(files[1]).have.property('path').which.is.String().equal('file2.txt');
      })
  });

  it('should be able to update file via model instance', function() {
    let tempHosting = null;
    let fileSize = null;
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        tempHosting = hosting;
        should(tempHosting).be.an.Object();
        should(tempHosting).have.property('description').which.is.String().equal(data.description);
        should(tempHosting).have.property('label').which.is.String().equal(data.label);
        should(tempHosting).have.property('domains').which.is.Array().with.length(1);

        return tempHosting.uploadFile({ path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
      })
      .then((file) => {
        fileSize = file.size;
        return tempHosting.updateFile(file.id, { file: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12')});
      })
      .then((file) => {
        should(file).be.an.Object();
        should(file).have.property('instanceName').which.is.String().equal(instanceName);
        should(file).have.property('id').which.is.Number();
        should(file).have.property('path').which.is.String().equal('file.txt');
        should(file).have.property('links').which.is.Object();
        should(file).have.property('size').which.is.Number().not.equal(fileSize);
      })
  });

  it('should be able to get file details via model instance', function() {
    let tempHosting = null;
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        tempHosting = hosting;

        should(tempHosting).be.an.Object();
        should(tempHosting).have.property('description').which.is.String().equal(data.description);
        should(tempHosting).have.property('label').which.is.String().equal(data.label);
        should(tempHosting).have.property('domains').which.is.Array().with.length(1);

        return tempHosting.uploadFile({ path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
      })
      .then((file) => {
        return tempHosting.getFileDetails(file.id);
      })
      .then((file) => {
        should(file).be.an.Object();
        should(file).have.property('instanceName').which.is.String().equal(instanceName);
        should(file).have.property('hostingId').which.is.Number().equal(tempHosting.id);
        should(file).have.property('id').which.is.Number();
        should(file).have.property('path').which.is.String().equal('file.txt');
        should(file).have.property('links').which.is.Object();
        should(file).have.property('size').which.is.Number();
      });
  });

  it('should be able to delete file via model instance', function() {
    let tempHosting = null;
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        tempHosting = hosting;

        should(tempHosting).be.an.Object();
        should(tempHosting).have.property('description').which.is.String().equal(data.description);
        should(tempHosting).have.property('label').which.is.String().equal(data.label);
        should(tempHosting).have.property('domains').which.is.Array().with.length(1);

        return tempHosting.uploadFile({ path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
      })
      .then((file) => {
        return tempHosting.deleteFile(file.id);
      })
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list({instanceName}).then((Models) => {
        should(Models).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(hosting).have.property('id').which.is.Number();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('links').which.is.Object();
          should(hosting).have.property('created_at').which.is.Date();
          should(hosting).have.property('updated_at').which.is.Date();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(1);
          should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
        });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('description').which.is.String().equal(data.description);

          return Model.please().update({id: hosting.id, instanceName}, {description: 'new desc'});
        })
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('description').which.is.String().equal('new desc');
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('description').which.is.String().equal(data.description);

          return Model.please().delete({id: hosting.id, instanceName});
        });
    });

    it('should be able to set default', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('description').which.is.String().equal(data.description);

          return Model.please().setDefault({id: hosting.id, instanceName});
        })
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(2);
          should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
          should(hosting.domains[1]).be.a.String().equal('default');
        });
    });

    it('should be able to list files', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('description').which.is.String().equal(data.description);

          return Model.please().listFiles({id: hosting.id, instanceName});
        })
        .then((files) => {
          should(files).be.an.Array();
        });
    });

    it('should be able to upload file', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(1);

          return Model.please().uploadFile(hosting, { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
        })
        .then((file) => {
          should(file).be.an.Object();
          should(file).have.property('instanceName').which.is.String().equal(instanceName);
          should(file).have.property('id').which.is.Number();
          should(file).have.property('path').which.is.String().equal('file.txt');
          should(file).have.property('links').which.is.Object();
          should(file).have.property('size').which.is.Number();
        })
    });

    it('should be able to upload multiple files', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(1);

          return Model.please().uploadFiles(hosting, [
            { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') },
            { path: 'file2.txt', file: Syncano.file(__dirname + '/files/dummy.txt') }
          ]);
        })
        .then((files) => {
          should(files).be.an.Array().with.length(2);
          should(files[0]).have.property('path').which.is.String().equal('file.txt');
          should(files[1]).have.property('path').which.is.String().equal('file2.txt');
        })
    });

    it('should be able to update file', function() {
      let fileSize = null;
      let tempHosting = null;
      return Model(data).save()
        .then(cleaner.mark)
        .then((hosting) => {
          tempHosting = hosting;
          should(tempHosting).be.an.Object();
          should(tempHosting).have.property('description').which.is.String().equal(data.description);
          should(tempHosting).have.property('label').which.is.String().equal(data.label);
          should(tempHosting).have.property('domains').which.is.Array().with.length(1);

          return Model.please().uploadFile(tempHosting, { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
        })
        .then((file) => {
          fileSize = file.size;
          return Model.please().updateFile({instanceName, id: tempHosting.id, fileId: file.id}, { file: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12')});
        })
        .then((file) => {
          should(file).be.an.Object();
          should(file).have.property('instanceName').which.is.String().equal(instanceName);
          should(file).have.property('id').which.is.Number();
          should(file).have.property('path').which.is.String().equal('file.txt');
          should(file).have.property('links').which.is.Object();
          should(file).have.property('size').which.is.Number().not.equal(fileSize);
        })
    });

    it('should be able to get file details', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(1);

          return Model.please().uploadFile(hosting, { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
        })
        .then((file) => {
          return Model.please().getFileDetails({ instanceName, id: file.hostingId, fileId: file.id});
        })
        .then((file) => {
          should(file).be.an.Object();
          should(file).have.property('instanceName').which.is.String().equal(instanceName);
          should(file).have.property('hostingId').which.is.Number();
          should(file).have.property('id').which.is.Number();
          should(file).have.property('path').which.is.String().equal('file.txt');
          should(file).have.property('links').which.is.Object();
          should(file).have.property('size').which.is.Number();
        });
    });

    it('should be able to delete file', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((hosting) => {
          should(hosting).be.an.Object();
          should(hosting).have.property('description').which.is.String().equal(data.description);
          should(hosting).have.property('label').which.is.String().equal(data.label);
          should(hosting).have.property('domains').which.is.Array().with.length(1);

          return Model.please().uploadFile(hosting, { path: 'file.txt', file: Syncano.file(__dirname + '/files/dummy.txt') });
        })
        .then((file) => {
          return Model.please().deleteFile({ instanceName, id: file.hostingId, fileId: file.id});
        })
    });

  });

});
