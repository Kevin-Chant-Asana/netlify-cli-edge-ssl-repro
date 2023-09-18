import type { Context } from "https://edge.netlify.com";

const ExampleEdgeFunction = async (request: Request, context: Context) => {
  console.log("Running edge function");
  const host = new URL(request.url).origin;
  const response = await fetch(host + "/");
  console.log(response.status);
  return new Response("hello world");
};

export default ExampleEdgeFunction
