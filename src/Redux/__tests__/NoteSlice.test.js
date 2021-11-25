import reducer, { saveNote } from '../NoteSlice';

describe('Note slice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the intial state', () => {
    expect(reducer(undefined, {})).toEqual({
      content: '',
      savedMessage: 'Never Saved',
      title: '',
    });
  });

  it('should change the saved message when edited', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      content: 'My content',
      savedMessage: 'This should not be edited',
      title: 'My title',
    };

    expect(
      reducer(
        previousState,
        saveNote({ title: 'New Title', content: 'My Content' })
      )
    ).toEqual({
      content: 'My Content',
      savedMessage: 'Autosaved on Wed Apr. 1 at 0:00 AM',
      title: 'New Title',
    });
  });

  it('should not change the autosaved message if content and title are the same', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      content: 'My content',
      savedMessage: 'This should not be edited',
      title: 'My title',
    };

    expect(
      reducer(
        previousState,
        saveNote({ title: 'My title', content: 'My content' })
      )
    ).toEqual({
      content: 'My content',
      savedMessage: 'This should not be edited',
      title: 'My title',
    });
  });

  it('should change the saved message if only the title is changed', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      content: 'My content',
      savedMessage: 'Never saved',
      title: 'My title',
    };

    expect(
      reducer(
        previousState,
        saveNote({ title: 'New title', content: 'My content' })
      )
    ).toEqual({
      content: 'My content',
      savedMessage: 'Autosaved on Wed Apr. 1 at 0:00 AM',
      title: 'New title',
    });
  });

  it('should change the saved message if only the content is changed', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    const previousState = {
      content: 'My content',
      savedMessage: 'Never saved',
      title: 'My title',
    };

    expect(
      reducer(
        previousState,
        saveNote({ title: 'My title', content: 'New content' })
      )
    ).toEqual({
      content: 'New content',
      savedMessage: 'Autosaved on Wed Apr. 1 at 0:00 AM',
      title: 'My title',
    });
  });
  it('correctly shows the PM time', () => {
    jest.setSystemTime(new Date(2020, 3, 1, 13, 30));
    const previousState = {
      content: 'My content',
      savedMessage: 'Never saved',
      title: 'My title',
    };

    expect(
      reducer(
        previousState,
        saveNote({ title: 'My title', content: 'New content' })
      )
    ).toEqual({
      content: 'New content',
      savedMessage: 'Autosaved on Wed Apr. 1 at 1:30 PM',
      title: 'My title',
    });
  });
});
