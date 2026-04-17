import { appendFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { type MavlinkSchemaDict, type DVDSHDict, type CLIArgs } from './typedefs';
import { program } from 'commander';
import MAVLINK_SCHEMA from './mavlink_min.json';

// ----- CLI -----
program
    .name('dvdsh_mavparse')
    .version('1.0.0')
    .description("Parses a `dvdsh` MAVLink file into .csv files that can be fed into Andrew's Python Models.")
    .requiredOption('-f, --file <filePath>', 'dvdsh JSON file to read and parse')
    .requiredOption('-o, --output <dirPath>', 'Output Directory for .csv files');

if (process.argv.length == 2)
{
    program.help();
}

const args:CLIArgs = program.parse(process.argv).opts();
process_file(args.file, args.output);

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
    
    // Read mavlink_min with all the formally parsed MAVLink info
    const mavlink_processed = MAVLINK_SCHEMA as MavlinkSchemaDict;

    // Read dvdsh output and iterate through each output
    let dvdsh_read:string;
    let dvdsh_output:DVDSHDict;
    try
    {
        dvdsh_read = readFileSync(file, {encoding: 'utf-8'});
        dvdsh_output = JSON.parse(dvdsh_read) as DVDSHDict;
    }
    catch(err)
    {
        console.error("Failed to read output file " + output + ".");
        console.error(err);
        return;
    }

    dvdsh_output.forEach((packet) => {

        let msgid = packet.data.meta.msgid as keyof typeof mavlink_processed;
        if (mavlink_processed[msgid] == undefined)
        {
            console.error("Error: Packet with message ID " + packet.data.meta.msgid + " might not exist.");
            return;
        }

        const packet_type = mavlink_processed[msgid].type;
        const packet_fields = mavlink_processed[msgid].fields.map((field_schema) => field_schema.name);

        // Detect if CSV already exists. If not, we need to create file and 
        // reconstruct header fields
        const csv_path = join(output, `${packet_type}.csv`)
        if (!existsSync(csv_path))
        {
            let csv_header = "timestamp," + packet_fields.join(",") + "\n";
            appendFileSync(csv_path, csv_header);
        }

        let packet_data = "";

        // First get timestamp regardless of data.
        // Then iterate through each field in PROPER SCHEMA ORDER and collect the data
        packet_data += packet.data.meta.timestamp;
        packet_fields.forEach((field_name) => {
            packet_data += `,${packet.data.data[field_name]}`;
        });
        packet_data += "\n";

        appendFileSync(csv_path, packet_data);
    });

    console.log("✅ Done.")
}