const fs = require('fs');
const file = process.argv[2];

const read = fs.createReadStream(file);

read.setEncoding('utf8');

read.on('data', (data)=>{
    const splitted = data.split("\n");
    const head = splitted[0].split("\t");

    let csvArray = [];
    let csvData = {}

    splitted.forEach( (split, index) => {
        if(index == 0) return;
        let d = split.split("\t");
        if(d.length > 1){
            head.forEach( (h, index) => {
                if(!csvData[h]) csvData[h] = [];
                if(!!d[index]) csvData[h].push(d[index]);
            });
        } else {
            let h = csvData[head[0]];
            if(!!h && h.length == 1) csvData[head[0]] = h[0];
            if(csvData !== {}) csvArray.push(csvData);
            csvData = {};
        };
    });
    console.log(csvArray);
})

read.on('end', () => {
    console.log('ended')
})