function onOpen() {
  SpreadsheetApp.getUi().createMenu('Proposals').addItem('Launch', 'showSidebar').addToUi()
}

function getUser() {
  return Session.getActiveUser().getEmail()
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('client/sidebar.html')
    .evaluate()
    .setTitle('Generate')
    .setWidth(400)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)

  SpreadsheetApp.getUi().showSidebar(html)
}
