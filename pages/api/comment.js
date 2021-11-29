/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOTIN;

export default function asynchandler(req, res) {
  const graphQlient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    }
  });
  const query = gql`
  mutation CreateComment(
    $name:String!
    $email:String!
    $comment:String!
    $slug:String!
  ){
    createComment(
      data:{
        name:$name
        email:$email
        comment:$comment
        post:{connect:{slug:$slug}}
      }
    ){
      id
    }
  }
  `
  const result = await graphQlient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug
  });
  res.status(200).send(result);
}
