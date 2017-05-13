/**
 * Created by akd on 13/05/2017.
 */

const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class FilePattern extends EventEmitter {

    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(fl) {
        this.files.push(fl);
        return this;
    }

    find() {

        this.files.forEach( (file) => {
            fs.readFile(file, 'utf8', (error, contents) => {
                if (error)
                this.emit('error', error);

                this.emit('readfile', file, contents);
                let match;
                if (match = contents.match(this.regex) ) {
                    match.forEach(elem => this.emit('found', this.regex, elem));
                }
            });

        });
        return this;
    }
}

const fp = new FilePattern(/\d/);

fp.addFile('resources/a.json')
    .addFile('resources/b.txt')
    .find()
    .on('readfile', (f,c) => {
        console.log("Read file name " + f);
        console.log("Contents: \n" + c);
    })
    .on('found', (r,e) => console.log("Found regex " + r + " in " + e));