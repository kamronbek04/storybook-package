import YourComponentName from './YourComponentName.vue';

export default {
  title: 'YourComponentName',
  component: YourComponentName,
};

export const Default = () => ({
  components: { YourComponentName },
  template: '<YourComponentName />',
});
