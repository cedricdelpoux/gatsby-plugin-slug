# gatsby-plugin-slug

[![npm package][npm-badge]][npm]

By default gatsby generate url by following directories structure.

For example, the following directory structure generate path url `mysite.com/2018/08/my-first-post`

```
2018
  ↳ 08
    ↳ my-first-post
```

With the same directory structure using `gatsby-plugin-slug`, you can add a custom slug field to remark nodes to have custom urls like `mysite.com/super-post`

## Getting started

[![gatsby-plugin-slug](https://nodei.co/npm/gatsby-plugin-slug.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gatsby-plugin-slug/)

You can download `gatsby-plugin-slug` from the NPM registry via the
`npm` or `yarn` commands

```shell
yarn add gatsby-plugin-slug
npm install gatsby-plugin-slug --save
```

## Usage

1. Add the plugin in your `gatsby-config.js` file:

```js
module.exports = {
    plugins: ["gatsby-plugin-slug"],
}
```

2. Add `slug` field in the frontmatter of your markdown files:

```md
---
slug: my-custom-slug
---
```

3. Use the `slug` field for the `path` key when you create a new page in you `gatsby-node.js`:

```js
const postTemplate = path.resolve("./src/templates/post.js")

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators
    return new Promise((resolve, reject) => {
        resolve(
            graphql(
                `
          {
            posts: allMarkdownRemark() {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
            ).then(result => {
                const posts = result.data.posts.edges
                posts.forEach(post => {
                    createPage({
                        path: post.node.fields.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: post.node.fields.slug,
                        },
                    })
                })
            })
        )
    })
}
```

4. Use the `slug` in the context to get more data:

```js
import React from "react"

const PostTemplate = ({data: {post}}) => (
    <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
)

export default PostTemplate

export const pageQuery = graphql`
    query PostBySlug($slug: String!) {
        post: markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            frontmatter {
                title
            }
        }
    }
`
```

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE.md](./LICENCE.md) file for details

[npm-badge]: https://img.shields.io/npm/v/gatsby-plugin-slug.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-plugin-slug
[github-issue]: https://github.com/xuopled/gatsby-plugin-slug/issues/new
