const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// Create 'add' command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(notes.addNote(argv.title, argv.body));
    }
});

// Create 'remove' command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(notes.removeNote(argv.title));
    }
});

// Create 'list' command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        const allNotes = notes.listNotes();
        if (allNotes.length === 0) {
            console.log('No notes to display.');
        } else {
            console.log('Your notes:');
            allNotes.forEach((note) => console.log(`- ${note.title}`));
        }
    }
});

// Create 'read' command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const note = notes.readNote(argv.title);
        // Check if the returned value is an object (the note) or a string (error message)
        if (typeof note === 'object') {
            console.log(`Title: ${note.title}`);
            console.log(`Body: ${note.body}`);
        } else {
            console.log(note); // Prints "Note not found"
        }
    }
});

// Parse the arguments
const argv = yargs.parse();

// Handle incorrect/unknown commands
if (!['add', 'remove', 'list', 'read'].includes(argv._[0]) && argv._.length > 0) {
    console.log('command not recognized');
}