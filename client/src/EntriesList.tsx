import { Entry } from './App';
type EntriesListProps = {
  dataList: Entry[];
};

export function EntriesList({ dataList }: EntriesListProps) {
  return (
    <>
      <div className="flex flex-col px-20">
        <div className="flex items-center justify-between my-3">
          <h1 className=" text-3xl">Entries</h1>
          <button className="bg-purple-900 text-white py-1 px-3 rounded-md">
            NEW
          </button>
        </div>
        <div className="flex flex-col">
          {dataList.map((entr) => {
            return <EntryCard entry={entr} />;
          })}
        </div>
      </div>
    </>
  );
}

type EntryProps = {
  entry: Entry;
};
function EntryCard({ entry }: EntryProps) {
  return (
    <div className="flex flex-col">
      <img src={entry.photoUrl}></img>
      <h4>{entry.title}</h4>
      <p>{entry.notes}</p>
    </div>
  );
}
