function onOpen() {
  DocumentApp.getUi().createMenu("Generator").addItem("Open", "showSidebar").addToUi()
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("client/sidebar.html")
    .evaluate()
    .setTitle("Document Generator")
    .setWidth(400)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)

  DocumentApp.getUi().showSidebar(html)
}
