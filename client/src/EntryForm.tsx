import { useEffect, useState } from 'react';
import { addEntry, readEntry, updateEntry } from './data.ts';
import { useNavigate, useParams } from 'react-router-dom';

export function EntryForm() {
  const [titleText, setTitleText] = useState('');
  const [urlText, setUrlText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [entryNumber, setEntryNumber] = useState(0);
  const navigate = useNavigate();
  const { entryId } = useParams();
  // {entryId : 'id'}

  useEffect(() => {
    async function read() {
      try {
        const response = await readEntry(Number(entryId));
        if (!response) {
          return;
        }
        setTitleText(response.title);
        setUrlText(response.photoUrl);
        setNotesText(response.notes);
        setEntryNumber(response.entryId);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    }
    read();
  }, []);

  async function handleSubmit() {
    try {
      const newEntryObj = {
        title: titleText,
        photoUrl: urlText,
        notes: notesText,
        entryId: entryNumber,
      };
      if (entryId === 'new') {
        await addEntry(newEntryObj);
      } else {
        await updateEntry(newEntryObj);
      }
      navigate('/');
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  return (
    <div className="px-20">
      <h2 className="text-2xl font-semibold mt-4">New Entry</h2>
      <div>
        <img
          src={urlText || '/images/placeholder-image-square.jpg'}
          className="w-full max-h-[500px] max-w-[500px] mt-4"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="title-input">Title</label>
        </div>
        <input
          required
          id="title-input"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          className="border bg-gray-100 w-full"
        />
        <div className="mt-4">
          <label htmlFor="url-input">Photo URL</label>
        </div>
        <input
          required
          id="url-input"
          value={urlText}
          onChange={(e) => setUrlText(e.target.value)}
          className="border bg-gray-100 w-full"
        />
        <div className="mt-4">
          <label htmlFor="notes-input">Notes</label>
        </div>
        <textarea
          required
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          id="notes-input"
          className="border bg-gray-100 w-full"
        />
        <div className="flex justify-end my-4">
          <button className="bg-purple-900 text-white rounded-md py-1 px-4">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
