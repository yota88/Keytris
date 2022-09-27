// For creating tables if they do not already exist

module.exports = {
  scores:
  `CREATE TABLE IF NOT EXISTS scores (
    name VARCHAR(255) NOT NULL,
    noob BIGINT DEFAULT 0,
    rando BIGINT DEFAULT 0,
    uber BIGINT DEFAULT 0,
    leet BIGINT DEFAULT 0,
    PRIMARY KEY(name)
    );`,
}