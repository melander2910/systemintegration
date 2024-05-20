import { ApolloServer, gql } from 'apollo-server';
import { PubSub } from 'graphql-subscriptions';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = gql(readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

// Sample data
let books = [
  { id: '1', title: '1984', releaseYear: 1949, authorId: '1' },
  { id: '2', title: 'Brave New World', releaseYear: 1932, authorId: '2' }
];

let authors = [
  { id: '1', name: 'George Orwell' },
  { id: '2', name: 'Aldous Huxley' }
];

// Initialize PubSub
const pubsub = new PubSub();

// Resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id === args.id),
    authors: () => authors,
    author: (parent, args) => authors.find(author => author.id === args.id)
  },
  Mutation: {
    createBook: (parent, args) => {
      const newBook = { id: String(books.length + 1), ...args };
      books.push(newBook);
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      return newBook;
    },
    updateBook: (parent, args) => {
      let updatedBook;
      books = books.map(book => {
        if (book.id === args.id) {
          updatedBook = { ...book, ...args };
          return updatedBook;
        }
        return book;
      });
      return updatedBook;
    },
    deleteBook: (parent, args) => {
      books = books.filter(book => book.id !== args.id);
      return { message: 'Book deleted successfully' };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Book: {
    author: (parent) => authors.find(author => author.id === parent.authorId)
  },
  Author: {
    books: (parent) => books.filter(book => book.authorId === parent.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
