'use strict';

import './styles/style.css';

import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Error404 } from './pages/Error404';
import { Game } from './pages/Game';
import { Results } from './pages/Results';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';

const homeInstance = new Home();
const settingsInstance = new Settings();
const categoriesInstance = new Categories();
const gameInstance = new Game();
const resultsInstance = new Results();
const error404Instance = new Error404();
const headerInstance = new Header();
const footerInstance = new Footer();

const routes = {
  '/': homeInstance,
  '/settings': settingsInstance,
  '/categories': categoriesInstance,
  '/game': gameInstance,
  '/results': resultsInstance,
};

const router = async () => {
  const content = document.getElementById('page_container');
  const header = document.getElementById('header_container');
  const footer = document.getElementById('footer_container');
  header.innerHTML = await headerInstance.render();
  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();
  await headerInstance.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;  
  
  content.innerHTML = await page.render();

  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);