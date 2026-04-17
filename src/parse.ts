import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { type MavlinkSchemaDict, type DVDSHDict, type CLIArgs } from './typedefs';
import { ArgumentParser } from 'argparse';

// ----- CLI -----
const parser = new ArgumentParser({
    description: "Parses a `dvdsh` MAVLink file into .csv files that can be fed into Andrew's Python Models."
});
 
parser.add_argument('-f', '--file', {required: true, type: 'string', help: 'DVDSH JSON file to read'});
parser.add_argument('-o', '--output', {required: true, type: 'string', help: 'Output Directory'});

const args = parser.parse_args() as CLIArgs;
process_file(args.file, args.output);

// ---- Preprocess ----

// ---- Code -------
function process_file(file:string, output:string)
{
    if (!existsSync(file))
    {
        console.error("Error: Unable to find dvdsh input JSON file.");
        return;
    }

    if (!existsSync(output))
    {
        mkdirSync(output, {recursive: true});
        console.log(`Creating output directory ${output} since it currently does not exist.`);
    }


}