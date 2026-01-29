# Bug report for Prisma 7

## Steps to reproduce

1. Install dependencies with `pnpm install`
2. Open `index.ts` and observe

### Expected behavior

No type errors.

### Actual behavior

`tags` in `article.tags` gets the following type error:

```sh
Property 'tags' does not exist on type '{ id: number; status: ArticleStatus; title: string; authorId: number; }'.ts(2339)
```

Additionally, `article.id` should *not* be available on the last line (because it is not selected in the query), but it is.

## "Fixes"

In `prisma.ts`, you can see how removing `$extends(withAccelerate())`
when creating the client fixes the issue.

The error also goes away by going back to `@prisma/extension-accelerate@1.3.0`.
This requires adding `url` to the `datasource` in `schema.prisma`, and removing
the `accelerateUrl` from the client instantiation.