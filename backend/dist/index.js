"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
if (!config_1.MONGO_URI) {
    throw new Error('MONGO_URI must exist');
}
// Conexión a la base de datos MongoDB
mongoose_1.default.connect(config_1.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
});
// Iniciar el servidor
app_1.app.listen(config_1.PORT, () => {
    console.log(`Server on port ${config_1.PORT}`);
});
