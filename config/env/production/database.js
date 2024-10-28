const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(
    env(
      "postgres://ud3cul4h7241mv:p0168250558990ae6aa21ff252a8e5ee2e6d5796001fce3a9c7500e12d6fe7f7f@c7u1tn6bvvsodf.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/dfhv38eegodgfh"
    )
  );

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: { rejectUnauthorized: false },
      },
      debug: false,
    },
  };
};
