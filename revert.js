const path = require('path');
const fs = require('fs');
const jimp = require('jimp');
const readLine = require('readline');


//fs.readFile('UIUC.odt','hex',(err,Data) => {
//    if(err)
//        throw err(`doesn't exist`);
//    console.log(Data);
//    fs.writeFileSync('copy.odt',Data,'hex');
//})


//var readStream = fs.createReadStream('UIUC.odt','hex');
//var writeStream = fs.createWriteStream('copy.odt','hex');
//readStream.pipe(writeStream);
//readStream.end();

console.log(" --------      |---         |      |    ");
console.log("     |         |  |         |      |     ");
console.log("     |         |==|         |      |    ");
console.log("     |         |   \\        |      |   ");
console.log("     |         |    \\       |      |    ");
console.log("     |         |     \\      |------|        ");

const kb = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

kb.question('give me the directory of the picture: ', (answer) => {

    main(answer);
    console.log(`output of your given path ${answer}`);
    kb.close();
})














//minimize without actually using img.resize piece of shjt

//create arr holding ascii
var grayScales = [];
var grayArr = [];

//create ascii for later to mapp
var ascii = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
//read an images


function main (pictureDir)
{
//asdf

    jimp.read(pictureDir)
    .then(img => {
        img.resize(80,50, (err,img) => {

            if(err)
                throw err;

            ConvertToGray(img);

            })

    }).catch(err => {
        console.log(err)

    }) // end of reading img

}


function getAscii(gray)
{
    return ascii[Math.ceil((ascii.length -1) * gray / 255)];
}


function copyOnWrite() {
    if(fs.existsSync('copy.txt'))
        fs.truncateSync('copy.txt')
    else
        fs.writeFileSync('copy.txt',"");


    for(let i=0;i<grayScales.length;i++)
    {
        for(let j=0;j<grayScales[i].length;j++)
        {
            fs.appendFileSync('copy.txt',grayScales[i][j] + " ");
        }
        fs.appendFileSync('copy.txt', "\n");
    }
}


function ConvertToGray(img)
{
    for(let y = 0;y < img.bitmap.height; y++) //loop through width
            {
                for(let x = 0;x < img.bitmap.width; x++) //loop through height
                {

                    //converting to ascii
                    var R = img.bitmap.data[img.getPixelIndex(x,y)];
                    var G = img.bitmap.data[img.getPixelIndex(x,y) + 1];
                    var B = img.bitmap.data[img.getPixelIndex(x,y) + 2];
                    var A = img.bitmap.data[img.getPixelIndex(x,y) + 3];

    		        console.log(x,y,R,G,B,A);

                    var gray = .21*R + .72*G + .07*B;
                    grayArr.push(getAscii(gray));
                    var grayHex = jimp.rgbaToInt(gray, gray, gray, A);
                    img.setPixelColor(grayHex,x,y);



                } // end of height
                grayScales.push(grayArr);
    	        grayArr = [];

            }//end of width
    	    img.write('asd.png');
            copyOnWrite();

}
