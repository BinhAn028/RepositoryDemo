export const config = {
  runtime: "edge",
};

export async function GET() {
  try {
    return new Response(`Running on ${process.env.NEXT_RUNTIME}`);
  } catch {
    // console.log('get Post error', error);
    return Response.json(null);
  }
}
