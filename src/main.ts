function onOpen() {
  DocumentApp.getUi().createMenu("Generate").addItem("Document", "showSidebar").addToUi()
}

function getUser() {
  return Session.getActiveUser().getEmail()
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("client/sidebar.html")
    .evaluate()
    .setTitle("Document Generator")
    .setWidth(400)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)

  DocumentApp.getUi().showSidebar(html)
}
