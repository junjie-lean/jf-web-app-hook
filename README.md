# JV-FE react-hook-template


### 基于webpack5封装的脚手架,主要集成功能有

    - typescript
    - 基于hook的react及react全家桶,包含redux,ant-design,react-router等
    - 自动化单元测试(未完全调试适配)
    - 自动生成开发文档
    - 针对vscode,提供了editorconfig和eslint以及prettier,达到一致的开发体验和统一代码编写风格


### 启动命令:
`npm run dev`
   
    以开发模式启动项目,默认在8080端口,在package.json的port字段可以修改启动端口.

`npm run build`

    构建生成环境适用的build安装包.

`npm run analyze`

    构建生成环境适用的build安装包,并同步生成依赖分析报告图.

`npm run test`
    
    执行 /src/test/unit_testing 目录下的单元测试用例.

`npm run docs`

    根据注释自动生成开发文档方便版本迭代时硕源


