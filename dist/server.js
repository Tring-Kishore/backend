"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const data_source_1 = __importDefault(require("./database/data-source"));
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 6000;
// Initialize the database connection
data_source_1.default.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB Connected");
    // Create GraphQL schema
    const schema = yield (0, schema_1.createSchema)();
    // Create Apollo Server
    const server = new server_1.ApolloServer({ schema });
    // Start Apollo Server
    yield server.start();
    // Apply Apollo Server middleware to Express
    app.use('/graphql', (0, cors_1.default)(), // Enable CORS
    body_parser_1.default.json(), // Parse JSON bodies
    (0, express4_1.expressMiddleware)(server) // Integrate Apollo Server with Express
    );
    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/graphql`);
    });
}))
    .catch((error) => console.log(error));
