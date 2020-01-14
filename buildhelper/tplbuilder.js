/* eslint-disable  */
'use strict'
const path = require('path')
const chalk = require('chalk')
var fs = require('fs')
var spinner = require('ora')()
const sharp = require('sharp');
const pkg = require('../package.json')

String.prototype.replaceAll = function (FindText, RepText) {
  let regExp = new RegExp(FindText, "g");
  return this.replace(regExp, RepText);
}

console.log(chalk.blue('image tpl builder process'))
spinner.start();
let baseFolder = path.resolve(__dirname, '../img_json_info')
var cssSource = path.resolve(__dirname, '../src/assets/css/images.scss' )
var cssSourceContent = ''
var imageSource = path.resolve(__dirname, '../src/assets/images')
var jsonData = []
var tplFilePath = baseFolder
const CDNPATH = `https://freefiremobile-a.akamaihd.net/common/web_event`
// var tplFilePath = path.resolve(baseFolder, 'django_www/event_config/templates/event_config/')

// 读取文件内容
function readCssFile () {
  return new Promise((resolve, reject) => {
    console.log(chalk.white('try to find resource file:' + cssSource))
    cssSourceContent = fs.readFileSync(cssSource, 'utf-8',(err)=>{
      console.log(chalk.red('read file error'))
      reject(err)
    })
    resolve(true)
  })
}

// 准备json 信息
function processCssFiles(){
  return new Promise((resolve,reject)=>{
    console.log(chalk.white('try to analytics file:' + cssSource))
    var test = /.*url\(\".*\"\).*/g
    var lines = cssSourceContent.match(test)
    var urlTest = /"[\.\.\/]+images\/(.*?)\.(.*?)"/

    for(var i in lines){
      let res = lines[i].match(urlTest)
      let tmp = {}
      tmp['baseName'] = res[1]+'.'+res[2]
      tmp['basePath'] = imageSource+"/"+tmp['baseName']
      tmp['filePath'] = imageSource+'/'+tmp['baseName']
      tmp['name'] = res[1]
      tmp['ext'] = res[2]
      var img = sharp(tmp['filePath'])
      console.log(tmp)
      img.metadata().then(function(metadata){
        console.log(metadata)
        tmp['size'] = metadata.width+'x'+metadata.height
        jsonData.push(tmp)
        if(jsonData.length == lines.length){
          console.log(chalk.green('json data ready'))
          resolve(cssSourceContent)
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  }).then(function(){

    // 保存json 文件
    var saveJson = [];
    var saveCssStr = cssSourceContent
    for(var i in jsonData){
      saveJson.push({
        "name": jsonData[i].name,
        "localUrl": "/images/"+jsonData[i].baseName,
        "cdnUrl": CDNPATH+'/' +pkg.name + '/images/'+jsonData[i].baseName,
        "size": jsonData[i].size
      })
      console.log(jsonData[i].basePath)
      saveCssStr = saveCssStr.replaceAll(jsonData[i].basePath, '{{ '+jsonData[i].name+' }}')
    }
    var saveJsonStr = JSON.stringify(saveJson)
    var filePath = tplFilePath + '/images.json'
    fs.writeFile(filePath, saveJsonStr, (err)=>{
      if(err){
        reject(err)
        return
      }
      console.log(chalk.green('success save:' + filePath))
    })
    var cssPath = tplFilePath + '/images.css'
    fs.writeFile(cssPath, saveCssStr, (err)=>{
      if(err){
        reject(err)
        return
      }
      console.log(chalk.green('success save:' + cssPath))
    })
  })
}



let promises = []
promises.push(readCssFile())
promises.push(processCssFiles())


Promise.all(promises).then(res => {
  console.log(chalk.green('Process Successful！'))
  spinner.stop()
}).catch(rej => {
  console.error(rej)
  console.log(chalk.red('Upload failed！'))
  spinner.stop()
})
