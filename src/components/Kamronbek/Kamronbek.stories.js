
import Kamronbek from './Kamronbek.vue';
import { colors } from '../../fixtures/colors.js';
export default {
  title: 'Components/Kamronbek',
  component: Kamronbek,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
  },
};

const Template = (args) => ({
  components: { Kamronbek },
  setup() {
    return { args };
  },
  template: `
    <Kamronbek 
      :color="args.color" 
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  color: 'blue',
};