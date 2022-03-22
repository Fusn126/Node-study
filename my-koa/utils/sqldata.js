const fs = require('fs')

// 读取文件的函数
 function readFileFn(subject){
    return new Promise((resolve, reject)=>{
        fs.readFile(`../assets/${subject}.txt`, (err, data)=>{
            if(err) throw err;
            resolve(data.toString())
        })
    })
}
module.exports = readFileFn 