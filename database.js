import bcrypt from "bcrypt";

const db = {
  id_counter: 3,

  users: [
    {
      id: 1,
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", 10),
      role: "ADMIN",
    },
    {
      id: 2,
      email: "user@user.com",
      password: bcrypt.hashSync("user", 10),
      role: "USER",
    },
  ],

  getUserByEmail: (email) => db.users.find((user) => user.email === email),

  registerUser: (user) => {
    const createdUser = {
      id: db.id_counter++,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      role: user.role,
    };
    db.users.push(createdUser);

    return createdUser;
  },
};

export default db;
