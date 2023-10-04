import sleep from "sleep-promise";

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
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(encoder.encode(value));
      }
    },
  });
}

export async function GET(req: Request) {
  const stream = iteratorToStream(streamData());

  return new Response(stream);
}
