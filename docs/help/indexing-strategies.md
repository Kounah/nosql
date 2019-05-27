# Indexing Strategies

## Default
[Documentation](https://docs.mongodb.com/manual/indexes/)

The default indexing strategy in mongoDB is the _id index.

## Single Field
[Documentation](https://docs.mongodb.com/manual/core/index-single/)

Indexes that are created for a single field of the document, it can eithe be an ascending or descending index

## Compound Indexes
[Documentation](https://docs.mongodb.com/manual/core/index-compound/)

Like single field indexes but they support queries for multiple (instead of one) fields.

> For the following indexing strategies I did not read for a gist or anything.
> Even though most of these sounded quite interesting and I really wanted to know
> what to use them for.
> I justed linked them to be complete.

## Multikey Indexes
[Documentation](https://docs.mongodb.com/manual/core/index-multikey/)

## Text Indexes
[Documentation](https://docs.mongodb.com/manual/core/index-text/)

## `2dsphere` Indexes
[Documentation](https://docs.mongodb.com/manual/core/2dsphere/)

## `2d` Indexes
[Documentation](https://docs.mongodb.com/manual/core/2d/)

## `geoHaystack` Indexes
[Documentation](https://docs.mongodb.com/manual/core/geohaystack/)

## Hashed Indexes
[Documentation](https://docs.mongodb.com/manual/core/index-hashed/)