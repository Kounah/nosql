### Data Integrity

**DynamoDB**
- Data is eventually consistent by default
- No schema governance or data validation
- [ACID transactions](/docs/help/ACID-transactions.md) apply to table data only, and not to indexes or backups. Maximum of 10 writes per transaction

**MongoDB**
- Data is strongly consistent by default
- Native schema governance and data validation
- [ACID transactions](/docs/help/ACID-transactions.md) apply to documents, indexes, and backups. 1,000 operations per transaction (executing within 60 seconds by default)