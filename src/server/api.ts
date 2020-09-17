const getTemplates = () => {
  const templates = DriveApp.searchFiles("title contains '<template:'")
  const result = []
  while (templates.hasNext()) {
    var file = templates.next()
    const name = file.getName()
    const id = file.getId()
    result.push({ name, id })
  }
  return result.filter((n) => n.name.includes("<template:"))
}

const getContents = (id: string) => {
  const doc = DocumentApp.openById(id)
  const contents = doc.getBody().getText()
  return contents
}
