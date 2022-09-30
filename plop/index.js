module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('component', {
    description: '新增一个组件',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名：',
        default: 'Button',
      },
    ], // array of inquirer prompts
    actions: [
      (data) => {
        console.log(123, data)
        const actions = [
          {
            type: 'add',
            path: '../src/components/{{componentName}}/index.vue',
            //componentName与prompts的name值对应，即为用户输入内容
            templateFile: './template/component.vue.hbs',
            abortOnFail: true,
          },
        ]
        return actions
      },
    ], // array of actions
  })
}
