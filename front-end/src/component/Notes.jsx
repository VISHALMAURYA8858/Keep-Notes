import {
    Button,
    Modal,
    TextInput,
    Group,
    Textarea
}
    from '@mantine/core';
import { useState } from 'react';

import {
    MantineProvider,
    ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function Notes(props) {
    const [note, setNote] = useState({
        title: "",
        summary: ""
    });
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = value =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    function changeHandler(e) {
        setNote((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    function createNote() {

        fetch("http://127.0.0.1:4000/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        setNote({
            title: "",
            summary: ""
        });
    }

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{ colorScheme, defaultRadius: 'md' }}
                withGlobalStyles
                withNormalizeCSS>
                <div className='App'>
                    <Modal
                        opened={true}
                        size={'md'}
                        withCloseButton={false}
                        centered>
                        <Group mt={'md'} position={'right'}>
                            <Button
                            variant='outline'
                                onClick={() => {
                                    props.switchMenu(false);
                                }}>
                                All Notes
                            </Button>
                        </Group>
                        <TextInput
                            mt={'md'}
                            value={note.title}
                            placeholder={'Note Title'}
                            required
                            label={'Title'}
                            onChange={changeHandler}
                            name={'title'}
                        />
                        <Textarea
                            value={note.summary}
                            name={'summary'}
                            mt={'xs'}
                            minRows={10}
                            placeholder={'Note Summary'}
                            label={'Summary'}
                            onChange={changeHandler}
                        />
                        <Group mt={'md'} position={'apart'}>
                            <Button
                                onClick={() => {
                                    createNote();
                                }}>
                                Create Note
                            </Button>
                        </Group>
                    </Modal>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}