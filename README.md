# Bug report for Prisma 7

## Steps to reproduce

1. Install dependencies with `pnpm install`
2. Open `index.ts` and observe no errors
3. Comment the line with the initial `where` clause and uncomment the other one

### Expected behavior

No type errors.

### Actual behavior

`posts` in `user.posts` gets the following type error:

```sh
Property 'posts' does not exist on type '{ id: number; }'.ts(2339)
```

## "Fixes"

In `prisma.ts`, you can see how removing `$extends(withAccelerate())`
when creating the client fixes the issue.

The error also goes away by going back to `@prisma/extension-accelerate@1.3.0`.
This requires adding `url` to the `datasource` in `schema.prisma`, and removing
the `accelerateUrl` from the client instantiation.