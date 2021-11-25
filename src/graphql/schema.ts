import { GraphQLInt, GraphQLObjectType, GraphQLSchema } from "graphql"

export const createSchema = async () => {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "Query",
            description: "The main entrypoint to our API",
            fields: {
                double: {
                    args: {
                        number: { description: "The number to multiply", type: GraphQLInt }
                    },
                    description: "Get the number, times two",
                    type: GraphQLInt,
                    resolve(_source, { number }) {
                        // Do what you want with authorization
                        return number * 2
                    }
                }
            }
        })
    })
}

export const defaultQuery = `
    # Try out our API with a query like this:
    query {
	    double(number: 12)
    }
`
