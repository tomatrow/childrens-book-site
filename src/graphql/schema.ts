import { makeExecutableSchema } from "@graphql-tools/schema"
import type { IExecutableSchemaDefinition } from "@graphql-tools/schema"

const typeDefs: IExecutableSchemaDefinition["typeDefs"] = `
    interface Route {
        handle: String!
        body: String!
    }
    type Page implements Route {
        title: String!
    }
    type Query {
        double(number: Int!): Int!
        pages: [Page!]!
    }
`

const resolvers: IExecutableSchemaDefinition["resolvers"] = {
    Query: {
        double(_, args) {
            console.log({ args })
            return args.number * 2 
        }
    }
}


export const createSchema = async () => {
    return makeExecutableSchema({
        typeDefs,
        resolvers
    })
}

export const defaultQuery = `
    # Try out our API with a query like this:
    query {
	    double(number: 12)
    }
`
