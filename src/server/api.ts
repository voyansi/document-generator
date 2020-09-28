const getTemplates = () => {
  const templates = DriveApp.searchFiles(`title contains "<template:"`)
  const result = []
  while (templates.hasNext()) {
    var file = templates.next()
    const name = file.getName()
    const id = file.getId()
    result.push({ name, id })
  }
  // necessary filter step, driveapp search is fuzzy
  return result.filter((n) => n.name.includes("<template:"))
}

const getModules = () => {
  const templates = DriveApp.searchFiles("title contains '<module:'")
  const result = []
  while (templates.hasNext()) {
    var file = templates.next()
    const name = file.getName()
    const id = file.getId()
    result.push({ name, id })
  }
  // necessary filter step, driveapp search is fuzzy
  return result.filter((n) => n.name.includes("<module:"))
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
        targetDoc.appendParagraph(element)
        break
      case DocumentApp.ElementType.TABLE:
        targetDoc.appendTable(element)
        break
      case DocumentApp.ElementType.LIST_ITEM:
        targetDoc.appendListItem(element)
        break
      case DocumentApp.ElementType.INLINE_IMAGE:
        targetDoc.appendImage(element)
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
