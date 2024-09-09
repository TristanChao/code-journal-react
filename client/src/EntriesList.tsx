import { useEffect, useState } from 'react';
import { Entry } from './App';
import { readEntries } from './data';

export function EntriesList() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    async function read() {
      try {
        const response = await readEntries();
        setEntries(response);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    read();
  }, []);

  return (
    <div className="flex flex-col px-20">
      <div className="flex items-center justify-between my-3">
        <h1 className=" text-3xl">Entries</h1>
        <button className="bg-purple-900 text-white py-1 px-3 rounded-md">
          NEW
        </button>
      </div>
      <div className="flex flex-col">
        {entries.map((entry) => {
          return <EntryCard key={entry.entryId} entry={entry} />;
        })}
      </div>
    </div>
  );
}

type EntryProps = {
  entry: Entry;
};
function EntryCard({ entry }: EntryProps) {
  return (
    <div className="flex flex-col">
      <img src={entry.photoUrl}></img>
      <h4 className="font-medium">{entry.title}</h4>
      <p>{entry.notes}</p>
      <hr />
    </div>
  );
}
