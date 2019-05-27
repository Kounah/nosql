### Indexing

**DynamoDB**
- Indexes sized and provisioned seperately from data
- Hash or hash-range indexes only
- Global secondary indexes (GSIs) inconsistent with underlying data
- GSIs only declareable from top level item elements. Subdocuments or arrays not indexable
- Local secondary indexes (LSIs) must be defined when a table is created
- Up to 20 GSIs &amp; LSIs per table

**MongoDB**
- Secondary indexes can be added to any field
- Indexes are consistent with data
- [Multiple Stategies](/docs/help/indexing-strategies.md): compound, unique, array, partial, TTL (Time-To-Live), geospatial, sparse, hash, text