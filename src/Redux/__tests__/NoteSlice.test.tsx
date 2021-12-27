import reducer, {
  createNote,
  deleteCurrentNote,
  saveNote,
  updateCurrentNote,
  updateIsEditing,
  updateNeverOpened,
} from '../NoteSlice';

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('Note slice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should change the saved message when edited', () => {
    jest.setSystemTime(new Date(2020, 3, 1));

    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    };

    expect(
      reducer(
        previousState,
        saveNote({ content: 'only with new content', uid: '1' })
      )
    ).toEqual({
      notes: [
        {
          content: 'only with new content',
          savedMessage: 'Edited on Wed Apr. 1 at 0:00 AM',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    });
  });

  it('should not change the edited message if the content is the same', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    };

    expect(
      reducer(previousState, saveNote({ content: 'My content', uid: '1' }))
    ).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    });
  });

  it('correctly shows the PM time', () => {
    jest.setSystemTime(new Date(2020, 3, 1, 13, 30));
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    };

    expect(
      reducer(previousState, saveNote({ content: 'New content', uid: '1' }))
    ).toEqual({
      notes: [
        {
          content: 'New content',
          savedMessage: 'Edited on Wed Apr. 1 at 1:30 PM',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    });
  });

  it('only modifys the state requested', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
          neverOpened: false,
        },
        {
          content: 'Another content',
          savedMessage: 'Never Saved',
          uid: '2',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    };

    expect(
      reducer(previousState, saveNote({ content: 'change content', uid: '2' }))
    ).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
          neverOpened: false,
        },
        {
          content: 'change content',
          savedMessage: 'Edited on Wed Apr. 1 at 0:00 AM',
          uid: '2',
          neverOpened: false,
        },
      ],
      currentNoteUid: '0',
      isEditing: false,
    });
  });

  it('correctly deletes note', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          uid: '2',
          neverOpened: false,
        },
      ],
      currentNoteUid: '2',
      isEditing: false,
    };

    expect(reducer(previousState, deleteCurrentNote())).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '',
      isEditing: false,
    });
  });
  it('correctly makes note', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    jest.mock('uuid/v4', () => () => '00000000-0000-0000-0000-000000000000');

    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
      ],
      currentNoteUid: '1',
      isEditing: false,
    };

    expect(reducer(previousState, createNote())).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
        {
          content: '',
          neverOpened: true,
          savedMessage: 'Never saved',
          uid: '00000000-0000-0000-0000-000000000000',
        },
      ],
      currentNoteUid: '1',
      isEditing: false,
    });
  });
  it('correctly updated current note', () => {
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '1',
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '2',
        },
      ],
      currentNoteUid: '2',
      isEditing: false,
    };

    expect(reducer(previousState, updateCurrentNote({ uid: '1' }))).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '1',
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '2',
        },
      ],
      currentNoteUid: '1',
      isEditing: false,
    });
  });

  it('updates never opened flag', () => {
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
          neverOpened: false,
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          uid: '2',
          neverOpened: true,
        },
      ],
      currentNoteUid: '2',
      isEditing: false,
    };

    expect(reducer(previousState, updateNeverOpened({ uid: '2' }))).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '1',
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          neverOpened: false,
          uid: '2',
        },
      ],
      currentNoteUid: '2',
      isEditing: false,
    });
  });

  it('updates the isEditing flag', () => {
    const previousState = {
      notes: [],
      currentNoteUid: '2',
      isEditing: true,
    };

    expect(
      reducer(previousState, updateIsEditing({ isEditing: false }))
    ).toEqual({
      notes: [],
      currentNoteUid: '2',
      isEditing: false,
    });
  });
});
