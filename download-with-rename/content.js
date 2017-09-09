/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
  var target = e.target;
  while ((target.tagName != "A" || !target.href) && target.parentNode) {
    target = target.parentNode;
  }
  if (target.tagName != "A")
    return;
  browser.runtime.sendMessage({"url": target.href, "name": target.text});
}

/*
Add notifyExtension() as a listener to click events.
*/
// window.addEventListener("click", notifyExtension);
window.document.oncontextmenu=function(e){
  if (!e.ctrlKey || e.button != 2) {
    return true;
  }
  var target = e.target;
  var preg = /^[^\\]+\.(txt|zip|rar|pdf|doc|docx|xls|xlsx|ppt|pptx|key|png|jpg|jpeg|bmp|png|tiff|chm|psd|mp4|wmv|avi|rmvb|mp3|wav)$/i;
  while ((target.tagName != "A" || !target.href) && target.parentNode) {
    target = target.parentNode;
  }
  if (target.tagName != "A")
    return true;
  let name = target.text;
  if (name == undefined || !preg.test(name)) {
  	return true;
  }
  browser.runtime.sendMessage({"url": target.href, "name": target.text});
  return false;
}