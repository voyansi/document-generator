const getTemplates = () => {
  const templates = DriveApp.searchFiles("title contains '<template:'")
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

const getContents = (id: string) => {
  const doc = DocumentApp.openById(id)
  const contents = doc.getBody().getText()
  return contents
}

const parseModule = (id: string) => {
  const searchPattern = "{([^,s}{][a-zA-Z]+)}"
  const doc = DocumentApp.openById(id)
  const body = doc.getBody().editAsText()

  let foundElement = body.findText(searchPattern)
  const result: string[] = []
  while (foundElement) {
    let text = foundElement
      .getElement()
      .asText()
      .getText()
      .substring(foundElement.getStartOffset(), foundElement.getEndOffsetInclusive() + 1)
    if (!result.includes(text)) result.push(text)
    foundElement = body.findText(searchPattern, foundElement)
  }
  return result
}
