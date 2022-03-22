// 给表zixun添加数据
const db = require('./db')
const data = [
    {id: 3, icon: '/images/angular.gif', subtitle: "学会用 Angular 构建应用，把这些代码和能力复用在多种不同平台的应用上", title: "一套框架多种平台 移动端&桌面端"},
    {id: 4, icon: '/images/vue.gif', subtitle: "不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩", title: "渐进式的JavaScript 框架"},
    {id: 5, icon: '/images/react.gif', subtitle: "组件逻辑使用 JavaScript 编写而非模版，你可以轻松地在应用中传递数据，并使得状态与 DOM 分离", title: "用于构建用户界面的 JavaScript 库"},
]

data.map(val=>{
    let sql = `INSERT INTO zixun VALUES (${val.id}, '${val.title}', '${val.subtitle}', '${val.icon}')`;
    db.query(sql, (err, data)=>{
        if(err) console.log(err);
        console.log(data)
    })
})