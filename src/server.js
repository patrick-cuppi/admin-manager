import "dotenv/config";
import "./database";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import express from "express";
import UserResource from "./resources/UserResource";
import locales from "./locales";
import ProjectResource from "./resources/ProjectResource";
import TaskResource from "./resources/TaskResource";
import User from "./models/user";
import theme from "./theme";

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

const adminJS = new AdminJS({
    databases: [],
    rootPath: '/admin',
    dashboard: {
        componen: AdminJS.bundle('./components/Dashboard/index'),
    },
    resources: [UserResource, ProjectResource, TaskResource],
    branding: {
        companyName: 'Admin Manager Ltda',
        logo: false,
        softwareBrothers: false,
        theme,
    },
    ...locales,
});

// const router = AdminJSExpress.buildRouter(adminJS);

const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (email, password) => {
        const user = await User.findOne({
            where: { email },
        });

        if(user && (await user.checkPassword(password))) {
            return user;
        }

        return false;
    },
    cookiePassword: process.env.SECRET,
});

app.use(adminJS.options.rootPath, router);
app.listen(5000, () => {
    console.log('AdminJS is under http://localhost:5000/admin')
})

