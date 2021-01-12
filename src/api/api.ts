function getFiles() {
  const templateFolderId = "1VKnYUI9Q4j1BVCRurhqnVR2bV3OjMDbL"
  const folder = DriveApp.getFolderById(templateFolderId)
  const pathContainer = ""
  const files = getDriveFiles(folder, pathContainer)
  const templates = files.filter((file: any) => file.name.includes("<template:"))
  const modules = files.filter((file: any) => file.name.includes("<module:"))
  return { templates, modules }
}

function getFileData(file: GoogleAppsScript.Drive.File) {
  const id = file.getId()
  const name = file.getName()
  return { id, name }
}
function getDriveFiles(folder: GoogleAppsScript.Drive.Folder, path: string): any {
  const files = []
  var path = path + "/" + folder.getName()

  const fileIt = folder.getFiles()
  while (fileIt.hasNext()) {
    const f = fileIt.next()
    files.push(getFileData(f))
  }

  // Get all the sub-folders and iterate
  const folderIt = folder.getFolders()
  while (folderIt.hasNext()) {
    const fs = getDriveFiles(folderIt.next(), path)
    files.push(...fs)
  }
  return files
}

const copyDocument = (id: string) => {
  const targetDoc = DocumentApp.getActiveDocument().getBody()
  const sourceDoc = DocumentApp.openById(id).getBody()
  const totalElements = sourceDoc.getNumChildren()

  for (var j = 0; j < totalElements; ++j) {
    var element = sourceDoc.getChild(j).copy()
    var type = element.getType()

    switch (type) {
      case DocumentApp.ElementType.PARAGRAPH:
        targetDoc.appendParagraph(element as any)
        break
      case DocumentApp.ElementType.TABLE:
        targetDoc.appendTable(element as any)
        break
      case DocumentApp.ElementType.LIST_ITEM:
        targetDoc.appendListItem(element as any)
        break
      case DocumentApp.ElementType.INLINE_IMAGE:
        targetDoc.appendImage(element as any)
        break
      case DocumentApp.ElementType.PAGE_BREAK:
        targetDoc.appendPageBreak()
        break
    }
  }
  targetDoc.appendPageBreak()
  return
}

const parseDocument = (id: string) => {
  const searchPattern = "{([a-zA-Z0-9]+)}"
  const doc = DocumentApp.openById(id)
  const body = doc.getBody().editAsText()

  let foundElement = body.findText(searchPattern)
  const result: string[] = []
  while (foundElement) {
    const text = foundElement
      .getElement()
      .asText()
      .getText()
      .substring(foundElement.getStartOffset(), foundElement.getEndOffsetInclusive() + 1)
    if (!result.includes(text)) result.push(text)
    foundElement = body.findText(searchPattern, foundElement)
  }
  return result
}

const copyModule = (id: string, forms: { [key: string]: string }) => {
  copyDocument(id)
  if (forms) {
    const body = DocumentApp.getActiveDocument().getBody().editAsText()
    Object.keys(forms).forEach((key) => {
      body.replaceText(key, forms[key])
    })
  }
  return
}
