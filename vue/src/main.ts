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
  MdEmail,
  MdContentcopyRound,
  MdNavigatenext,
  MdNavigatebefore,
  MdHomefilled,
  BiLinkedin,
  MdLocationon,
  FiGb
} from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { getTheme, setTheme, systemTheme } from '@/core/theme';

addIcons(
  MdMenu,
  MdEmail,
  MdContentcopyRound,
  MdNavigatenext,
  MdNavigatebefore,
  MdHomefilled,
  MdSunny,
  MdWbsunnyOutlined,
  MdModenightSharp,
  MdModenightOutlined,
  MdComputer,
  BiGithub,
  BiLinkedin,
  MdLocationon,
  FiGb
);

const pinia = createPinia();
const app = createApp(App);

setTheme(getTheme() ?? systemTheme());

app.use(pinia);
app.use(router);

app.component('v-icon', OhVueIcon);
app.mount('body');
