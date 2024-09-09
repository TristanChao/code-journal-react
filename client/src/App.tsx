import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { EntriesList } from './EntriesList';
import { EntryForm } from './EntryForm';
import { NotFound } from './NotFound';
import { Data, readData, writeData } from './data.ts';
import { useEffect, useState } from 'react';

export type Entry = {
  entryId: number;
  title: string;
  photoUrl: string | undefined;
  notes: string;
};

export default function App() {
  const [data, setData] = useState<Data>();

  const dummy: Entry[] = [
    {
      entryId: 0,
      photoUrl: 'https://picsum.photos/200',
      title: 'Title',
      notes: 'Caption!!!!',
    },
  ];

  useEffect(() => {
    setData(readData);
  }, []);

  function handleSubmit(entryObj: Entry) {
    data.entries.push(entryObj);
    writeData();
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<EntriesList dataList={dummy} />} />
          <Route
            path="details/:entryId"
            element={<EntryForm onSubmit={handleSubmit} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
