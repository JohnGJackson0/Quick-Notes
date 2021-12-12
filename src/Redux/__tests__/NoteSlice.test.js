import reducer, {
  createNote,
  deleteCurrentNote,
  saveNote,
  updateCurrentNote,
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

  it('should return the intial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentNoteUid: '',
      notes: [],
    });
  });

  it('should change the saved message when edited', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
        },
      ],
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
        },
      ],
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
        },
      ],
    };

    expect(
      reducer(previousState, saveNote({ content: 'My content', uid: 1 }))
    ).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
        },
      ],
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
        },
      ],
    };

    expect(
      reducer(previousState, saveNote({ content: 'New content', uid: '1' }))
    ).toEqual({
      notes: [
        {
          content: 'New content',
          savedMessage: 'Edited on Wed Apr. 1 at 1:30 PM',
          uid: '1',
        },
      ],
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
        },
        {
          content: 'Another content',
          savedMessage: 'Never Saved',
          uid: '2',
        },
      ],
    };

    expect(
      reducer(previousState, saveNote({ content: 'change content', uid: '2' }))
    ).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'This should not be edited',
          uid: '1',
        },
        {
          content: 'change content',
          savedMessage: 'Edited on Wed Apr. 1 at 0:00 AM',
          uid: '2',
        },
      ],
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
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          uid: '2',
        },
      ],
      currentNoteUid: '2',
    };

    expect(reducer(previousState, deleteCurrentNote())).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
        },
      ],
      currentNoteUid: '',
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
        },
      ],
    };

    expect(reducer(previousState, createNote())).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
        },
        {
          content: '',
          neverOpened: true,
          savedMessage: 'Never saved',
          uid: '00000000-0000-0000-0000-000000000000',
        },
      ],
    });
  });
  it('correctly updated current note', () => {
    const previousState = {
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          uid: '2',
        },
      ],
      currentNoteUid: '2',
    };

    expect(reducer(previousState, updateCurrentNote({ uid: '1' }))).toEqual({
      notes: [
        {
          content: 'My content',
          savedMessage: 'Never saved',
          uid: '1',
        },
        {
          content: 'Another content',
          savedMessage: 'Never saved',
          uid: '2',
        },
      ],
      currentNoteUid: '1',
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
    });
  });
});
