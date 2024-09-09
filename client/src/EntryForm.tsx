import { useState } from 'react';
import { Entry } from './App.tsx';

type Props = {
  onSubmit: (entryObj: Entry) => void;
};
export function EntryForm({ onSubmit }: Props) {
  const [titleText, setTitleText] = useState('');
  const [urlText, setUrlText] = useState<string>();
  const [notesText, setNotesText] = useState('');

  return (
    <div className="px-20">
      <h2 className="text-2xl font-semibold mt-4">New Entry</h2>
      <div>
        <img
          src={urlText ? urlText : '/images/placeholder-image-square.jpg'}
          className="w-full max-h-[500px] max-w-[500px] mt-4"
        />
      </div>
      <form
        onSubmit={() =>
          onSubmit({ title: titleText, photoUrl: urlText, notes: notesText })
        }>
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
