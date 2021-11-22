# JV-FE react-hook-template


### 基于webpack5封装的脚手架,主要集成功能有

    - 全面支持typescript
    - 基于hook的react及react全家桶,包含redux,ant-design,react-router等,有效提高代码质量
    - 根据注释自动生成开发文档方便溯源
    - 针对vscode,提供了editorconfig和eslint以及prettier,达到前端团内部一致的开发体验和统一的代码编写风格
    - 基于路由的代码切割按需引用和webpack的bundle analyze.

### future 

    - 自动化单元测试
    - 

### 启动命令:
`npm run dev`
   
    以开发模式启动项目,默认在8080端口,在package.json的port字段可以修改启动端口.

`npm run build`

    构建生成环境适用的build安装包.

`npm run analyze`

    构建生成环境适用的build安装包,并同步生成依赖分析报告图.

`npm run docs`

    根据注释自动生成开发文档方便版本迭代时硕源



