const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("MY_HEROKU_URL"));
  console.log("host=====>", host);
  console.log("port=====>", port);
  console.log("database=====>", database);
  console.log("user=====>", user);
  console.log("password=====>", password);

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
