![STOC](./static/ogp.png)

Where developers share knowledge.

## Purpose

- Share the latest information on web development
- Provide learning resources for newcomers
- Accumulate historically valuable and useful resources

## Add document to database

```
npx stoc doc https://example.com/ --tags tag1,tag2
```

If the document already exists, the tags are merged.

## Add tag to database

```
npx stoc tag example-tag "Example Tag" --icon /path/to/image
```

If the tag already exists, it is updated.
