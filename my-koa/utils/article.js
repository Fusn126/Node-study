const db = require('./db')
const readFileFn =require('./sqldata')

let vueContent, reactContent, angularContent;
var fn = async () => {
  	// 分别读取这几份txt文件
    vueContent = await readFileFn('vue');
    reactContent = await readFileFn('react');
    angularContent = await readFileFn('angular');

    let data = [
        {id: 3, title: "一套框架多种平台 移动端&桌面端", author: "张三丰", date: "2013-03-22", imgUrl: "/images/dt.png", content: angularContent},
        {id: 4, title: "渐进式的JavaScript 框架", author: "小鱼儿", date: "2014-04-23", imgUrl: "/images/dt.png", content: vueContent},
        {id: 5, title: "一套框架多种平台 移动端&桌面端", author: "花无缺", date: "2015-05-24", imgUrl: "/images/dt.png", content: reactContent}
    ]

    data.map(val=>{
        let sql = `INSERT INTO article VALUES (${val.id}, '${val.title}', '${val.author}', '${val.date}', '${val.imgUrl}', '${val.content}')`;
        db.query(sql, (err, data)=>{
            if(err) console.log(err);
            console.log(data)
        })
    })
}
fn();