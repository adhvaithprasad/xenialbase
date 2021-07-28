var firebaseConfig = {
	apiKey: "AIzaSyC-3XDB0vSiQlbGL-Sa9rOiteFYitYfstw",
	authDomain: "firescrypt-web.firebaseapp.com",
	databaseURL: "https://firescrypt-web-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "firescrypt-web",
	storageBucket: "firescrypt-web.appspot.com",
	messagingSenderId: "276701233302",
	appId: "1:276701233302:web:5e513b1d8c681e830082b7",
	measurementId: "G-T12DZ6GPNN"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
var contentEls = document.querySelectorAll('.content');

tabBar.listen('MDCTabBar:activated', function(event) {
  // Hide currently-active content
  document.querySelector('.content--active').classList.remove('content--active');
  // Show content for newly-activated tab
  contentEls[event.detail.index].classList.add('content--active');
});
var storage = firebase.storage();
var storageRef = storage.ref();
var metadata = {
	contentType: 'text/html'
};
var id = "id" + Math.random().toString(16).slice(2) ;
var username = prompt('Username');
var blob = new Blob(['adhvaith is great'], {
	type: 'text/html'
});



const db = firebase.database();

  var room = prompt('Room');
  document.getElementById("chat-btn").addEventListener("click", postChat);


  function postChat(e) {
	e.preventDefault();
	const timestamp = Date.now();
	const chatTxt = document.getElementById("chat-txt");
	const message = chatTxt.value;
   
	chatTxt.value = "";
	db.ref("messages/" + room +"/"+ timestamp).set({
	  usr: username,
	  msg: message,
	  room: room,
	});
  }
  
  
  
  const fetchChat = db.ref("messages/"+room);
  fetchChat.on("child_added", function (snapshot) {
	const messages = snapshot.val();
	const msg = "<div><p><b>" + messages.usr + "</b></p> " + messages.msg +"</p></div>";
	document.querySelector('.chat-content').innerHTML += msg;
	console.log('Username:'+messages.usr+' message: '+messages.msg+' room id: '+ messages.id)
  });






function upload_file() {
	firebase.storage().ref('code/' + id).put(blob).then(snapshot => {
		console.log('Uploaded.');
		
	});
}
function chat(){
	new mdc.dialog.MDCDialog(document.querySelector('.chat')).open();
}

var editor = ace.edit('firepad-container');
    require('ace/ext/language_tools');
   
    editor.setOptions({
                  enableBasicAutocompletion: true,
                  enableSnippets: false,
                  enableLiveAutocompletion: true,
                //  useWrapMode: true,
                  highlightActiveLine: true,
                  showPrintMargin: false,
                  
                  mode:'ace/mode/text'
  
    });
  
  editor.getSession().setUseWorker(false);
  editor.setTheme('ace/theme/cobalt');




function setlang(){
    var x = document.getElementById("mode-selector").selectedIndex;
    var lang = document.getElementsByTagName("option")[x].value;
    editor.session.setMode("ace/mode/"+lang);
   document.getElementById('setlang').innerHTML= " language set to : " + lang;
  }
  
  function settheme(){
    var theme = document.getElementById("theme-selector").value;
    editor.setTheme("ace/theme/"+theme);
   document.getElementById('settheme').innerHTML= " Theme set to : " + theme;
  }
  function setsize(){
    var size = document.getElementById("font-size-selector").value;
  document.getElementById('editor').style.fontSize=size+'px';
   document.getElementById('setsize').innerHTML= " Size set to : " + size + 'px';
  }
  function r(){
    new mdc.dialog.MDCDialog(document.querySelector('.luck-4')).open();
  
  }
  
  function w(){
    new mdc.dialog.MDCDialog(document.querySelector('.luck-2')).open();
  
  }
  function e(){
    new mdc.dialog.MDCDialog(document.querySelector('.luck-3')).open();
  
  }
  
  function beatify() {
    var val = editor.session.getValue();
  //Remove leading spaces
    var array = val.split(/\n/);
    array[0] = array[0].trim();
    val = array.join("\n"); 
  //Actual beautify (prettify) 
    val = js_beautify(val);
  //Change current text to formatted text
    editor.session.setValue(val);
  }
  
  function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    }
     
    downloadLink.click();
  }
  var write_text = editor.session.getValue();
  function save(){
    saveTextAsFile(write_text,'download.txt')
  }
   var firepadRef = getExampleRef();
    //// Create Firepad.
      var firepad = Firepad.fromACE(firepadRef, editor, {
        defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
      });
    
      // Helper to get hash from end of URL or generate a random one.
    function getExampleRef() {
      var ref = firebase.database().ref();
      var hash = window.location.hash.replace(/#/g, '');
      if (hash) {
        ref = ref.child(hash);
      } else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
      }
      if (typeof console !== 'undefined') {
        console.log('Firebase data: ', ref.toString());
      }
      return ref;
    }
