import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { EntriesList } from './EntriesList';
import { EntryForm } from './EntryForm';

export type Entry = {
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
};

export default function App() {
  const dummy: Entry[] = [
    {
      entryId: 0,
      photoUrl: '',
      title: 'Title',
      notes: 'Caption!!!!',
    },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<EntriesList dataList={dummy} />} />
          <Route path="details/:entryId" element={<EntryForm />} />
        </Route>
      </Routes>
    </>
  );
}
