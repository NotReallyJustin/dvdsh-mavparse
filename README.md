# dvdsh-mavparse
Parses a `dvdsh` MAVLink file into .csv files that can be fed into Andrew's Python Models, or lowkey any of our UAV detection models

# Build Instructions
In Linux or WSL, run:
```bash
./build.sh
```
(Although you should be able to get away with this on Powershell since the commands are virtually identical).
<br>
The binary is going to be in `./bin`. <br>
Compiled `.js` files will temporarily be in `./dist`. Don't worry about them.

# Usage
This should look and function like any Linux CLI tool. <br>
Even if you don't want to look at the options below, it should hopefully be pretty intuitive.
```
Usage: dvdsh_mavparse [options]

Parses a `dvdsh` MAVLink file into .csv files that can be fed into Andrew's Python Models.

Options:
  -V, --version           output the version number
  -f, --file <filePath>   dvdsh JSON file to read and parse
  -o, --output <dirPath>  Output Directory for .csv files
  -h, --help              display help for command
```
