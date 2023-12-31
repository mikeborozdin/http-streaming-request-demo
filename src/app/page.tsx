"use client";

import { Person } from "@/types/Person";
import { makeStreamingJsonRequest } from "http-streaming-request";
import { useState } from "react";

const PeopleListWithMakeStreamingJsonRequest: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  const onGetPeopleClick = async () => {
    for await (const peopleSoFar of makeStreamingJsonRequest<Person[]>({
      url: "/api/people",
      method: "GET",
    })) {
      setPeople(peopleSoFar);
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-2xl font-extrabold">
        http-streaming-request example: makeStreamingJsonRequest()
      </h1>

      <div>
        <p>As simple as:</p>
        <pre className="bg-black text-white rounded-lg p-2 h-48 w-full overflow-scroll">
          {`
for await (const peopleSoFar of makeStreamingJsonRequest<Person[]>({
  url: "/api/people",
  method: "GET",
})) {
  setPeople(peopleSoFar);
}
          `}
        </pre>
      </div>

      <button
        onClick={onGetPeopleClick}
        className="bg-[#1e56a0] px-4 py-2 rounded-lg font-medium text-white"
      >
        Run example
      </button>

      {people && people.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {people.map((person, i) => (
            <div key={i} className="bg-yellow-200 p-2 drop-shadow-lg">
              <div>
                <strong>Name:</strong> {person.name}
              </div>
              <div>
                <strong>Age:</strong> {person.age}
              </div>
              <div>
                <strong>City:</strong> {person.city}
              </div>
              <div>
                <strong>Country:</strong> {person.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PeopleListWithMakeStreamingJsonRequest;
