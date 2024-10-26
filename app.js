const fs = require("node:fs")
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        })
        rl.close()
    })
} 

// To Do : lanjutkan pembuatan logic disini 
app.makeFile = () => {
    rl.question("Masukan nama folder: ", (folderName) => {
        rl.question("Masukan nama file: ",(fileName) => {
            rl.question("Masukan extension: ", (ext) => {
                fs.writeFileSync(`${folderName}/${fileName}.${ext}`, "");
                rl.close();
            })
        }) 
    })
}

app.extSorter = () => {
    const res = fs.readdirSync("unorganize_folder");

    for(let i = 0; i < res.length; i++) {
        const element = res[i];
        const ext = element.split(".")[element.split(".").length-1];

        let targetFolder;
        if(["txt", "md", "pdf"].includes(ext)) {
            targetFolder = 'text';
        } else if(["jpg", "png"].includes(ext)) {
            targetFolder = 'image';
        } else {
            targetFolder = 'undefine_type';
        }

        if(!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
            console.log(`Folder berhasil dibuat ${targetFolder}`);
        }

        fs.renameSync(
            __dirname + "/unorganize_folder/" + element,
            __dirname + "/" + targetFolder + "/" + element
        );
        console.log("File berhasil dipindah ke folder yang sesuai")
        rl.close();
    }
}

app.readFolder = () => {
    rl.question("Masukan nama folder: ", (folderName) => {
        const folderPath = __dirname + `/${folderName}`;

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.log("gagal membaca folder: ", err);
            } else {
                const fileDetail = files.map((file) => {
                const filePath = folderPath + "/" + file;
                const stat = fs.statSync(filePath);

                let jenisFile;
                const ext = file.split(".").pop();
                    if (ext === '.jpg' || ext === '.png') {
                        jenisFile = 'gambar';
                    } else if (ext === '.txt' || ext === '.md'){
                        jenisFile = 'teks';
                    } else {
                        jenisFile = 'lainnya';
                    }

                    return{
                        namaFile: file,
                        extensi: ext,
                        jenisFile: jenisFile,
                        tanggalDibuat: stat.birthtime,
                        ukuranFile: stat.size
                    }
                })
                console.log(fileDetail);
                rl.close();
            }
        })
    })
}

app.readFile = () => {
    rl.question("Masukan nama folder: ", (folderName) => {
    rl.question("Masukan Nama File yang ingin dibaca: ", (fileName) => {
        const filePath = __dirname + `/${folderName}/${fileName}`;
        
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error("Gagal membaca file:", err);
                } else {
                    console.log(`isi dari file ${fileName}\n\n ${content}`);
                }
                rl.close();
            })
        })        
    })
}


module.exports = app