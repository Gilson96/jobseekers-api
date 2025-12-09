import db from "../connection.js";

export const dropTables = () => {
    return db
        .query("DROP TABLE IF EXISTS application_job;")
        .then(() => {
            return db.query("DROP TABLE IF EXISTS saved_job;");
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS skills_job;").then(() => {
                return db.query("DROP TABLE IF EXISTS application_user;").then(() => {
                    return db.query("DROP TABLE IF EXISTS skills_user;").then(() => {
                        return db.query("DROP TABLE IF EXISTS application;").then(() => {
                            return db.query("DROP TABLE IF EXISTS skills;").then(() => {
                                return db.query("DROP TABLE IF EXISTS users;").then(() => {
                                    return db.query("DROP TABLE IF EXISTS job;").then(() => {
                                        return db.query("DROP TABLE IF EXISTS company;");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
}