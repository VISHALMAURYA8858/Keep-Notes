import {
	Button,
	Container,
	Text,
	Title,
	Group,
	Card,
	ActionIcon
}
	from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import {
	MantineProvider,
	ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function AllNotes(props) {
	const [notes, setNotes] = useState([]);

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	function deleteNote(id) {
		var clonedNotes = [...notes];

		fetch("http://127.0.0.1:4000/notes/" + id, {
			method: 'DELETE',
		}).then((res) => {
			let idx = clonedNotes.findIndex((note) => note.key === id);
			clonedNotes.splice(idx, 1);

			setNotes(clonedNotes);
		});

	}
	function loadNotes() {
		fetch("http://127.0.0.1:4000/notes").then(
			(res) => res.json()

		).then((data) => {
			if (data.length) {
				setNotes(data.map((note) => {
					return {
						title: note.heading,
						summary: note.body,
						key: note._id
					}
				}));
			}
		});
	}
	useEffect(() => {
		loadNotes();
	}, []);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					{

					}
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								Keep Notes
							</Title>
							<ActionIcon
								color={'blue'}
								onClick={() => toggleColorScheme()}
								size='lg'>
								{colorScheme === 'dark' ? (
									<Sun size={16} />
								) : (
									<MoonStars size={16} />
								)}
							</ActionIcon>
							<Button
								onClick={() => {
									props.switchMenu(true);
								}}>
								Create Note
							</Button>
						</Group>
						{notes.length > 0 ? (
							notes.map((note) => {
								if (note.title) {
									return (
										<Card withBorder key={note.key} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{note.title}</Text>
												<ActionIcon
													onClick={() => {
														deleteNote(note.key);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
												{note.summary
													? note.summary
													: 'No summary was provided for this note'}
											</Text>
										</Card>
									);
								}
								return (<></>);
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no notes
							</Text>
						)}
						
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
