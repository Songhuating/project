# project
  1. 本地创建一个文件夹，通过git init把它变成Git仓库，多出来一个.git文件，若没有，则可能是隐藏了
  2. 把项目复制到这个文件夹里，然后git add . 把项目添加到仓库；
  3. git commit -m "注释内容" 把项目提交到仓库
  4. 关联本地仓库 和远程仓库（githup上建立的仓库）
        git remote add origin https://github.com/Songhuating/project.git
  5. 推送本地库所有内容到远程仓库
      第一次：git push -u origin master
      之后：git push origin master


  
