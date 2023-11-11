const knex = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { generateToken } = require("../config/jwt");

async function registerUser(userId, name, email, password, role) {
  try {
 
    const userExists = await knex('users').where({ email }).first();
    if (userExists) {
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({
      userId,
      name,
      email,
      password: hashedPassword,
      role,
    });

    return { success: 'User registered successfully' };
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const user = await knex('users').where({ email }).first();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }
    const token = await generateToken(user.userId, user.role);
    return { success: 'Login successful', user: { userId: user.userId, name: user.name, email: user.email, jwt : token, role: user.role } };
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser };
