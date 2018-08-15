const parseFilepath = require(`parse-filepath`)

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
  const {createNodeField} = boundActionCreators
  const fileNode = getNode(node.parent)

  if (
    node.internal.type === `MarkdownRemark` &&
    fileNode.internal.type === `File`
  ) {
    const parsedFilePath = parseFilepath(fileNode.relativePath)
    let slug

    if (node.frontmatter && node.frontmatter.slug) {
      slug = `/${node.frontmatter.slug}`
    } else {
      if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      } else if (parsedFilePath.dir === ``) {
        slug = `/${parsedFilePath.name}/`
      } else {
        slug = `/${parsedFilePath.dir}/`
      }
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
