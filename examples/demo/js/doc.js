(function(){
	'use strict';

    var $body = $('section');
    $body.html('Connecting to Syncano...');

    var myName = $('h1').html();

	var syncano = SyncanoConnector.getInstance();
    var projectId = 1391;

    syncano.on('syncano:authorized', function(){
        var interval = 15 * 1000;
        setInterval(function(){
            var d = (new Date()).toLocaleString();
            syncano.Connection.update(syncano.uuid, {state: d + ' - alive'});
        }, interval);
    });

    showLoader();
	syncano.connect({
        instance: 'silent-pond-794798',
        api_key: 'd2e79f86af5fc92af44ea74ffc2f707d9c9fbb0c'
    }, function(auth){
        hideLoader();
        listenToNotifications();
    	buildInterface();
        loadData();
    });



    function listenToNotifications(){
        syncano.on('syncano:message', function(res){
            var data = res[0].data;
            if(data.sender !== myName){
                displayText(data.message);
            }
        })
    }

    function buildInterface(){
        $body.empty();    	
    	$body.append([
            '<p>',
            '<button type="button" class="btn-say">Say hello</button>',
            '<button type="button" class="btn-save">Save data</button>',
            '<button type="button" class="btn-load">Load data</button>',
            '<button type="button" class="btn-del">Delete data</button>',
            '</p>'
        ].join('\n'));
        $body.append('<textarea></textarea>');
        $body.on('click', 'button.btn-say', sendMessage);
        $body.on('click', 'button.btn-save', saveData);
        $body.on('click', 'button.btn-load', loadData);
        $body.on('click', 'button.btn-del', deleteData);
    }

    function displayText(text){
        $('textarea').prepend(text + '\n');
    }

    function showLoader(){
        $('p.loader').show();
    }

    function hideLoader(){
        $('p.loader').hide();
    }

    function sendMessage(){
        var data = {
            message: 'Hello from ' + myName,
            sender: myName
        }
        showLoader();
        syncano.Notification.send({data: data}, function(){
            hideLoader();
        });
    }

    function loadData(){
        showLoader();
        syncano.Data.get(projectId, 'Default', {limit: 1, order: 'DESC', folders:['Default']}, function(list){
            hideLoader();
            if(list.length){
                displayText('Last message: ' + list[0].text);
            } else {
                displayText('No stored messages!');
            }
        });
    }

    function saveData(){
        var message = window.prompt('Enter a message to be stored');
        if(message){
            showLoader();
            syncano.Data.new(projectId, 'Default', {title: 'Message', text: message, folder: 'Default'}, function(){
                hideLoader();
                displayText('Saved!');
            });
        }
    }

    function deleteData(){
        showLoader();
        syncano.Data.delete(projectId, 'Default', {}, function(){
            hideLoader();
            displayText('Deleted!');
        });
    }

})();
