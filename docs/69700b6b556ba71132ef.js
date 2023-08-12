import _asyncToGenerator from"@babel/runtime/helpers/asyncToGenerator";import _regeneratorRuntime from"@babel/runtime/regenerator";import"./styles/style.css";import{Home}from"./pages/Home";import{Categories}from"./pages/Categories";import{Settings}from"./pages/Settings";import{Error404}from"./pages/Error404";import{Game}from"./pages/Game";import{Results}from"./pages/Results";import{Header}from"./components/Header";import{Footer}from"./components/Footer";import{Utils}from"./utils/Utils";var homeInstance=new Home,settingsInstance=new Settings,categoriesInstance=new Categories,gameInstance=new Game,resultsInstance=new Results,error404Instance=new Error404,headerInstance=new Header,footerInstance=new Footer,routes={"/":homeInstance,"/settings":settingsInstance,"/categories":categoriesInstance,"/game":gameInstance,"/results":resultsInstance},router=function(){var e=_asyncToGenerator(_regeneratorRuntime.mark((function e(){var r,t,n,s,o,a;return _regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=document.getElementById("page_container"),t=document.getElementById("header_container"),n=document.getElementById("footer_container"),e.next=5,headerInstance.render();case 5:return t.innerHTML=e.sent,e.next=8,footerInstance.render();case 8:return n.innerHTML=e.sent,e.next=11,footerInstance.after_render();case 11:return e.next=13,headerInstance.after_render();case 13:return s=Utils.parseRequestURL(),o=(s.resource?"/".concat(s.resource):"/")+(s.id?"/:id":"")+(s.verb?"/".concat(s.verb):""),a=routes[o]?routes[o]:error404Instance,e.next=18,a.render();case 18:return r.innerHTML=e.sent,e.next=21,a.after_render();case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(window.addEventListener("hashchange",router),window.addEventListener("load",router),!localStorage.getItem("answers")){for(var answers={},i=0;i<24;i++)answers[i]=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];localStorage.setItem("answers",JSON.stringify(answers))}