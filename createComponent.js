const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Update the path to be inside the src/components directory
const componentDir = path.join(__dirname, 'src', 'components', componentName);

// Create the component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Create the .vue file
const vueFileContent = `
<script setup>
  import s from './${componentName}.module.css';
</script>

<template>
  <div>kkk</div>
</template>`;
fs.writeFileSync(
  path.join(componentDir, `${componentName}.vue`),
  vueFileContent
);

// Create the .stories.js file
const storiesFileContent = `
import ${componentName} from './${componentName}.vue';
import { colors } from '../../fixtures/colors.js';
export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
  },
};

const Template = (args) => ({
  components: { ${componentName} },
  setup() {
    return { args };
  },
  template: \`
    <${componentName} 
      :color="args.color" 
    />
  \`,
});

export const Default = Template.bind({});
Default.args = {
  color: 'blue',
};`;
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.js`),
  storiesFileContent
);

// Create the .module.css file
fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), '');

// Create the index.js file
const indexFileContent = `export { default } from './${componentName}.vue';`;

fs.writeFileSync(path.join(componentDir, 'index.js'), indexFileContent);

// Path to the src/index.js file

const srcIndexPath = path.join(__dirname, 'src', 'index.js');

// Read the existing content of src/index.js

let srcIndexContent = '';

if (fs.existsSync(srcIndexPath)) {
  srcIndexContent = fs.readFileSync(srcIndexPath, 'utf-8');
}

const exportStatement = `export { default as ${componentName} } from './components/${componentName}';`;

if (!srcIndexContent.includes(exportStatement)) {
  fs.appendFileSync(srcIndexPath, `${exportStatement}\n`);

  console.log(`Added export statement to ./src/index.js`);
} else {
  console.log(`Export statement already exists in ./src/index.js`);
}

console.log(
  `${componentName} component files created successfully in ./src/components/${componentName}!`
);
