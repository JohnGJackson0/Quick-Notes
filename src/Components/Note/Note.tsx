import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { RootState } from '../../Redux/store';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import {
  saveNote,
  updateCurrentNote,
  updateIsEditing,
} from '../../Redux/NoteSlice';
import { HALF_MINUTE_TO_MS, MENU_HEIGHT } from '../../../constants/Constants';
import { withTheme } from '../../Theme/withTheme';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import Screen from '../../Theme/Screen';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

interface Props {
  waitTime?: number;
  themeContext: ThemeContext;
  route: { params: { position: number } };
}

const Note = ({ waitTime, themeContext, route }: Props) => {
  const _editor = useRef<QuillEditor>(null);
  const colors = themeContext.colors;
  const { position } = route.params;

  const note = useAppSelector(
    (state: RootState) => state.notes.notes[position]
  );
  const isEditing = useAppSelector((state: RootState) => state.notes.isEditing);

  const [content, setContent] = useState(note.content);
  const [savedMessage, setSavedMesage] = useState(note.savedMessage);

  const dispatch = useAppDispatch();

  const timeToWait = waitTime || HALF_MINUTE_TO_MS / 120;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveNote({ content: content, uid: note.uid }));
    }, timeToWait);

    return () => clearInterval(interval);
  }, [timeToWait, dispatch, content, note.uid]);

  useEffect(() => {
    setSavedMesage(note.savedMessage);
  }, [note.savedMessage]);

  useEffect(() => {
    dispatch(updateCurrentNote({ uid: note.uid }));
  });

  useEffect(() => {
    if (isEditing === false) {
      _editor?.current?.blur();
    }
  }, [isEditing]);

  const onChange = (value: { html: string }) => {
    setContent(value.html);
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [
      { header: [1, 2, 3, 4, 5, 6, false] },
      { size: ['small', false, 'large', 'huge'] },
    ],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
  ];

  return (
    <Screen style={styles(colors).screen} scroll={false}>
      <View style={styles(colors).content}>
        <View style={styles(colors).editorContainer}>
          <Pressable
            style={styles(colors).fullFlex}
            onPress={() => {
              dispatch(updateIsEditing({ isEditing: true }));
            }}
            testID="editor"
          >
            <QuillEditor
              style={styles(colors).richEditor}
              initialHtml={content}
              ref={_editor}
              onHtmlChange={onChange}
              quill={{
                placeholder: 'Content',
                modules: {
                  toolbar: false,
                },
                theme: 'bubble',
              }}
              theme={{
                background: colors.surface,
                color: colors.text,
                placeholder: colors.secondaryText,
              }}
            />
          </Pressable>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //height of menu, maybe make this a constant?
          keyboardVerticalOffset={MENU_HEIGHT}
        >
          <QuillToolbar
            editor={_editor}
            options={toolbarOptions}
            theme={themeContext.isLight ? 'light' : 'dark'}
            styles={{
              toolbar: {
                provider: (provided) => ({
                  ...provided,
                  borderColor: colors.background,
                }),
                root: (provided) => ({
                  ...provided,
                  backgroundColor: colors.background,
                  borderWidth: 0,
                }),
              },
            }}
          />
        </KeyboardAvoidingView>
        <Text style={styles(colors).text}>{savedMessage}</Text>
      </View>
    </Screen>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    fullFlex: {
      flex: 1,
    },
    editorContainer: {
      flex: 1,
      height: 'auto',
      backgroundColor: colors.background,
    },
    customRichEditor: {
      backgroundColor: colors.surface,
    },
    keyboardAvodingItem: {
      flex: 1,
    },
    richEditor: {
      flex: 1,
      textAlignVertical: 'top',
    },
    title: {
      marginTop: 5,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 2.5,
    },
    textInput: {
      backgroundColor: colors.surface,
      color: colors.text,
      fontSize: 18,
    },
    text: {
      textAlignVertical: 'top',
      margin: 5,
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
    },
  });

export default withTheme(Note);
