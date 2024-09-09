import { useEffect, useRef, useState } from 'react';
import {
  addEntry,
  Entry,
  readEntry,
  removeEntry,
  updateEntry,
} from './data.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';

export function EntryForm() {
  const [titleText, setTitleText] = useState('');
  const [urlText, setUrlText] = useState('');
  const [notesText, setNotesText] = useState('');
  const navigate = useNavigate();
  const { entryId } = useParams();
  const modalRef = useRef<HTMLDialogElement>(null);

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
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    }

    if (entryId) {
      read();
    }
  }, [entryId]);

  async function handleSubmit() {
    try {
      const newEntryObj: Entry = {
        title: titleText,
        photoUrl: urlText,
        notes: notesText,
      };
      if (entryId === undefined) {
        await addEntry(newEntryObj);
      } else {
        newEntryObj.entryId = +entryId;
        await updateEntry(newEntryObj);
      }
      navigate('/');
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  async function handleDelete() {
    try {
      await removeEntry(Number(entryId));
      modalRef.current?.close();
      alert('Entry deleted!');
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
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
        <div className="flex flex-row-reverse justify-between my-4">
          <button className="bg-purple-900 text-white rounded-md py-1 px-4">
            SAVE
          </button>
          {entryId && (
            <button
              type="button"
              onClick={() => modalRef.current?.showModal()}
              className="text-red-500 underline">
              Delete Entry
            </button>
          )}
        </div>
      </form>
      {createPortal(
        <dialog ref={modalRef} className="px-5 py-6">
          Are you sure you want to delete this entry?
          <div className="flex justify-around mt-4">
            <button
              onClick={() => modalRef.current?.close()}
              className="bg-gray-600 text-white rounded-md px-3 py-1">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-md px-3 py-1">
              Delete
            </button>
          </div>
        </dialog>,
        document.body
      )}
    </div>
  );
}
