module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "plmqaz123",
    DB: "chatbot",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};