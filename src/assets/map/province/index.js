// 定义一个函数，用于批量导入JSON文件
function importAll (r) {
  let files = {}
  r.keys().forEach(key => {
    var fileName = key.replace(/(.*\/)*([^.]+).*/ig,"$2");
    files[fileName] = r(key)
  })
  return files
}

// 导入当前目录下所有以 .json 结尾的文件
export default importAll(require.context('.', true, /\.json$/))