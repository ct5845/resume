import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import {
  MdSunny,
  MdWbsunnyOutlined,
  MdModenightSharp,
  MdModenightOutlined,
  MdComputer,
  BiGithub,
  MdMenu,
  BiLinkedin,
  FiGb,
  MdContactpage,
  MdArrowbackiosnew,
  MdArrowforwardios
} from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { getTheme, setTheme, systemTheme } from '@/core/theme';
import { CT_ICON } from './core';
import { Vue3Mq, MqResponsive } from 'vue3-mq';

addIcons(
  MdMenu,
  MdSunny,
  MdWbsunnyOutlined,
  MdModenightSharp,
  MdModenightOutlined,
  MdArrowbackiosnew,
  MdArrowforwardios,
  MdComputer,
  BiGithub,
  BiLinkedin,
  FiGb,
  MdContactpage,
  CT_ICON
);

const pinia = createPinia();
const app = createApp(App);

setTheme(getTheme() ?? systemTheme());

app.use(pinia);
app.use(router);
app.use(Vue3Mq, { preset: 'tailwind' });

app.component('v-icon', OhVueIcon);
app.component('v-responsive', MqResponsive);
app.mount('body');
