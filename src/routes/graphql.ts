import type { EndpointOutput, RequestHandler } from "@sveltejs/kit"
import { ApolloServer, gql } from "apollo-server-lambda"

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: (parent, args, context) => {
            console.log("hello from resolver")
            return "Hello, world!"
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
    // playground: true,
    // tracing: true,
    
})

const graphqlHandler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: "*",
            credentials: true,
        }
    }
})

const handler: RequestHandler = async ({ method, headers, path, rawBody }) => {
        // const text = new TextDecoder().decode(rawBody)
        // console.log({ text })
        
        
        // const buffer = Buffer.from(rawBody, "utf8")
        // const s = new String(buffer)
        // console.log({ s })
    
    // return { status: 200 } 
    
    const response = await new Promise<EndpointOutput>((resolve, reject) => {
        const event = {
            httpMethod: method,
            headers,
            path,
            body: new TextDecoder().decode(rawBody),
            isBase64Encoded: false,
            //requestContext: true // mocks an expected value from an aws event// requestContext: true // mocks an expected value from an aws event
            requestContext: {
                elb: true
            }
        }
        
        console.log("starting handler...")

        graphqlHandler(event, {} as any, (error, result) => {
            console.log({ error, result })
            
            if (error) return reject(error)

            resolve({
                status: result.statusCode,
                body: result.body,
                headers: result.headers
            })
        })
    })
    
    console.log({ response })
    
    return response 
}

export const head = handler
export const get = handler
export const post = handler
