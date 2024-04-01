const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutKellyQ : String
    aboutErvin: String 
    aboutMateo : String
    aboutEstiven : String
    aboutJuanMolina : String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte del profe `;
    },
    aboutKellyQ: () =>{
      return `¡Hola, soy Kelly Quintana tengo 22 años y me encanta aprender nuevas tecnologías.
              Soy Estudiante de ingenieria de sistemas y desarrolladora junior para una empresa de apuestas de Cali!`;
    },
    
    aboutJuanMolina: () =>{
      return `¡Hola, soy Juan Sebastian Molina tengo 29 años y me encanta jugar RPG's.
              Lo que me gusta de los RPG's es que son muy inmersivos y te permiten vivir una historia diferente a la tuya.
              Soy Estudiante de ingenieria de sistemas y un apasionado por la programacion.`;
    },

    aboutErvin: () => {
      return `Hola, soy Ervin. Soy estudiante de ingeniería de sistemas de sexto semestre.`;
    },

    aboutMateo: () =>{
      return `¡Hola, soy Mateo, tengo 24 años y soy estudiante de ingeniería de sistemas en la universidad del valle
              y desde 2022 trabajo todos los veranos en Estados Unidos como staff en un campamento de verano.`;
    },

    aboutEstiven: () =>{
      return `¡Hola, soy Estiven, tengo 24 años y soy estudiante de uv. Me encanta la natación, y el café.`;
    },

  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
