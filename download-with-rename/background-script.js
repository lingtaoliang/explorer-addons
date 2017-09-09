
function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
function notify(message) {
  console.log(`receive message ${message}`);
  var url = message.url;
  var name = message.name;
  if (name == undefined) {
  	return;
  }
  var preg = /^[^\\]+\.(txt|zip|rar|pdf|doc|docx|xls|xlsx|ppt|pptx|key|png|jpg|jpeg|bmp|png|tiff|chm|psd|mp4|wmv|avi|rmvb|mp3|wav)$/i;
  if (!preg.test(name))  {
  	return;
  }
  browser.downloads.download({
    "url": url,
    "filename": name
  }).then(onStartedDownload, onFailed);
}

/*
Assign `notify()` as a listener to messages from the content script.
*/
browser.runtime.onMessage.addListener(notify);
