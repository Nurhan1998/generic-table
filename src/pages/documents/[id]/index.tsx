import React, { useCallback, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import {
  BoldExtension,
  ItalicExtension,
  BlockquoteExtension,
  AnnotationExtension,
  CodeBlockExtension,
  FontFamilyExtension,
  FontSizeExtension,
  UnderlineExtension,
  MentionExtension,
  HeadingExtension,
} from 'remirror/extensions';
import {
  Remirror,
  useRemirror,
  ComponentItem,
  ThemeProvider,
  Toolbar,
  EditorComponent,
  useMention, useKeymap,
} from '@remirror/react';
import type { ToolbarItemUnion } from '@remirror/react';

import {
  singleDocumentSelectTypes,
  singleDocumentSelectOformlenie,
  singleDocumentSelectContrAgent,
  singleDocumentSelectSide,
  singleDocumentSelectNameOfDocument,
  singleDocumentSelectInfoAboutAgreement, singleDocumentSelectTypeOfTransaction
} from 'pages/documents/mockedData';

import 'remirror/styles/all.css';

const toolbarItems: ToolbarItemUnion[] = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'undo', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'redo', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleBold', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleItalic', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleUnderline', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Heading Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 1 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 2 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 3 },
      },
    ],
    separator: 'none',
  }
];


const hooks = [
  () => {
    const saveStuff = useCallback(() => {
      console.log('Im saved');
      return true;
    }, []);

    useKeymap('Mod-s', saveStuff);
    useMention({ items: [{ id: '1', label: 'hello' }, { id: '2', label: 'two' }] });
  }
];

const DocumentDetails = (): JSX.Element => {
  const [oformlenie, setOformlenie] = useState<string>();
  const [type, setType] = useState<string>();
  const [contragent, setContragent] = useState<string>();
  const [typeOfTransaction, setTypeOfTransaction] = useState<string>();
  const [side, setSide] = useState<string>();
  const [nameOfDocument, setNameOfDocument] = useState<string>();
  const [infoAboutAgreement, setInfoAboutAgreement] = useState<string>();

  const handleChangeOformlenie = (event: SelectChangeEvent) => {
    setOformlenie(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleChangeContragent = (event: SelectChangeEvent) => {
    setContragent(event.target.value as string);
  };

  const handleChangeSide = (event: SelectChangeEvent) => {
    setSide(event.target.value as string);
  };

  const handleChangeNameOfDocument = (event: SelectChangeEvent) => {
    setNameOfDocument(event.target.value as string);
  };

  const handleChangeInfoAboutAgreement = (event: SelectChangeEvent) => {
    setInfoAboutAgreement(event.target.value as string);
  };

  const handleChangeTypeOfTransaction = (event: SelectChangeEvent) => {
    setTypeOfTransaction(event.target.value as string);
  };

  const dataForSelectors = [
    {
      id: 'oformlenie',
      label: 'Оформление',
      value: oformlenie,
      onChange: handleChangeOformlenie,
      items: singleDocumentSelectOformlenie,
    },
    {
      id: 'type',
      label: 'Выберите тип',
      value: type,
      onChange: handleChangeType,
      items: singleDocumentSelectTypes,
    },
    {
      id: 'contragent',
      label: 'Контрагент',
      value: contragent,
      onChange: handleChangeContragent,
      items: singleDocumentSelectContrAgent,
    },
    {
      id: 'type-of-transaction',
      label: 'Вид сделки',
      value: typeOfTransaction,
      onChange: handleChangeTypeOfTransaction,
      items: singleDocumentSelectTypeOfTransaction,
    },
    {
      id: 'side',
      label: 'Сторона',
      value: side,
      onChange: handleChangeSide,
      items: singleDocumentSelectSide,
    },
    {
      id: 'name-of-document',
      label: 'Название документа',
      value: nameOfDocument,
      onChange: handleChangeNameOfDocument,
      items: singleDocumentSelectNameOfDocument,
    },
    {
      id: 'info-about-agreement',
      label: 'Информация о договоренности',
      value: infoAboutAgreement,
      onChange: handleChangeInfoAboutAgreement,
      items: singleDocumentSelectInfoAboutAgreement,
    },
  ];

  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new BlockquoteExtension(),
      new AnnotationExtension(),
      new CodeBlockExtension(),
      new FontFamilyExtension(),
      new FontSizeExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new MentionExtension({
        suggestTag: '[[',
        matchers: []
      }),
    ],
    content: '<p>I love <b>Remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  });



  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" my={4}>
        Шаблоны документов
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box mb={2}>
          <Grid container spacing={2}>
            {
              dataForSelectors.map(item => (
                <Grid key={item.id} item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`${item.id}-select-label`}>{item.label}</InputLabel>
                    <Select
                      labelId={`${item.id}-select-label`}
                      id={`${item.id}-select`}
                      value={item.value}
                      label={item.label}
                      onChange={item.onChange}
                    >
                      {
                        item.items.map(item => (
                          <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              ))
            }
          </Grid>
        </Box>
        <Typography mb={2}>Шаблон документа</Typography>
        <Box>
          <div className="remirror-theme">
            {/* the className is used to define css variables necessary for the editor */}
            <ThemeProvider>
              <Remirror manager={manager} initialContent={state} hooks={hooks} >
                <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
                <EditorComponent />
              </Remirror>
            </ThemeProvider>
          </div>
        </Box>
      </Paper>
    </Container>
  );
};

export default DocumentDetails;
