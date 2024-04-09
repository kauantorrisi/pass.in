import {
  getEventAttendees
} from "./chunk-K2XFZTDD.mjs";
import {
  getEvent
} from "./chunk-PZ4YIDFH.mjs";
import {
  registerForEvent
} from "./chunk-QPG3MVFQ.mjs";
import {
  errorHandler
} from "./chunk-QNIMVJBQ.mjs";
import {
  checkIn
} from "./chunk-GULVP6QJ.mjs";
import {
  createEvent
} from "./chunk-FO7XG7LF.mjs";
import "./chunk-3VNS3LNG.mjs";
import {
  getAllEvents
} from "./chunk-WGXIDSAZ.mjs";
import {
  getAttendeeBadge
} from "./chunk-TQMNHAEA.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-P56FXF2G.mjs";

// src/server.ts
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
  // http://meufrontend.com para apenas sua aplicação poder acessar sua API
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in contruida durante o NLW Unite da Rockeseat",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.register(getAllEvents);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("\u{1F525} HTTP server is running");
});
