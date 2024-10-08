import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { EntriesList } from './EntriesList';
import { EntryForm } from './EntryForm';
import { NotFound } from './NotFound';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<EntriesList />} />
          <Route path="details" element={<EntryForm />} />
          <Route path="details/:entryId" element={<EntryForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
