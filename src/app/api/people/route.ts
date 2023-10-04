import OpenAI from "openai";
import sleep from "sleep-promise";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

const DATA = [
  {
    name: "John Doe",
    age: 28,
    city: "New York",
    country: "USA",
  },
  {
    name: "Sophie Martin",
    age: 32,
    city: "Paris",
    country: "France",
  },
  {
    name: "Carlos Silva",
    age: 35,
    city: "Rio de Janeiro",
    country: "Brazil",
  },
  {
    name: "Priya Sharma",
    age: 29,
    city: "Mumbai",
    country: "India",
  },
  {
    name: "Maria Gonzales",
    age: 30,
    city: "Madrid",
    country: "Spain",
  },
  {
    name: "Ling Wang",
    age: 40,
    city: "Beijing",
    country: "China",
  },
  {
    name: "Aisha Ahmed",
    age: 34,
    city: "Cairo",
    country: "Egypt",
  },
  {
    name: "Giovanni Rossi",
    age: 38,
    city: "Rome",
    country: "Italy",
  },
  {
    name: "Fatima Hassan",
    age: 27,
    city: "Casablanca",
    country: "Morocco",
  },
  {
    name: "Hiroshi Tanaka",
    age: 36,
    city: "Tokyo",
    country: "Japan",
  },
];

const STRINGIFIED_DATA = JSON.stringify(DATA);

async function* streamData() {
  for (let i = 0; i < STRINGIFIED_DATA.length; i++) {
    await sleep(10);
    yield STRINGIFIED_DATA[i];
  }
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export async function GET(req: Request) {
  // const { messages } = await req.json();
  // Create a chat completion using OpenAI

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo-16k",
  //   stream: true,
  //   messages: [
  //     {
  //       role: "user",
  //       content:
  //         "Return a list of 10 users as a JSON array with the following attributes - name, country, age. Name should be full name. Return only a JSON array, no other text.",
  //     },
  //   ],
  // });

  // @ts-ignore
  // const stream = OpenAIStream(response);

  const stream = iteratorToStream(streamData());

  return new Response(stream);
}
